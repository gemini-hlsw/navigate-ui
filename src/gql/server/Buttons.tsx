import { gql, useMutation } from "@apollo/client"
import { useContext, useEffect } from "react"
import { Button } from "primereact/button"
import { ButtonStateType, TargetType } from "../../types"
import { TelescopeContext } from "../../components/Telescope/TelescopeProvider"
import { AuthContext } from "../../components/Auth/AuthProvider"
import { VariablesContext } from "../../components/Variables/VariablesProvider"

// Buttons possible states
const btnClass = {
  PENDING: "",
  ACTIVE: "p-button-warning",
  DONE: "p-button-success",
}

const MOUNT_MUTATION = gql`
  mutation changeMountState($enable: Boolean!) {
    mountFollow(enable: $enable) {
      result
    }
  }
`

const PARK_MUTATION = gql`
  mutation {
    mountPark
  }
`

const SLEW_MUTATION = gql`
  mutation runSlew(
    $zeroChopThrow: Boolean!
    $zeroSourceOffset: Boolean!
    $zeroSourceDiffTrack: Boolean!
    $zeroMountOffset: Boolean!
    $zeroMountDiffTrack: Boolean!
    $shortcircuitTargetFilter: Boolean!
    $shortcircuitMountFilter: Boolean!
    $resetPointing: Boolean!
    $stopGuide: Boolean!
    $zeroGuideOffset: Boolean!
    $zeroInstrumentOffset: Boolean!
    $autoparkPwfs1: Boolean!
    $autoparkPwfs2: Boolean!
    $autoparkOiwfs: Boolean!
    $autoparkGems: Boolean!
    $autoparkAowfs: Boolean!
    $id: TargetId!
    $name: NonEmptyString!
    $ra: HmsString
    $dec: DmsString
    $epoch: EpochString
    $wavelength: PosBigDecimal
    $iaa: BigDecimal
    $focusOffset: Long
    $agName: String
    $x: Long
    $y: Long
    $rotAngle: BigDecimal
    $tracking: RotatorTrackingMode!
  ) {
    slew(
      slewOptions: {
        zeroChopThrow: $zeroChopThrow
        zeroSourceOffset: $zeroSourceOffset
        zeroSourceDiffTrack: $zeroSourceDiffTrack
        zeroMountOffset: $zeroMountOffset
        zeroMountDiffTrack: $zeroMountDiffTrack
        shortcircuitTargetFilter: $shortcircuitTargetFilter
        shortcircuitMountFilter: $shortcircuitMountFilter
        resetPointing: $resetPointing
        stopGuide: $stopGuide
        zeroGuideOffset: $zeroGuideOffset
        zeroInstrumentOffset: $zeroInstrumentOffset
        autoparkPwfs1: $autoparkPwfs1
        autoparkPwfs2: $autoparkPwfs2
        autoparkOiwfs: $autoparkOiwfs
        autoparkGems: $autoparkGems
        autoparkAowfs: $autoparkAowfs
      }
      config: {
        instParams: {
          iaa: { degrees: $iaa }
          focusOffset: { micrometers: $focusOffset }
          agName: $agName
          origin: { x: { micrometers: $x }, y: { micrometers: $y } }
        }
        sourceATarget: {
          id: $id
          name: $name
          sidereal: { ra: { hms: $ra }, dec: { dms: $dec }, epoch: $epoch }
          wavelength: { nanometers: $wavelength }
        }
        rotator: { ipa: { degrees: $rotAngle }, mode: $tracking }
      }
    ) {
      result
    }
  }
`

const OIWFS_MUTATION = gql`
  mutation setOiwfsTarget(
    $id: TargetId!
    $name: NonEmptyString!
    $ra: HmsString
    $dec: DmsString
    $epoch: EpochString
    $wavelength: PosBigDecimal
  ) {
    oiwfsTarget(
      target: {
        id: $id
        name: $name
        sidereal: { ra: { hms: $ra }, dec: { dms: $dec }, epoch: $epoch }
        wavelength: { nanometers: $wavelength }
      }
    ) {
      result
    }
  }
`

