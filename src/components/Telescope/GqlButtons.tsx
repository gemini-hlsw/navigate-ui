import { gql, useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { Button } from 'primereact/button';
import { buttonState } from '../../types';

// Buttons possible states
const btnClass = {
  PENDING: "",
  ACTIVE: "p-button-warning",
  DONE: "p-button-success"
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
  ) {
    slew(
      slewParams: {
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
        baseTarget: {
          id: $id
          name: $name
          sidereal: {
            ra: { hms: $ra }
            dec: { dms: $dec }
            epoch: $epoch
          }
          wavelength: { nanometers: $wavelength }
        }
      }
    ) {
      result
    }
  }
`

export function MCS({...props}) {
  const [mutationFunction, {data, loading, error}] = useMutation(MOUNT_MUTATION, {
    variables: {
      enable: true
    }
  })

  useEffect(() => {
    if (Boolean(data)) {
      console.log(data)
    }
  }, [data])

  let state: buttonState = (loading) ? "ACTIVE" : "PENDING"

  return (
    <Button
      className={`${btnClass[state]}`}
      onClick={() => mutationFunction({variables: { enable: true }})}
      loading={loading}
      {...props}
    />
  )
}

export function McsPark({...props}) {
  const [mutationFunction, {data, loading, error}] = useMutation(PARK_MUTATION)

  useEffect(() => {
    if (Boolean(data)) {
      console.log(data)
    }
  }, [data])

  let state: buttonState = (loading) ? "ACTIVE" : "PENDING"

  return (
    <Button
      className={`${btnClass[state]}`}
      onClick={() => mutationFunction({variables: {enable: false}})}
      loading={loading}
      {...props}
    />
  )
}

export function Slew({slewVars, disabled, className, label}:{slewVars: any, disabled: boolean, className: string, label: string}) {
  const [mutationFunction, {data, loading, error}] = useMutation(SLEW_MUTATION, {
    variables: slewVars
  })

  useEffect(() => {
    if (Boolean(data)) {
      console.log(data)
    }
  }, [data])

  let state: buttonState = (loading) ? "ACTIVE" : "PENDING"

  return (
    <Button
      className={`${btnClass[state]} ${className}`}
      onClick={() => mutationFunction({variables: slewVars})}
      loading={loading}
      disabled={disabled}
      label={label}
    />
  )
}