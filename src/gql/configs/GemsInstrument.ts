import { gql, useLazyQuery, useMutation } from '@apollo/client';

const GET_GEMS_INSTRUMENT = gql`
  query getGemsInstrument {
    gemsInstrument {
      pk
      beamsplitter
      adc
      astrometricMode
    }
  }
`;

export function useGetGemsInstrument() {
  const [queryFunction, { data, loading, error }] = useLazyQuery(GET_GEMS_INSTRUMENT, {
    context: { clientName: 'navigateConfigs' },
  });

  return queryFunction;
}

const UPDATE_GEMS_INSTRUMENT = gql`
  mutation updateGemsInstrument($pk: Int!, $beamsplitter: String, $adc: Boolean, $astrometricMode: String) {
    updateGemsInstrument(pk: $pk, beamsplitter: $beamsplitter, adc: $adc, astrometricMode: $astrometricMode) {
      pk
      beamsplitter
      adc
      astrometricMode
    }
  }
`;

export function useUpdateGemsInstrument() {
  const [mutationFunction, { data, loading, error }] = useMutation(UPDATE_GEMS_INSTRUMENT, {
    context: { clientName: 'navigateConfigs' },
  });

  return mutationFunction;
}
