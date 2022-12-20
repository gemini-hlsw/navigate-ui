import "./WavefrontSensors.scss"
import WavefrontSensor from "./WavefrontSensor"
import AcquisitionCamera from "./AcquisitionCamera"
import Logs from "./Logs"
import Title from "../Title"

export default function WavefrontSensors({ prevPanel, nextPanel }: { prevPanel: () => void, nextPanel: () => void }) {
  return (
    <div className="wavefront-sensors">
      <Title title="Wavefront Sensors" prevPanel={prevPanel} nextPanel={nextPanel}></Title>
      <WavefrontSensor wfs={{ name: "PWFS1" }} />
      <WavefrontSensor wfs={{ name: "PWFS2" }} />
      <WavefrontSensor wfs={{ name: "OIWFS" }} />
      <AcquisitionCamera ac={{ name: "AC" }} />
      <Logs />
    </div>
  )
}