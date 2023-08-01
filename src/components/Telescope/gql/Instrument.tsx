import { useQuery, useMutation, gql } from '@apollo/client'
import { InstrumentConfig } from '../../../types'

// CREATE INSTRUMENT MUTATION
const INSTRUMENT_MUTATION = gql`
  mutation createInstrument(
    $name: String!,
    $issPort: Int!,
    $iaa: Float,
    $focusOffset: Float,
    $wfs: String,
    $originX: Float,
    $originY: Float,
    $ao: Boolean,
    $extraParams: JSON
  ) {
    createInstrument(
      name: $name,
      issPort: $issPort,
      iaa: $iaa,
      focusOffset: $focusOffset,
      wfs: $wfs,
      originX: $originX,
      originY: $originY,
      ao: $ao,
      extraParams: $extraParams
    ) {
      name
      iaa
      issPort
      focusOffset
      wfs
      originX
      originY
      ao
      extraParams
    }
  }
`

export function useCreateInstrument() {
  const [mutationFunction, { data, loading, error }] = useMutation(INSTRUMENT_MUTATION)

  function createInstrument(instrument: InstrumentConfig) {
    mutationFunction({
      variables: instrument,
      context: { clientName: "navigateConfigs" }
    })
  }

  return createInstrument
}

// UPDATE CURRENT INSTRUMENT MUTATION
const UPDATE_INSTRUMENT_MUTATION = gql`
  mutation updateCurrentInstrument(
    $name: String,
    $issPort: Int,
    $iaa: Float,
    $focusOffset: Float,
    $wfs: String,
    $originX: Float,
    $originY: Float,
    $ao: Boolean,
    $extraParams: JSON
  ) {
    updateCurrentInstrument(
      name: $name,
      issPort: $issPort,
      iaa: $iaa,
      focusOffset: $focusOffset,
      wfs: $wfs,
      originX: $originX,
      originY: $originY,
      ao: $ao,
      extraParams: $extraParams
    ) {
      name
      iaa
      issPort
      focusOffset
      wfs
      originX
      originY
      ao
      extraParams
    }
  }
`

export function useUpdateCurrentInstrument() {
  const [mutationFunction, { data, loading, error }] = useMutation(UPDATE_INSTRUMENT_MUTATION)

  function updateCurrentInstrument(instrument: InstrumentConfig) {
    mutationFunction({
      variables: instrument,
      context: { clientName: "navigateConfigs" }
    })
  }

  return updateCurrentInstrument
}

// GET CURRENT INSTRUMENT QUERY
const CURRENT_INSTRUMENT_QUERY = gql`
  query getCurrentInstrument {
    currentInstrument {
      name
      iaa
      issPort
      focusOffset
      wfs
      originX
      originY
      ao
      extraParams
    }
  }
`

export function useGetCurrentInstrument() {
  const { loading, error, data, refetch } = useQuery(CURRENT_INSTRUMENT_QUERY, {
    context: { clientName: "navigateConfigs" }
  })

  if (loading)
    return undefined

  return data.currentInstrument
}

// GET INSTRUMENT QUERY
const INSTRUMENT_QUERY = gql`
  query getInstrument(
    $name: String,
    $issPort: Int,
    $wfs: String,
    $extraParams: JSON
  ) {
    instrument(
      name: $name,
      issPort: $issPort,
      wfs: $wfs,
      extraParams: $extraParams
    ) {
      name
      iaa
      issPort
      focusOffset
      wfs
      originX
      originY
      ao
      extraParams
    }
  }
`

export function useGetInstrument(INITIAL_INST: InstrumentConfig) {
  const { loading, error, data, refetch } = useQuery(INSTRUMENT_QUERY, {
    context: { clientName: "navigateConfigs" }
  })

  if (loading)
    return null

  return data.instrument
}