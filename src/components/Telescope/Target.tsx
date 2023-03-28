import { useEffect, useState } from "react"
import { TargetObj } from "../../types"

interface TargetI {
  type: string
  targets: TargetObj[]
  setBaseTarget?: (_: TargetObj | undefined) => void
}

export default function Target({ type, targets, setBaseTarget }: TargetI) {
  const [selectedTarget, setSelectedTarget] = useState<TargetObj>({ id: "", name: "" })
  useEffect(() => {
    if (selectedTarget)
      if (setBaseTarget)
        setBaseTarget(selectedTarget)
  }, [selectedTarget])

  let displayTargets: JSX.Element[] = []
  targets.map((target: any, index: number) => {
    displayTargets.push(
      <li key={`target-item-${index}`} onClick={() => setSelectedTarget(target)}>
        <div className="target-item">
          <span>{target.id}</span>
          <span>{target.name}</span>
          <span className="text-right">{("sidereal" in target) ? target.sidereal.ra.hms : target.az}</span>
          <span>{("sidereal" in target) ? "RA" : "Az"}</span>
          <span className="text-right">{("sidereal" in target) ? target.sidereal.dec.dms : target.el}</span>
          <span>{("sidereal" in target) ? "Dec" : "El"}</span>
        </div>
      </li>
    )
  })

  return (
    <div className="target">
      <div className="selected-target">
        <span>{type}</span>
        <span>{selectedTarget.name}</span>
        <span className="text-right">{("sidereal" in selectedTarget) ? selectedTarget.sidereal?.ra.hms : selectedTarget.az}</span>
        <span>{("sidereal" in selectedTarget) ? "RA" : "Az"}</span>
        <span className="text-right">{("sidereal" in selectedTarget) ? selectedTarget.sidereal?.dec.dms : selectedTarget.el}</span>
        <span>{("sidereal" in selectedTarget) ? "Dec" : "El"}</span>
      </div>
      <ul className="target-list">
        {displayTargets}
      </ul>
    </div>
  )
}