import { useContext, useEffect, useState } from "react"
import { BaseTarget, WfsOption } from "../../../types"
import { Button } from 'primereact/button'
import { AuthContext } from "../../Auth/AuthProvider"
import { TelescopeContext } from "../TelescopeProvider"
import { Target } from "./Target"

interface TargetI {
  type: WfsOption
}

const INITIAL_TARGET: BaseTarget = {
  id: "",
  name: "",
  raAz: "",
  decEl: "",
  epoch: "J2000.000",
  coordSystem: "Celestial",
  type: "Base"
}

export function GuideTarget({ type }: TargetI) {
  const { scienceTarget } = useContext(TelescopeContext)
  const [selectedTarget, setSelectedTarget] = useState<BaseTarget>(INITIAL_TARGET)

  let displayTargets: JSX.Element[] = []
  scienceTarget.guideTargets?.map((target: BaseTarget, index: number) => {
    displayTargets.push(
      <Target
        key={`blind-target-${index}`}
        target={target}
        selectTarget={setSelectedTarget}
      />
    )
  })

  return (
    <div className="target">
      <div className="selected-target">
        <span>{selectedTarget.type}</span>
        <span>{selectedTarget.name}</span>
        <span className="text-right">{selectedTarget.raAz}</span>
        <span>{(selectedTarget.coordSystem === "Celestial") ? "RA" : "Az"}</span>
        <span className="text-right">{selectedTarget.decEl}</span>
        <span>{(selectedTarget.coordSystem === "Celestial") ? "Dec" : "El"}</span>
      </div>
      <ul className="target-list">
        {displayTargets}
      </ul>
    </div>
  )
}