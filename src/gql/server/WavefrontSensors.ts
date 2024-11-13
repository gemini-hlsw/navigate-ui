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
  return useMutation(OIWFS_OBSERVE);
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
  return useMutation(OIWFS_STOP_OBSERVE);
}
