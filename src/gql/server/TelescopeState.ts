import { useSubscription, useQuery } from '@apollo/client';
import { graphql } from './gen';
import { useDebugValue } from 'react';

const GET_TELESCOPE_STATE = graphql(`
  query getTelescopeState {
    telescopeState {
      mount {
        parked
        follow
      }
      scs {
        parked
        follow
      }
      crcs {
        parked
        follow
      }
      pwfs1 {
        parked
        follow
      }
      pwfs2 {
        parked
        follow
      }
      oiwfs {
        parked
        follow
      }
    }
  }
`);

const TELESCOPE_STATE_SUBSCRIPTION = graphql(`
  subscription telescopeStates {
    telescopeState {
      mount {
        parked
        follow
      }
      scs {
        parked
        follow
      }
      crcs {
        parked
        follow
      }
      pwfs1 {
        parked
        follow
      }
      pwfs2 {
        parked
        follow
      }
      oiwfs {
        parked
        follow
      }
    }
  }
`);

export function useTelescopeState() {
  const query = useQuery(GET_TELESCOPE_STATE);
  const subscription = useSubscription(TELESCOPE_STATE_SUBSCRIPTION);

  const isSubscription = subscription.data !== undefined;

  useDebugValue(isSubscription ? 'Subscription data' : 'Query data');
  return {
    data: subscription.data?.telescopeState ?? query.data?.telescopeState,
    loading: isSubscription ? subscription.loading : query.loading,
    error: subscription.error ?? query.error,
  };
}
