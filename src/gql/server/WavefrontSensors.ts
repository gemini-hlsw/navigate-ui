import { useMutation } from '@apollo/client';
import { graphql } from './gen';

const OIWFS_OBSERVE = graphql(`
  mutation oiwfsObserve($period: TimeSpanInput!) {
    oiwfsObserve(period: $period) {
      result
      msg
    }
  }
`);

export function useOiwfsObserve() {
  const [mutationFunction] = useMutation(OIWFS_OBSERVE);

  return mutationFunction;
}

const OIWFS_STOP_OBSERVE = graphql(`
  mutation oiwfsStopObserve {
    oiwfsStopObserve {
      result
      msg
    }
  }
`);

export function useOiwfsStopObserve() {
  const [mutationFunction] = useMutation(OIWFS_STOP_OBSERVE);

  return mutationFunction;
}
