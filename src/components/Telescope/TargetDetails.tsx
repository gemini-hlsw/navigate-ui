import { TargetObj } from "../../types"

export default function TargetDetails({ target }: { target: TargetObj }) {
  return (
    <div className="target-details">
      <span>HA:</span>
      <span>{target.ha}</span>
      <span>Elevation:</span>
      <span>{target.el}</span>
      <span></span>
      <span></span>
      <span>Azimuth:</span>
      <span>{target.az}</span>
      <span>Wrap pos 1:</span>
      <span>{target.az_wp1}</span>
      <span>Wrap pos 2:</span>
      <span>{target.az_wp2}</span>
      <span>Rotator:</span>
      <span>{target.rot}</span>
      <span>Wrap pos 1:</span>
      <span>{target.rot_wp1}</span>
      <span>Wrap pos 2:</span>
      <span>{target.rot_wp2}</span>
      <span>Zenith dist:</span>
      <span>{target.zd}</span>
      <span>Moon dist:</span>
      <span>{target.md}</span>
    </div>
  )
}