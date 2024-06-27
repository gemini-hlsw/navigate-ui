import { gql, useSubscription } from '@apollo/client';

const LOGS_SUBSCRIPTION = gql`
  subscription logMessage {
    logMessage {
      timestamp
      level
      thread
      message
    }
  }
`;

export function useLogMessages() {
  const { data, loading } = useSubscription(LOGS_SUBSCRIPTION);

  return { data, loading };
}
