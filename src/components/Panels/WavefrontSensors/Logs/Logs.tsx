import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Title } from '@Shared/Title/Title';
import { useLogMessages } from '@gql/server/Logs';
import { useEffect, useState } from 'react';

export default function Logs() {
  const MAX_LOG_DISPLAY = 20;
  const { data } = useLogMessages();
  const [messages, setMessages] = useState<unknown[]>([]);

  useEffect(() => {
    if (data?.logMessage) {
      const msg = {
        ...data?.logMessage,
        // timestamp: data?.logMessage.timestamp.split(" ")[1],
      };
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
        rowClassName={(data: { level: string }) => data.level.toLowerCase()}
        stripedRows
        responsiveLayout="scroll"
      >
        <Column field="timestamp" header="Timestamp" className="text-small"></Column>
        {/* <Column field="level" header="Level"></Column> */}
        <Column field="message" header="Message" className="text-small"></Column>
      </DataTable>
    </div>
  );
}
