import { Button } from 'primereact/button';
import { MCS, Oiwfs } from '@gql/server/Buttons';

export function Indicators({ canEdit }: { canEdit: boolean }) {
  return (
    <div className="left">
      <MCS label="MCS" disabled={!canEdit} />
      <Button className="under-construction" disabled={!canEdit} label="SCS" />
      <Button className="under-construction" disabled={!canEdit} label="CRCS" />
      <Button className="under-construction" disabled={!canEdit} label="PWFS1" />
      <Button className="under-construction" disabled={!canEdit} label="PWFS2" />
      <Oiwfs label="OIWFS" disabled={!canEdit} />
      <Button className="under-construction" disabled={!canEdit} label="ODGW" />
      <Button className="under-construction" disabled={!canEdit} label="AOWFS" />
      <Button className="under-construction" disabled={!canEdit} label="Dome" />
      <Button className="under-construction" disabled={!canEdit} label="Shuters" />
      <Button className="under-construction" disabled={!canEdit} label="W VGate" />
      <Button className="under-construction" disabled={!canEdit} label="E VGate" />
    </div>
  );
}
