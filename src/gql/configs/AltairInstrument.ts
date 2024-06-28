import { useLazyQuery, useMutation } from '@apollo/client';
import { graphql } from './gen';

const GET_ALTAIR_INSTRUMENT = graphql(`
  query getAltairInstrument {
    altairInstrument {
      pk
      beamsplitter
      startMagnitude
      seeing
      windSpeed
      forceMode
      ndFilter
      fieldLens
      deployAdc
      adjustAdc
      lgs
    }
  }
`);

export function useGetAltairInstrument() {
  const [queryFunction] = useLazyQuery(GET_ALTAIR_INSTRUMENT, {
    context: { clientName: 'navigateConfigs' },
  });

  return queryFunction;
}

const UPDATE_ALTAIR_INSTRUMENT = graphql(`
  mutation updateAltairInstrument(
    $pk: Int!
    $beamsplitter: String
    $startMagnitude: Float
    $seeing: Float
    $windSpeed: Float
    $forceMode: Boolean
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
      forceMode: $forceMode
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
      forceMode
      ndFilter
      fieldLens
      deployAdc
      adjustAdc
      lgs
    }
  }
`);

export function useUpdateAltairInstrument() {
  const [mutationFunction] = useMutation(UPDATE_ALTAIR_INSTRUMENT, {
    context: { clientName: 'navigateConfigs' },
  });

  return mutationFunction;
}
