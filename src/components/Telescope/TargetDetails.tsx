import { TargetObj } from "../../types"

export default function TargetDetails({ target }: { target: TargetObj | undefined }) {
  if (!Boolean(target)) return null
  return (
    <div className="target-details">
      <span>HA:</span>
      <span>{0}</span>
      <span>Elevation:</span>
      <span>{0}</span>
      <span></span>
      <span></span>
      <span>Azimuth:</span>
      <span>{0}</span>
      <span>Wrap p1:</span>
      <span>{0}</span>
      <span>Wrap p2:</span>
      <span>{0}</span>
      <span>Rotator:</span>
      <span>{0}</span>
      <span>Wrap p1:</span>
      <span>{0}</span>
      <span>Wrap p2:</span>
      <span>{0}</span>
      <span>Zenith dist:</span>
      <span>{0}</span>
      <span>Moon dist:</span>
      <span>{0}</span>
    </div>
  )
}