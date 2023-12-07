import { Title } from "../../../Shared/Title/Title"
import { InputNumber } from "primereact/inputnumber"
import { Dropdown } from "primereact/dropdown"
import { useEffect, useState } from "react"
import { Checkbox } from "primereact/checkbox"

export function Gems({ canEdit }: { canEdit: boolean }) {
  const [adc, setAdc] = useState(true)
  useEffect(() => {
    console.log(adc)
  }, [adc])

  return (
    <div className="ao-gems">
      <Title title={"GeMS"} />
      <div className="body">
        <span className="label">ADC</span>
        <Checkbox
          disabled={!canEdit}
          checked={adc}
          onChange={() => setAdc(!adc)}
        />
        <span className="label">Beamsplitter</span>
        <Dropdown
          disabled={!canEdit}
          value={""}
          options={["400 nm", "550 nm", "700nm", "850 nm", "1000 nm"]}
          onChange={(e) => console.log(e.value)}
          placeholder="Select a tracking"
        />
        <span className="label">Astrometric mode</span>
        <Dropdown
          disabled={!canEdit}
          value={""}
          options={["Best", "Average"]}
          onChange={(e) => console.log(e.value)}
          placeholder="Select a tracking"
        />
      </div>
    </div>
  )
}

export function Altair({ canEdit }: { canEdit: boolean }) {
  return (
    <div className="ao-altair">
      <Title title={"Altair"} />
      <div className="body">
        <span className="label">Beamsplitter</span>
        <Dropdown
          disabled={!canEdit}
          value={""}
          options={["400 nm", "550 nm", "700nm", "850 nm", "1000 nm"]}
          onChange={(e) => console.log(e.value)}
          placeholder="Select a tracking"
        />
        <span className="label">ND filter</span>
        <Checkbox
          disabled={!canEdit}
          checked={true}
          onChange={(e) => e.target.value}
        />
        <span className="label">Star Mag</span>
        <InputNumber
          disabled={!canEdit}
          value={0.0}
          onValueChange={(e) => console.log(e.value ? e.value : 0)}
        />
        <span className="label">Field Lens</span>
        <Checkbox
          disabled={!canEdit}
          checked={true}
          onChange={(e) => e.target.value}
        />
        <span className="label">Seeing r0</span>
        <InputNumber
          disabled={!canEdit}
          value={0.0}
          onValueChange={(e) => console.log(e.value ? e.value : 0)}
        />
        <span className="label">Deploy ADC</span>
        <Checkbox
          disabled={!canEdit}
          checked={true}
          onChange={(e) => e.target.value}
        />
        <span className="label">Wind speed</span>
        <InputNumber
          disabled={!canEdit}
          value={0.0}
          onValueChange={(e) => console.log(e.value ? e.value : 0)}
        />
        <span className="label">Adjust ADC</span>
        <Checkbox
          disabled={!canEdit}
          checked={true}
          onChange={(e) => e.target.value}
        />
        <span className="label">Force Mode</span>
        <Checkbox
          disabled={!canEdit}
          checked={true}
          onChange={(e) => e.target.value}
        />
        <span className="label">Use LGS</span>
        <Checkbox
          disabled={!canEdit}
          checked={true}
          onChange={(e) => e.target.value}
        />
      </div>
    </div>
  )
}
