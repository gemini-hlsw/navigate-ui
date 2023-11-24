import { useContext, useRef } from "react"
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
  const clickRef = useRef<ReturnType<typeof setTimeout>>()

  function targetClicked(e: React.MouseEvent, target: TargetType) {
    switch (e.detail) {
      case 1:
        clickRef.current = setTimeout(() => {
          updateSelectedTarget(target.pk)
          console.log("Set selected target")
        }, 300)
        break
      case 2:
        clearTimeout(clickRef.current)
        console.log("Cleared timeout")
        break
      default:
        break
    }
  }

  if (target.type === "FIXED") {
    return (
      <li
        className={`${selectedTarget === target.pk ? "selected-target" : ""}`}
        key={`science-target`}
        onClick={(e) => targetClicked(e, target)}
      >
        <div className="target-item">
          <span className="target-name" title={target.name}>
            {target.name}
          </span>
          <span className="text-right">{target.az?.dms}</span>
          <span>Az</span>
          <span className="text-right">{target.el?.dms}</span>
          <span>El</span>
        </div>
      </li>
    )
  } else {
    return (
      <li
        className={`${selectedTarget === target.pk ? "selected-target" : ""}`}
        key={`science-target`}
        onClick={(e) => targetClicked(e, target)}
      >
        <div className="target-item">
          <span className="target-name" title={target.name}>
            {target.name}
          </span>
          <span className="text-right">{target.ra?.hms}</span>
          <span>RA</span>
          <span className="text-right">{target.dec?.dms}</span>
          <span>Dec</span>
        </div>
      </li>
    )
  }
}
