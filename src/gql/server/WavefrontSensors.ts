import { gql, useMutation } from '@apollo/client';

const OIWFS_OBSERVE = gql`
  mutation oiwfsObserve($period: TimeSpanInput) {
    oiwfsObserve(period: $period) {
      result
      msg
    }
  }
`;

export function useOiwfsObserve() {
  const [mutationFunction] = useMutation(OIWFS_OBSERVE);

  return mutationFunction;
}

const OIWFS_STOP_OBSERVE = gql`
  mutation oiwfsStopObserve {
    oiwfsStopObserve {
      result
      msg
    }
  }
`;

export function useOiwfsStopObserve() {
  const [mutationFunction] = useMutation(OIWFS_STOP_OBSERVE);

  return mutationFunction;
}
