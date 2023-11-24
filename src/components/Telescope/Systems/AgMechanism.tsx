import { Button } from "primereact/button"

export function AgMechanism({ canEdit }: { canEdit: boolean }) {
  return (
    <div className="top-right">
      <div className="title">
        <span>AG Mechanisms</span>
      </div>
      <div className="ag-body">
        <span>Science Fold</span>
        <Button disabled={!canEdit} label="Park" />
        <span>AO Fold</span>
        <Button disabled={!canEdit} label="Park" />
        <span>AC Pickoff</span>
        <Button disabled={!canEdit} label="Park" />
        <span></span>
        <Button disabled={!canEdit} label="Park All" />
      </div>
    </div>
  )
}
