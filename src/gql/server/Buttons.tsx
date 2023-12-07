import { DocumentNode, gql, useMutation } from "@apollo/client"
import { useContext, useRef } from "react"
import { Button } from "primereact/button"
import { ButtonStateType } from "@/types"
import { VariablesContext } from "@Contexts/Variables/VariablesProvider"
import { Toast } from "primereact/toast"

// Generic mutation button
const BTN_CLASSES = {
  PENDING: "",
  ACTIVE: "p-button-warning",
  DONE: "p-button-success",
}
const TOAST_LIFE = 5000

function MutationButton({
  mutation,
  variables,
  className,
  label,
  disabled = false,
}: {
  mutation: DocumentNode
  variables: object
  className: string
  label: string
  disabled: boolean
}) {
  const toast = useRef<Toast>(null)
  const [mutationFunction, { data, loading, error }] = useMutation(mutation, {
    variables: variables,
  })

  if (error) {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: error.message,
      life: TOAST_LIFE,
    })
  }

  let state: ButtonStateType = loading ? "ACTIVE" : "PENDING"

  return (
    <>
      <Toast ref={toast} />
      <Button
        className={`${BTN_CLASSES[state]} ${className}`}
        onClick={() =>
          mutationFunction({
            variables: variables,
          })
        }
        loading={loading}
        disabled={disabled}
        label={label}
      />
    </>
  )
}

// BUTTONS
// MCS
const MOUNT_MUTATION = gql`
  mutation changeMountState($enable: Boolean!) {
    mountFollow(enable: $enable) {
      result
    }
  }
`

export function MCS({ label, disabled }: { label: string; disabled: boolean }) {
  return (
    <MutationButton
      mutation={MOUNT_MUTATION}
      variables={{ enable: true }}
      className=""
      label={label}
      disabled={disabled}
    />
  )
}

// PARK
const PARK_MUTATION = gql`
  mutation {
    mountPark
  }
`

export function McsPark({
  label,
  disabled,
}: {
  label: string
  disabled: boolean
  style: object
}) {
  return (
    <MutationButton
      mutation={PARK_MUTATION}
      variables={{ enable: true }}
      className=""
      label={label}
      disabled={disabled}
    />
  )
}

// SLEW
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

export function Slew({
  label,
  disabled,
  className,
}: {
  label: string
  disabled: boolean
  className: string
}) {
  const { configuration, selectedTarget, slewFlags } =
    useContext(VariablesContext)

  return (
    <MutationButton
      mutation={SLEW_MUTATION}
      variables={{
        ...slewFlags,
        id: selectedTarget?.id,
        name: selectedTarget?.name,
        ra: selectedTarget?.ra?.hms,
        dec: selectedTarget?.dec?.dms,
        epoch: selectedTarget?.epoch,
        wavelength: "400",
        iaa: configuration.instrument?.iaa,
        focusOffset: configuration.instrument?.focusOffset,
        agName: configuration.instrument?.name,
        x: configuration.instrument?.originX,
        y: configuration.instrument?.originY,
        rotAngle: configuration.rotator?.angle,
        tracking: configuration.rotator?.tracking,
      }}
      className={className}
      label={label}
      disabled={disabled || !Boolean(selectedTarget?.id)}
    />
  )
}

// OIWFS
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

export function Oiwfs({
  label,
  disabled,
  className,
}: {
  label: string
  disabled: boolean
  className: string
}) {
  const { selectedTarget } = useContext(VariablesContext)
  return (
    <MutationButton
      mutation={OIWFS_MUTATION}
      variables={{
        id: selectedTarget?.id,
        name: selectedTarget?.name,
        ra: selectedTarget?.ra?.hms,
        dec: selectedTarget?.dec?.dms,
        epoch: selectedTarget?.epoch,
        wavelength: "400",
      }}
      className={className}
      label={label}
      disabled={disabled || !Boolean(selectedTarget?.id)}
    />
  )
}
