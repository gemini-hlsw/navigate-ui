import imgUrl from "@assets/cat2.jpg"
import { Button } from "primereact/button"
import { Dropdown } from "primereact/dropdown"
import { Checkbox } from "primereact/checkbox"

export default function WavefrontSensor({
  canEdit,
  wfs,
}: {
  canEdit: boolean
  wfs: { name: string }
}) {
  return (
    <div className="wfs">
      <span className="wfs-name">{wfs.name}</span>
      <img src={imgUrl} alt="wfs" />
      <div className="controls">
        <span style={{ alignSelf: "center", gridArea: "g11" }}>Freq</span>
        <Dropdown
          disabled={!canEdit}
          style={{ gridArea: "g12" }}
          value={"100"}
          options={[{ label: "100", value: "100" }]}
        />
        <Button
          disabled={!canEdit}
          style={{ gridArea: "g13" }}
          icon="pi pi-stop"
          aria-label="Stop"
          tooltip="Stop"
        />
        <span style={{ alignSelf: "center", gridArea: "g21" }}>Save</span>
        <Checkbox
          disabled={!canEdit}
          style={{ gridArea: "g22" }}
          checked={true}
        />
        <Button
          disabled={!canEdit}
          style={{ gridArea: "g23" }}
          icon="pi pi-camera"
          aria-label="Take Sky"
          tooltip="Take Sky"
        />
        <Button
          disabled={!canEdit}
          style={{ gridArea: "g3", width: "97%" }}
          label="Autoadjust"
        />
      </div>
    </div>
  )
}
