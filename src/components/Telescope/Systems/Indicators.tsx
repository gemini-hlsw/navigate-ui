import { Button } from "primereact/button"
import { MCS } from "../../../gql/server/Buttons"

export function Indicators({ canEdit }: { canEdit: boolean }) {
  return (
    <div className="left">
      <MCS label="MCS" disabled={!canEdit} />
      <Button disabled={!canEdit} label="SCS" />
      <Button disabled={!canEdit} label="CRCS" />
      <Button disabled={!canEdit} label="PWFS1" />
      <Button disabled={!canEdit} label="PWFS2" />
      <Button disabled={!canEdit} label="OIWFS" />
      <Button disabled={!canEdit} label="ODGW" />
      <Button disabled={!canEdit} label="AOWFS" />
      <Button disabled={!canEdit} label="Dome" />
      <Button disabled={!canEdit} label="Shuters" />
      <Button disabled={!canEdit} label="W VGate" />
      <Button disabled={!canEdit} label="E VGate" />
    </div>
  )
}
