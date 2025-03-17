import { useSubscription } from '@apollo/client';
import { type GetLogsQuery } from '@gql/configs/gen/graphql';
import { useCreateLog, useLogs } from '@gql/configs/Logs';
import { useState } from 'react';

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
  const { data } = useLogs();
  const [createLog] = useCreateLog();
  const [messages, setMessages] = useState<GetLogsQuery['logs']>([]);

  const sub = useSubscription(LOGS_SUBSCRIPTION, {
    onData({ data }) {
      if (data.data?.logMessage) {
        void createLog({
          variables: {
            time: new Date(data.data.logMessage.timestamp).toISOString(),
            message: data.data.logMessage.message,
            level: data.data.logMessage.level,
          },
          onCompleted: (logs) => {
            if (!logs.addLog) return;
            setMessages(logs.addLog);
          },
        });
      }
    },
  });

  return { ...sub, data: messages?.length ? messages : data?.logs };
}
