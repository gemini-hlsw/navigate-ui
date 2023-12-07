import { Title } from "@Shared/Title/Title"
import { Dropdown } from "primereact/dropdown"
import { InputNumber } from "primereact/inputnumber"
import { useContext } from "react"
import { VariablesContext } from "@Contexts/Variables/VariablesProvider"
import { RotatorType } from "@/types"

export function Rotator({ canEdit }: { canEdit: boolean }) {
  const { configuration, setConfiguration } = useContext(VariablesContext)

  return (
    <div className="rotator">
      <Title title={"Rotator"} />
      <div className="body">
        <span className="label">Mode</span>
        <Dropdown
          disabled={!canEdit}
          value={configuration.rotator?.tracking}
          options={["TRACKING", "FIXED"]}
          onChange={(e) =>
            setConfiguration({
              ...configuration,
              rotator: {
                ...(configuration.rotator ?? ({} as RotatorType)),
                tracking: e.target.value,
              },
            })
          }
          placeholder="Select a tracking"
        />
        <span className="label">Angle</span>
        <InputNumber
          disabled={!canEdit}
          value={configuration.rotator?.angle}
          minFractionDigits={2}
          maxFractionDigits={7}
          onValueChange={(e) =>
            setConfiguration({
              ...configuration,
              rotator: {
                ...(configuration.rotator ?? ({} as RotatorType)),
                angle: e.target.value ?? 0.0,
              },
            })
          }
          mode="decimal"
        />
      </div>
    </div>
  )
}
