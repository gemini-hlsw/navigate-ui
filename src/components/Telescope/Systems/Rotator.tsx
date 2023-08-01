import { Title } from "../../Title/Title"
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';

export function Rotator({ canEdit }: { canEdit: boolean }) {
  return (
    <div className="rotator">
      <Title title={"Rotator"} />
      <div className="body">
        <span style={{ textAlign: "center", alignSelf: "center" }}>Tracking</span>
        <Dropdown
          disabled={!canEdit}
          value={""}
          options={["1", "2"]}
          onChange={(e) => console.log(e.value)}
          placeholder="Select a tracking"
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>Angle</span>
        <InputNumber
          disabled={!canEdit}
          value={2}
          onValueChange={(e) => console.log((e.value) ? e.value : 0)}
          mode="decimal"
        />
      </div>
    </div>
  )
}