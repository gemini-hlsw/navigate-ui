import { useSubscription } from '@apollo/client';
import { graphql } from './gen';

const LOGS_SUBSCRIPTION = graphql(`
  subscription logMessage {
    logMessage {
      timestamp
      level
      thread
      message
    }
  }
`);

export function useLogMessages() {
  const { data, loading } = useSubscription(LOGS_SUBSCRIPTION);

  return { data, loading };
}
