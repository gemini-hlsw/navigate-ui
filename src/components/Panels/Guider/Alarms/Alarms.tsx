import { useContext } from "react"
import { Title } from "@Shared/Title/Title"
import { Alarm } from "./Alarm"
import { AuthContext } from "@Contexts/Auth/AuthProvider"

export function Alarms() {
  const { canEdit } = useContext(AuthContext)

  return (
    <div className="alarms">
      <Title title="Guide Alarms" />
      <div className="body">
        <Alarm
          wfs="PWFS1"
          counts={10}
          limit={100}
          subaperture="OK"
          enabled={false}
          disabled={!canEdit}
        />
        <Alarm
          wfs="PWFS1"
          counts={10}
          limit={100}
          subaperture="OK"
          enabled={false}
          disabled={!canEdit}
        />
        <Alarm
          wfs="PWFS1"
          counts={10}
          limit={100}
          subaperture="OK"
          enabled={false}
          disabled={!canEdit}
        />
      </div>
    </div>
  )
}
