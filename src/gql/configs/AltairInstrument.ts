import { gql, useLazyQuery, useMutation } from "@apollo/client"

const GET_ALTAIR_INSTRUMENT = gql`
  query getAltairInstrument {
    altairInstrument {
      pk
      beamsplitter
      startMagnitude
      seeing
      windSpeed
      foceMode
      ndFilter
      fieldLens
      deployAdc
      adjustAdc
      lgs
    }
  }
`

export function useGetAltairInstrument() {
  const [queryFunction, { data, loading, error }] = useLazyQuery(
    GET_ALTAIR_INSTRUMENT,
    { context: { clientName: "navigateConfigs" } }
  )

  return queryFunction
}

const UPDATE_ALTAIR_INSTRUMENT = gql`
  mutation updateAltairInstrument(
    $pk: Int!
    $beamsplitter: String
    $startMagnitude: Float
    $seeing: Float
    $windSpeed: Float
    $foceMode: Boolean
    $ndFilter: Boolean
    $fieldLens: Boolean
    $deployAdc: Boolean
    $adjustAdc: Boolean
    $lgs: Boolean
  ) {
    updateAltairInstrument(
      pk: $pk
      beamsplitter: $beamsplitter
      startMagnitude: $startMagnitude
      seeing: $seeing
      windSpeed: $windSpeed
      foceMode: $foceMode
      ndFilter: $ndFilter
      fieldLens: $fieldLens
      deployAdc: $deployAdc
      adjustAdc: $adjustAdc
      lgs: $lgs
    ) {
      pk
      beamsplitter
      startMagnitude
      seeing
      windSpeed
      foceMode
      ndFilter
      fieldLens
      deployAdc
      adjustAdc
      lgs
    }
  }
`

export function useUpdateAltairInstrument() {
  const [mutationFunction, { data, loading, error }] = useMutation(
    UPDATE_ALTAIR_INSTRUMENT,
    { context: { clientName: "navigateConfigs" } }
  )

  return mutationFunction
}
