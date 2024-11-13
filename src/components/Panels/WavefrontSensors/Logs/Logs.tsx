import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Title } from '@Shared/Title/Title';
import { useLogMessages } from '@gql/server/Logs';
import { useEffect, useState } from 'react';
import { LogMessage } from '@gql/server/gen/graphql';
import { v4 as uuid } from 'uuid';

export default function Logs() {
  const MAX_LOG_DISPLAY = 20;
  const { data } = useLogMessages();
  const [messages, setMessages] = useState<(LogMessage & { id: string })[]>([]);

  useEffect(() => {
    if (data?.logMessage) {
      // Give each message a unique id
      const msg = { id: uuid(), ...data.logMessage };
      if (messages.length >= MAX_LOG_DISPLAY) {
        setMessages([msg, ...messages.splice(0, MAX_LOG_DISPLAY - 1)]);
      } else {
        setMessages([msg, ...messages]);
      }
    }
  }, [data]);

  return (
    <div className="logs-table">
      <Title title="Log" />
      <DataTable
        value={messages}
        rowClassName={(data: LogMessage) => data.level.toLowerCase()}
        stripedRows
        dataKey="id"
        emptyMessage="No logs yet"
        // https://github.com/primefaces/primereact/issues/7321#issuecomment-2407955675
        onMouseDownCapture={(e) => {
          e.stopPropagation();
        }}
      >
        <Column field="timestamp" header="Timestamp" className="text-small"></Column>
        <Column field="message" header="Message" className="text-small"></Column>
      </DataTable>
    </div>
  );
}
