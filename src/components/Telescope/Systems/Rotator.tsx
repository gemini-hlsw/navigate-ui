import { Title } from "../../Title/Title"
import { Dropdown } from "primereact/dropdown"
import { InputNumber } from "primereact/inputnumber"
import { useContext } from "react"
import { VariablesContext } from "../../Variables/VariablesProvider"

export function Rotator({ canEdit }: { canEdit: boolean }) {
  const { rotator, setRotator } = useContext(VariablesContext)

  return (
    <div className="rotator">
      <Title title={"Rotator"} />
      <div className="body">
        <span style={{ textAlign: "center", alignSelf: "center" }}>Mode</span>
        <Dropdown
          disabled={!canEdit}
          value={rotator.tracking}
          options={["TRACKING", "FIXED"]}
          onChange={(e) => setRotator({ ...rotator, tracking: e.target.value })}
          placeholder="Select a tracking"
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>Angle</span>
        <InputNumber
          disabled={!canEdit}
          value={rotator.angle}
          minFractionDigits={2}
          maxFractionDigits={7}
          onValueChange={(e) =>
            setRotator({ ...rotator, angle: e.target.value ?? 0.0 })
          }
          mode="decimal"
        />
      </div>
    </div>
  )
}
