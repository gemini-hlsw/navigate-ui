import { Dropdown } from 'primereact/dropdown';
import { ProgressBar } from 'primereact/progressbar';
import { Title } from '@Shared/Title/Title';
import { TargetList } from './TargetList';
import { Button } from 'primereact/button';
import { UpdateGuideTargets } from './UpdateGuideTargets';

import { useLoadingGuideTargetValue } from '@/components/atoms/guideTarget';
import { useCanEdit } from '@/components/atoms/auth';
import { useConfiguration } from '@gql/configs/Configuration';
import { useTargets } from '@gql/configs/Target';

function GuiderFooter({ disabled }: { disabled: boolean }) {
  return (
    <div className="guiders-footer">
      <Dropdown
        disabled={disabled} // check is a valid target
        value={'NORMAL'}
        options={[{ label: 'Normal Guiding', value: 'NORMAL' }]}
      />
    </div>
  );
}

export function GuiderTargets() {
  const canEdit = useCanEdit();
  const { oiTargets, p1Targets, p2Targets } = useTargets().data;
  const configuration = useConfiguration().data?.configuration;
  const loadingGuideTarget = useLoadingGuideTargetValue();

  const displayProbes: JSX.Element[] = [];
  if (oiTargets.length > 0) {
    const oiSelected = oiTargets.find((t) => t.pk === configuration?.selectedOiTarget);
    displayProbes.push(
      <div key={'OIWFS'} className="guide-probe">
        <Title title={oiSelected ? `OIWFS: ${oiSelected.name}` : 'OIWFS'} />
        <TargetList targets={oiTargets} type="OIWFS" />
        <GuiderFooter disabled={!canEdit} />
      </div>,
    );
  }

  if (p1Targets.length > 0) {
    const p1Selected = p1Targets.find((t) => t.pk === configuration?.selectedP1Target);
    displayProbes.push(
      <div key={'PWFS1'} className="guide-probe">
        <Title title={p1Selected ? `PWFS1: ${p1Selected.name}` : 'PWFS1'} />
        <TargetList targets={p1Targets} type="PWFS1" />
        <GuiderFooter disabled={!canEdit} />
      </div>,
    );
  }

  if (p2Targets.length > 0) {
    const p2Selected = p2Targets.find((t) => t.pk === configuration?.selectedP2Target);
    displayProbes.push(
      <div key={'PWFS2'} className="guide-probe">
        <Title title={p2Selected ? `PWFS2: ${p2Selected.name}` : 'PWFS2'} />
        <TargetList targets={p2Targets} type="PWFS2" />
        <GuiderFooter disabled={!canEdit} />
      </div>,
    );
  }

  if (displayProbes.length === 0) {
    displayProbes.push(
      <div key={`guideProbe-0`} className="guide-probe">
        <Title title={`OIWFS`} />
        <TargetList targets={[]} />
        <GuiderFooter disabled={true} />
      </div>,
    );
  }
  return (
    <div className="guiders">
      <Title title="Guiders">
        <UpdateGuideTargets canEdit={canEdit} />
      </Title>
      <div className="body">
        {loadingGuideTarget ? (
          <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar>
        ) : (
          displayProbes
        )}
      </div>
      <Button
        disabled={!canEdit} // check is a valid target || !Boolean(selectedGuideTarget?.id)
        className="footer w-100"
        label="Point to guide target"
        onClick={() => console.log('Point to guide target')}
      />
    </div>
  );
}
