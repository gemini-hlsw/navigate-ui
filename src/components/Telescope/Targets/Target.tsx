import { useContext } from "react"
import { TargetType } from "../../../types"
import { AuthContext } from "../../Auth/AuthProvider"

export function Target({
  target,
  updateSelectedTarget,
  selectedTarget = undefined,
}: {
  target: TargetType
  updateSelectedTarget(target: number): void
  selectedTarget?: number | undefined
}) {
  const { canEdit } = useContext(AuthContext)

  if (target.type === "FIXED") {
    return (
      <li
        className={`${selectedTarget === target.pk ? "selected-target" : ""}`}
        key={`science-target`}
        onClick={() => updateSelectedTarget(target.pk)}
      >
        <div className="target-item">
          <span className="target-name" title={target.name}>
            {target.name}
          </span>
          <span className="text-right">{target.az?.dms}</span>
          <span>Az</span>
          <span className="text-right">{target.el?.dms}</span>
          <span>El</span>
          {/* <Button disabled={!canEdit} icon="pi pi-pencil" aria-label="Edit" tooltip="Edit" /> */}
        </div>
      </li>
    )
  } else {
    return (
      <li
        className={`${selectedTarget === target.pk ? "selected-target" : ""}`}
        key={`science-target`}
        onClick={() => updateSelectedTarget(target.pk)}
      >
        <div className="target-item">
          <span className="target-name" title={target.name}>
            {target.name}
          </span>
          <span className="text-right">{target.ra?.hms}</span>
          <span>RA</span>
          <span className="text-right">{target.dec?.dms}</span>
          <span>Dec</span>
          {/* <Button disabled={!canEdit} icon="pi pi-pencil" aria-label="Edit" tooltip="Edit" /> */}
        </div>
      </li>
    )
  }
}
