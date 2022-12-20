import { useState } from "react"
import { TargetObj } from "../../types"

export default function Target({ type, targets }: { type: string, targets: TargetObj[] }) {
  const [selectedTarget, setSelectedTarget] = useState<TargetObj>({ type: "radec", name: "example", ra: "00:00:00", dec: "00:00:00" })

  let displayTargets: JSX.Element[] = []
  targets.map((target: any, index: number) => {
    displayTargets.push(
      <li key={`target-item-${index}`} onClick={() => setSelectedTarget(target)}>
        <div className="target-item">
          <span></span>
          <span>{target.name}</span>
          <span className="text-right">{(target.type === "radec") ? target.ra : target.az}</span>
          <span>{(target.type === "radec") ? "RA" : "Az"}</span>
          <span className="text-right">{(target.type === "radec") ? target.dec : target.el}</span>
          <span>{(target.type === "radec") ? "Dec" : "El"}</span>
        </div>
      </li>
    )
  })

  return (
    <div className="target">
      <div className="selected-target">
        <span>{type}</span>
        <span>{selectedTarget.name}</span>
        <span className="text-right">{(selectedTarget.type === "radec") ? selectedTarget.ra : selectedTarget.az}</span>
        <span>{(selectedTarget.type === "radec") ? "RA" : "Az"}</span>
        <span className="text-right">{(selectedTarget.type === "radec") ? selectedTarget.dec : selectedTarget.el}</span>
        <span>{(selectedTarget.type === "radec") ? "Dec" : "El"}</span>
      </div>
      <ul className="target-list">
        {displayTargets}
      </ul>
    </div>
  )
}