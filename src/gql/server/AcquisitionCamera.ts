import { useMutation } from '@apollo/client';

import { graphql } from './gen';

const AC_OBSERVE = graphql(`
  mutation acObserve($period: TimeSpanInput!) {
    acObserve(period: $period) {
      result
      msg
    }
  }
`);

export function useAcObserve() {
  return useMutation(AC_OBSERVE);
}

const AC_STOP_OBSERVE = graphql(`
  mutation acStopObserve {
    acStopObserve {
      result
      msg
    }
  }
`);

export function useAcStopObserve() {
  return useMutation(AC_STOP_OBSERVE);
}
