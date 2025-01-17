import { useTargets } from '@gql/configs/Target';
import { AOWFS, CRCS, MCS, OIWFS, PWFS1, PWFS2, SCS } from '@gql/server/Buttons';
import { useTelescopeState } from '@gql/server/TelescopeState';
import { Button } from 'primereact/button';

export function Indicators({ canEdit }: { canEdit: boolean }) {
  const { data, loading: telescopeLoading } = useTelescopeState();
  const { data: targetsData, loading: targetsLoading } = useTargets();

  const loading = telescopeLoading || targetsLoading;

  return (
    <div className="left">
      <MCS label="MCS" loading={loading} disabled={!canEdit} state={data?.mount} />
      <SCS label="SCS" loading={loading} disabled={!canEdit} state={data?.scs} />
      <CRCS label="CRCS" loading={loading} disabled={!canEdit} state={data?.crcs} />
      <PWFS1
        label="PWFS1"
        loading={loading}
        disabled={!canEdit}
        state={data?.pwfs1}
        inUse={Boolean(targetsData.p1Targets.length)}
      />
      <PWFS2
        label="PWFS2"
        loading={loading}
        disabled={!canEdit}
        state={data?.pwfs2}
        inUse={Boolean(targetsData.p2Targets.length)}
      />
      <OIWFS
        label="OIWFS"
        loading={loading}
        disabled={!canEdit}
        state={data?.oiwfs}
        inUse={Boolean(targetsData.oiTargets.length)}
      />
      <Button className="under-construction" loading={loading} disabled={!canEdit} label="ODGW" />
      <AOWFS label="AOWFS" loading={loading} disabled={!canEdit} />
      <Button className="under-construction" loading={loading} disabled={!canEdit} label="Dome" />
      <Button className="under-construction" loading={loading} disabled={!canEdit} label="Shuters" />
      <Button className="under-construction" loading={loading} disabled={!canEdit} label="W VGate" />
      <Button className="under-construction" loading={loading} disabled={!canEdit} label="E VGate" />
    </div>
  );
}
