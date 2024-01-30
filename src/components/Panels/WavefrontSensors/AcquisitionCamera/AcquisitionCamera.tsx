import imgUrl from "@assets/cat2.jpg"
import MainControls from "./MainControls"
import { Button } from "primereact/button"
import { Dropdown } from "primereact/dropdown"
import { Checkbox } from "primereact/checkbox"

export default function AcquisitionCamera({
  canEdit,
  ac,
}: {
  canEdit: boolean
  ac: string
}) {
  return (
    <div className="acquisition-camera">
      <div className="left">
        <div className="image">
          <span className="ac-name">{ac}</span>
          <img src={imgUrl} alt="wfs" />
        </div>
        <div className="controls">
          <span
            style={{ textAlign: "center", alignSelf: "center", gridArea: "g1" }}
          >
            Exp
          </span>
          <Dropdown
            disabled={!canEdit}
            style={{ gridArea: "g2" }}
            value={2}
            options={[{ label: "a", value: "a" }]}
          />
          <span
            style={{ textAlign: "center", alignSelf: "center", gridArea: "g3" }}
          >
            Save
          </span>
          <Checkbox
            disabled={!canEdit}
            style={{ gridArea: "g4" }}
            checked={true}
          />
          <Button
            disabled={!canEdit}
            style={{ gridArea: "g5" }}
            icon="pi pi-stop"
            aria-label="Stop"
            tooltip="Stop"
          />
          <Button
            disabled={!canEdit}
            style={{ gridArea: "g6" }}
            icon="pi pi-camera"
            aria-label="Take Sky"
            tooltip="Take Sky"
          />
        </div>
      </div>
      <MainControls canEdit={canEdit} />
    </div>
  )
}
