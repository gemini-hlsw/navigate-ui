import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Title } from '../Title/Title';

export default function Logs() {
  const LOG_MESSAGES = [
    { timestamp: (new Date()).toISOString(), level: "debug", message: "Some message" },
    { timestamp: (new Date()).toISOString(), level: "error", message: "Some message" },
    { timestamp: (new Date()).toISOString(), level: "info", message: "Some message" },
    { timestamp: (new Date()).toISOString(), level: "debug", message: "Some message" },
    { timestamp: (new Date()).toISOString(), level: "warning", message: "Some message" },
    { timestamp: (new Date()).toISOString(), level: "debug", message: "Some message" }
  ]

  return (
    <div className="logs-table">
      <Title title="Log" />
      <DataTable value={LOG_MESSAGES} rowClassName={(data) => data.level} stripedRows responsiveLayout="scroll">
        <Column field="timestamp" header="Timestamp"></Column>
        <Column field="level" header="Level"></Column>
        <Column field="message" header="Message"></Column>
      </DataTable>
    </div>
  )
}