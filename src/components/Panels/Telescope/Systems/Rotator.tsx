import { Title } from "@Shared/Title/Title"
import { Dropdown } from "primereact/dropdown"
import { InputNumber } from "primereact/inputnumber"
import { useContext, useState } from "react"
import { RotatorType } from "@/types"
import { VariablesContext } from "@Contexts/Variables/VariablesProvider"

export function Rotator({ canEdit }: { canEdit: boolean }) {
  const { rotator, setRotator } = useContext(VariablesContext)

  return (
    <div className="rotator">
      <Title title={"Rotator"} />
      <div className="body">
        <span className="label">Mode</span>
        <Dropdown
          disabled={!canEdit}
          value={rotator.tracking}
          options={["TRACKING", "FIXED"]}
          onChange={
            (e) => console.log("Update rotator tracking")
            // setConfiguration({
            //   ...configuration,
            //   rotator: {
            //     ...(configuration.rotator ?? ({} as RotatorType)),
            //     tracking: e.target.value,
            //   },
            // })
          }
          placeholder="Select a tracking"
        />
        <span className="label">Angle</span>
        <InputNumber
          disabled={!canEdit}
          value={rotator.angle}
          minFractionDigits={2}
          maxFractionDigits={7}
          onValueChange={
            (e) => console.log("Update rotator angle")
            // setConfiguration({
            //   ...configuration,
            //   rotator: {
            //     ...(configuration.rotator ?? ({} as RotatorType)),
            //     angle: e.target.value ?? 0.0,
            //   },
            // })
          }
          mode="decimal"
        />
      </div>
    </div>
  )
}
