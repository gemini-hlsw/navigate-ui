import { useSubscription } from '@apollo/client';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

import { graphql } from './gen';
import type { LogMessage } from './gen/graphql';

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
  const MAX_LOG_DISPLAY = 20;
  const [messages, setMessages] = useState<(LogMessage & { id: string })[]>([]);

  const sub = useSubscription(LOGS_SUBSCRIPTION, {
    onData({ data }) {
      if (data.data?.logMessage) {
        // Give each message a unique id
        const msg = { id: uuid(), ...data.data.logMessage };
        if (messages.length >= MAX_LOG_DISPLAY) {
          setMessages([msg, ...messages.splice(0, MAX_LOG_DISPLAY - 1)]);
        } else {
          setMessages([msg, ...messages]);
        }
      }
    },
  });

  return { ...sub, data: messages };
}
