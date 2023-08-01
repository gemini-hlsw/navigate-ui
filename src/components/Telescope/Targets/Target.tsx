import { useContext } from "react"
import { BaseTarget } from "../../../types"
import { AuthContext } from "../../Auth/AuthProvider"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"

interface ParamsInterface {
  target: BaseTarget
  selectTarget: (_: BaseTarget) => void
}

export function Target({ target, selectTarget }: ParamsInterface) {
  const { canEdit } = useContext(AuthContext)
  return (
    <li key={`science-target`} onClick={() => selectTarget({
      id: target.id,
      name: target.name,
      raAz: target.raAz,
      decEl: target.decEl,
      epoch: target.epoch,
      coordSystem: target.coordSystem,
      type: target.type
    })}>
      <div className="target-item">
        <span>{target.type}</span>
        <span>{target.name}</span>
        <span className="text-right">{target.raAz}</span>
        <span>{(target.coordSystem === "Celestial") ? "RA" : "Az"}</span>
        <span className="text-right">{target.decEl}</span>
        <span>{(target.coordSystem === "Celestial") ? "Dec" : "El"}</span>
        {/* <Button disabled={!canEdit} icon="pi pi-pencil" aria-label="Edit" tooltip="Edit" /> */}
      </div>
    </li>
  )
}