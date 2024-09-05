import { Button } from 'primereact/button';
import { MCS, SCS, CRCS, PWFS1, PWFS2, AOWFS, OIWFS } from '@gql/server/Buttons';
import { useTelescopeState } from '@gql/server/TelescopeState';

export function Indicators({ canEdit }: { canEdit: boolean }) {
  const { data, loading } = useTelescopeState();

  return (
    <div className="left">
      <MCS label="MCS" loading={loading} disabled={!canEdit} state={data?.mount} />
      <SCS label="SCS" loading={loading} disabled={!canEdit} state={data?.scs} />
      <CRCS label="CRCS" loading={loading} disabled={!canEdit} state={data?.crcs} />
      <PWFS1 label="PWFS1" loading={loading} disabled={!canEdit} state={data?.pwfs1} />
      <PWFS2 label="PWFS2" loading={loading} disabled={!canEdit} state={data?.pwfs2} />
      <OIWFS label="OIWFS" loading={loading} disabled={!canEdit} state={data?.oiwfs} />
      <Button className="under-construction" loading={loading} disabled={!canEdit} label="ODGW" />
      <AOWFS label="AOWFS" loading={loading} disabled={!canEdit} />
      <Button className="under-construction" loading={loading} disabled={!canEdit} label="Dome" />
      <Button className="under-construction" loading={loading} disabled={!canEdit} label="Shuters" />
      <Button className="under-construction" loading={loading} disabled={!canEdit} label="W VGate" />
      <Button className="under-construction" loading={loading} disabled={!canEdit} label="E VGate" />
    </div>
  );
}
