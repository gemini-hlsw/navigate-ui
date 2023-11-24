import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Title } from "../Title/Title"
import { useLogMessages } from "../../gql/server/Logs"
import { useEffect, useState } from "react"

export default function Logs() {
  const MAX_LOG_DISPLAY = 12
  const { data, loading } = useLogMessages()
  const [messages, setMessages] = useState<Object[]>([])

  useEffect(() => {
    if (data?.logMessage) {
      if (messages.length > MAX_LOG_DISPLAY) {
        setMessages([...messages.splice(1), data?.logMessage])
      } else {
        setMessages([...messages, data?.logMessage])
      }
    }
  }, [data])

  // console.log(data)
  // console.log(loading)

  const LOG_MESSAGES = [
    {
      timestamp: new Date().toISOString(),
      level: "debug",
      message: "Some message",
    },
    {
      timestamp: new Date().toISOString(),
      level: "error",
      message: "Some message",
    },
    {
      timestamp: new Date().toISOString(),
      level: "info",
      message: "Some message",
    },
    {
      timestamp: new Date().toISOString(),
      level: "debug",
      message: "Some message",
    },
    {
      timestamp: new Date().toISOString(),
      level: "warning",
      message: "Some message",
    },
    {
      timestamp: new Date().toISOString(),
      level: "debug",
      message: "Some message",
    },
  ]

  return (
    <div className="logs-table">
      <Title title="Log" />
      <DataTable
        value={messages}
        rowClassName={(data) => {
          console.log(data.level.toLowerCase())
          return data.level.toLowerCase()
        }}
        stripedRows
        responsiveLayout="scroll"
      >
        <Column field="timestamp" header="Timestamp"></Column>
        <Column field="level" header="Level"></Column>
        <Column field="message" header="Message"></Column>
      </DataTable>
    </div>
  )
}
