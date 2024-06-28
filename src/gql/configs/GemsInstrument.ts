import { useLazyQuery, useMutation } from '@apollo/client';
import { graphql } from './gen';

const GET_GEMS_INSTRUMENT = graphql(`
  query getGemsInstrument {
    gemsInstrument {
      pk
      beamsplitter
      adc
      astrometricMode
    }
  }
`);

export function useGetGemsInstrument() {
  const [queryFunction] = useLazyQuery(GET_GEMS_INSTRUMENT, {
    context: { clientName: 'navigateConfigs' },
  });

  return queryFunction;
}

const UPDATE_GEMS_INSTRUMENT = graphql(`
  mutation updateGemsInstrument($pk: Int!, $beamsplitter: String, $adc: Boolean, $astrometricMode: String) {
    updateGemsInstrument(pk: $pk, beamsplitter: $beamsplitter, adc: $adc, astrometricMode: $astrometricMode) {
      pk
      beamsplitter
      adc
      astrometricMode
    }
  }
`);

export function useUpdateGemsInstrument() {
  const [mutationFunction] = useMutation(UPDATE_GEMS_INSTRUMENT, {
    context: { clientName: 'navigateConfigs' },
  });

  return mutationFunction;
}
