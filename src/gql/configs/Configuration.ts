import { gql, useMutation } from "@apollo/client"

const UPDATE_CONFIGURATION = gql`
  mutation updateConfiguration(
    $pk: Int!
    $name: String!
    $instrumentPk: Int
    $observationPk: Int
    $slewFlagsPk: Int
  ) {
    updateConfiguration(
      pk: $pk
      name: $name
      instrumentPk: $instrumentPk
      observationPk: $observationPk
      slewFlagsPk: $slewFlagsPk
    ) {
      pk
      name
    }
  }
`

export function useUpdateConfiguration() {
  const [mutationFunction, { data, loading, error }] = useMutation(
    UPDATE_CONFIGURATION,
    { context: { clientName: "navigateConfigs" } }
  )

  return mutationFunction
}

const CREATE_CONFIGURATION = gql`
  mutation createConfiguration(
    $name: String!
    $instrumentPk: Int
    $observationPk: Int
    $slewFlagsPk: Int
  ) {
    createConfiguration(
      name: $name
      instrumentPk: $instrumentPk
      observationPk: $observationPk
      slewFlagsPk: $slewFlagsPk
    ) {
      pk
      name
    }
  }
`

export function useCreateConfiguration() {
  const [mutationFunction, { data, loading, error }] = useMutation(
    CREATE_CONFIGURATION,
    { context: { clientName: "navigateConfigs" } }
  )

  return mutationFunction
}
