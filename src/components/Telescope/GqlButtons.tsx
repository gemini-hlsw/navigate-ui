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
    mountFollow(enable: $enable) 
  }
`

const PARK_MUTATION = gql`
  mutation {
    mountPark
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
      onClick={() => mutationFunction({variables: {enable: false}})}
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