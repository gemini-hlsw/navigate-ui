import { Title } from "../../Title/Title"
import { InputSwitch } from "primereact/inputswitch"
import { InputNumber } from "primereact/inputnumber"
import { Dropdown } from "primereact/dropdown"
import { useEffect, useState } from "react"

export function Gems({ canEdit }: { canEdit: boolean }) {
  const [adc, setAdc] = useState(true)
  useEffect(() => {
    console.log(adc)
  }, [adc])

  return (
    <div className="ao-gems">
      <Title title={"GeMS"} />
      <div className="body">
        <span style={{ textAlign: "center", alignSelf: "center" }}>ADC</span>
        <InputSwitch disabled={!canEdit} checked={adc} onChange={() => setAdc(!adc)} />
        <span style={{ textAlign: "center", alignSelf: "center" }}>Beamsplitter</span>
        <Dropdown
          disabled={!canEdit}
          value={""}
          options={["400 nm", "550 nm", "700nm", "850 nm", "1000 nm"]}
          onChange={(e) => console.log(e.value)}
          placeholder="Select a tracking"
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>Astrometric mode</span>
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
        <span style={{ textAlign: "center", alignSelf: "center" }}>Beamsplitter</span>
        <Dropdown
          disabled={!canEdit}
          value={""}
          options={["400 nm", "550 nm", "700nm", "850 nm", "1000 nm"]}
          onChange={(e) => console.log(e.value)}
          placeholder="Select a tracking"
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>ND filter</span>
        <InputSwitch disabled={!canEdit} checked={true} onChange={(e) => e.target.value} />
        <span style={{ textAlign: "center", alignSelf: "center" }}>Star Mag</span>
        <InputNumber
          disabled={!canEdit}
          value={0.0}
          onValueChange={(e) => console.log((e.value) ? e.value : 0)}
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>Field Lens</span>
        <InputSwitch disabled={!canEdit} checked={true} onChange={(e) => e.target.value} />
        <span style={{ textAlign: "center", alignSelf: "center" }}>Seeing r0</span>
        <InputNumber
          disabled={!canEdit}
          value={0.0}
          onValueChange={(e) => console.log((e.value) ? e.value : 0)}
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>Deploy ADC</span>
        <InputSwitch disabled={!canEdit} checked={true} onChange={(e) => e.target.value} />
        <span style={{ textAlign: "center", alignSelf: "center" }}>Wind speed</span>
        <InputNumber
          disabled={!canEdit}
          value={0.0}
          onValueChange={(e) => console.log((e.value) ? e.value : 0)}
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>Adjust ADC</span>
        <InputSwitch disabled={!canEdit} checked={true} onChange={(e) => e.target.value} />
        <span style={{ textAlign: "center", alignSelf: "center" }}>Force Mode</span>
        <InputSwitch disabled={!canEdit} checked={true} onChange={(e) => e.target.value} />
        <span style={{ textAlign: "center", alignSelf: "center" }}>Use LGS</span>
        <InputSwitch disabled={!canEdit} checked={true} onChange={(e) => e.target.value} />
      </div>
    </div>
  )
}