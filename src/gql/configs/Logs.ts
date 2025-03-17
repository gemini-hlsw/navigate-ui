import { useMutation, useQuery } from '@apollo/client';

import { graphql } from './gen';

export const GET_LOGS = graphql(`
  query getLogs {
    logs {
      id
      time
      message
      level
    }
  }
`);

export function useLogs() {
  return useQuery(GET_LOGS, {
    context: { clientName: 'navigateConfigs' },
  });
}

const CREATE_LOG = graphql(`
  mutation addLog($time: DateTime!, $message: String!, $level: LogLevel!) {
    addLog(time: $time, message: $message, level: $level) {
      id
      time
      message
      level
    }
  }
`);

export function useCreateLog() {
  return useMutation(CREATE_LOG, {
    context: { clientName: 'navigateConfigs' },
  });
}
