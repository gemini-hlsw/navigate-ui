import { gql, useMutation } from "@apollo/client"

const MUTATE_OBSERVATION = gql`
  mutation updateObservation(
    $id: String!
    $name: String!
    $selectedProbe: String
    $selectedTarget: Int
    $targets: [TargetInput]
  ) {
    updateObservation(
      id: $id
      name: $name
      selectedProbe: $selectedProbe
      selectedTarget: $selectedTarget
      targets: $targets
    ) {
      pk
      id
      name
      selectedProbe
      selectedTarget
      targets {
        pk
        id
        name
        ra {
          degrees
          hms
        }
        dec {
          degrees
          dms
        }
        az {
          degrees
          dms
        }
        el {
          degrees
          dms
        }
        epoch
        type
        createdAt
      }
    }
  }
`

export function useUpsertObservation() {
  const [mutationFunction, { data, loading, error }] = useMutation(
    MUTATE_OBSERVATION,
    { context: { clientName: "navigateConfigs" } }
  )

  return mutationFunction
}

const UPDATE_OBSERVATION_SELECTED_PROBE = gql`
  mutation updateObservationSelectedProbe($pk: Int, $selectedProbe: String) {
    updateObservationSelectedProbe(pk: $pk, selectedProbe: $selectedProbe) {
      pk
      selectedProbe
    }
  }
`

export function useUpdateObservationSelectedProbe() {
  const [mutationFunction, { data, loading, error }] = useMutation(
    UPDATE_OBSERVATION_SELECTED_PROBE,
    {
      context: { clientName: "navigateConfigs" },
    }
  )

  return mutationFunction
}

const UPDATE_OBSERVATION_SELECTED_TARGET = gql`
  mutation updateObservationSelectedTarget($pk: Int!, $selectedTarget: Int!) {
    updateObservationSelectedTarget(pk: $pk, selectedTarget: $selectedTarget) {
      pk
      id
      name
      selectedProbe
      selectedTarget
      targets {
        pk
        id
        name
        ra {
          degrees
          hms
        }
        dec {
          degrees
          dms
        }
        az {
          degrees
          dms
        }
        el {
          degrees
          dms
        }
        epoch
        type
        createdAt
      }
    }
  }
`

export function useUpdateObservationSelectedTarget() {
  const [mutationFunction, { data, loading, error }] = useMutation(
    UPDATE_OBSERVATION_SELECTED_TARGET,
    {
      context: { clientName: "navigateConfigs" },
    }
  )

  return mutationFunction
}
