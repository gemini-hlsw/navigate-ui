import { BaseTarget } from "../../../types"

interface ParamsInterface {
  target: BaseTarget
}

export function SelectedTarget({ target }: ParamsInterface) {
  return (
    <div className="target">
      <div className="selected-target">
        <span>{target.type}</span>
        <span>{target.name}</span>
        <span className="text-right">{target.raAz}</span>
        <span>{(target.coordSystem === "Celestial") ? "RA" : "Az"}</span>
        <span className="text-right">{target.decEl}</span>
        <span>{(target.coordSystem === "Celestial") ? "Dec" : "El"}</span>
      </div>
    </div>
  )
}