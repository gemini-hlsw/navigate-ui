import { gql, useLazyQuery, useMutation } from "@apollo/client"

const GET_ROTATOR = gql`
  query getRotator {
    rotator {
      pk
      angle
      tracking
    }
  }
`

export function useGetRotator() {
  const [queryFunction, { data, loading, error }] = useLazyQuery(GET_ROTATOR, {
    context: { clientName: "navigateConfigs" },
  })

  return queryFunction
}

const UPDATE_ROTATOR = gql`
  mutation updateRotator($pk: Int!, $angle: Float, $tracking: TrackingType) {
    updateRotator(pk: $pk, angle: $angle, tracking: $tracking) {
      pk
      angle
      tracking
    }
  }
`

export function useUpdateRotator() {
  const [mutationFunction, { data, loading, error }] = useMutation(
    UPDATE_ROTATOR,
    { context: { clientName: "navigateConfigs" } }
  )

  return mutationFunction
}
