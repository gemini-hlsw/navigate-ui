import { useContext } from "react"
import { AuthContext } from "../Auth/AuthProvider"
import "./WavefrontSensors.scss"
import WavefrontSensor from "./WavefrontSensor"
import AcquisitionCamera from "./AcquisitionCamera"
import Logs from "./Logs"
import { Title } from "../Title/Title"

export function WavefrontSensors({ prevPanel, nextPanel }: { prevPanel: () => void, nextPanel: () => void }) {
  const { canEdit } = useContext(AuthContext)

  return (
    <div className="wavefront-sensors">
      <Title title="Wavefront Sensors" prevPanel={prevPanel} nextPanel={nextPanel}></Title>
      <div>
        <WavefrontSensor canEdit={canEdit} wfs={{ name: "PWFS1" }} />
        <WavefrontSensor canEdit={canEdit} wfs={{ name: "PWFS2" }} />
        <WavefrontSensor canEdit={canEdit} wfs={{ name: "OIWFS" }} />
      </div>
      <AcquisitionCamera canEdit={canEdit} ac={{ name: "AC" }} />
      <Logs />
    </div>
  )
}