export function MCS({ ...props }) {
  const [mutationFunction, { data, loading, error }] = useMutation(
    MOUNT_MUTATION,
    {
      variables: {
        enable: true,
      },
    }
  )

  useEffect(() => {
    if (Boolean(data)) {
      console.log(data)
    }
  }, [data])

  let state: ButtonStateType = loading ? "ACTIVE" : "PENDING"

  return (
    <Button
      className={`${btnClass[state]}`}
      onClick={() => mutationFunction({ variables: { enable: true } })}
      loading={loading}
      {...props}
    />
  )
}

export function McsPark({ ...props }) {
  const [mutationFunction, { data, loading, error }] =
    useMutation(PARK_MUTATION)

  useEffect(() => {
    if (Boolean(data)) {
      console.log(data)
    }
  }, [data])

  let state: ButtonStateType = loading ? "ACTIVE" : "PENDING"

  return (
    <Button
      className={`${btnClass[state]}`}
      onClick={() => mutationFunction({ variables: { enable: false } })}
      loading={loading}
      {...props}
    />
  )
}

export function Slew({
  className,
  label,
}: {
  className: string
  label: string
}) {
  const { canEdit } = useContext(AuthContext)
  const { slewFlags } = useContext(TelescopeContext)
  const { instrument, selectedTarget, rotator } = useContext(VariablesContext)

  const [mutationFunction, { data, loading, error }] = useMutation(
    SLEW_MUTATION,
    {
      variables: {
        ...slewFlags,
        id: selectedTarget?.id,
        name: selectedTarget?.name,
        ra: selectedTarget?.ra?.hms,
        dec: selectedTarget?.dec?.dms,
        epoch: selectedTarget?.epoch,
        wavelength: "400",
        iaa: instrument.iaa,
        focusOffset: instrument.focusOffset,
        agName: instrument.name,
        x: instrument.originX,
        y: instrument.originY,
        rotAngle: rotator.angle,
        tracking: rotator.tracking,
      },
    }
  )

  useEffect(() => {
    if (Boolean(data)) {
      console.log(data)
    }
  }, [data])

  let state: ButtonStateType = loading ? "ACTIVE" : "PENDING"

  return (
    <Button
      className={`${btnClass[state]} ${className}`}
      onClick={() =>
        mutationFunction({
          variables: {
            ...slewFlags,
            id: selectedTarget?.id,
            name: selectedTarget?.name,
            ra: selectedTarget?.ra?.hms,
            dec: selectedTarget?.dec?.dms,
            epoch: selectedTarget?.epoch,
            wavelength: "400",
            iaa: instrument.iaa,
            focusOffset: instrument.focusOffset,
            agName: instrument.name,
            x: instrument.originX,
            y: instrument.originY,
            rotAngle: rotator.angle,
            tracking: rotator.tracking,
          },
        })
      }
      loading={loading}
      disabled={!canEdit || !Boolean(selectedTarget?.id)}
      label={label}
    />
  )
}

export function useOiwfs() {
  const { selectedTarget } = useContext(VariablesContext)
  const [mutationFunction, { data, loading, error }] = useMutation(
    OIWFS_MUTATION,
    {
      variables: {
        id: selectedTarget?.id,
        name: selectedTarget?.name,
        ra: selectedTarget?.ra?.hms,
        dec: selectedTarget?.dec?.dms,
        epoch: selectedTarget?.epoch,
        wavelength: "400",
      },
    }
  )

  function setOiwfsTarget(target: TargetType) {
    let variables = {
      id: target?.id,
      name: target?.name,
      ra: target?.ra?.hms,
      dec: target?.dec?.dms,
      epoch: target?.epoch,
      wavelength: "400",
    }
    console.log(`Excecuting oiwfsTarget mutation with variables`)
    console.log(variables)
    mutationFunction({
      variables: variables,
    })
  }

  return setOiwfsTarget
}
