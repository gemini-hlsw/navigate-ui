import imgUrl from '@assets/underconstruction.png';
import { useGuideState } from '@gql/server/GuideState';
import { useOiwfsObserve, useOiwfsStopObserve } from '@gql/server/WavefrontSensors';
import { clsx } from 'clsx';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';
import { useCallback, useState } from 'react';

export default function WavefrontSensor({
  canEdit,
  wfs,
  className = '',
}: {
  canEdit: boolean;
  wfs: string;
  className?: string;
}) {
  const [freq, setFreq] = useState(100);

  let observeButton: React.ReactNode | undefined;
  if (wfs === 'OIWFS') {
    observeButton = <OiwfsObserveButton freq={freq} canEdit={canEdit} />;
  } else if (wfs === 'PWFS1') {
    /* Show placeholder */
    observeButton = <Pwfs1ObserveButton canEdit={canEdit} />;
  } else if (wfs === 'PWFS2') {
    /* Show placeholder */
    observeButton = <Pwfs2ObserveButton canEdit={canEdit} />;
  }

  return (
    <div className={`wfs ${className}`}>
      <span className="wfs-name">{wfs}</span>
      <img src={imgUrl} alt="wfs" />
      <div className="controls">
        <span style={{ alignSelf: 'center', gridArea: 'g11' }}>Freq</span>
        <Dropdown
          disabled={!canEdit}
          style={{ gridArea: 'g12' }}
          value={freq}
          options={[
            { label: '50', value: 50.0 },
            { label: '100', value: 100.0 },
            { label: '200', value: 200.0 },
          ]}
          onChange={(e) => setFreq(e.value as number)}
        />
        {observeButton}
        <span style={{ alignSelf: 'center', gridArea: 'g21' }}>Save</span>
        <Checkbox disabled={!canEdit} style={{ gridArea: 'g22' }} checked={true} />
        <Button
          disabled={!canEdit}
          style={{ gridArea: 'g23' }}
          icon="pi pi-camera"
          aria-label="Take Sky"
          tooltip="Take Sky"
        />
        <Button disabled={!canEdit} style={{ gridArea: 'g3', width: '97%' }} label="Autoadjust" />
      </div>
    </div>
  );
}

function OiwfsObserveButton({ freq, canEdit }: { freq: number; canEdit: boolean }) {
  const [startObserve, { loading: startObserveLoading }] = useOiwfsObserve();
  const [stopObserve, { loading: stopObserveLoading }] = useOiwfsStopObserve();

  const { data: guideStateData, loading: guideStateLoading } = useGuideState();
  const integrating = guideStateData?.oiIntegrating;

  const onClick = useCallback(
    () =>
      integrating
        ? void stopObserve({})
        : void startObserve({
            variables: { period: { milliseconds: (1 / freq) * 1000 } },
          }),
    [freq, integrating, startObserve, stopObserve],
  );

  return (
    <Button
      loading={guideStateLoading || startObserveLoading || stopObserveLoading}
      disabled={!canEdit}
      style={{ gridArea: 'g13' }}
      icon={clsx('pi', integrating ? 'pi-stop' : 'pi-play')}
      className={clsx(integrating && 'p-button-danger')}
      aria-label={integrating ? 'Stop' : 'Start'}
      tooltip={integrating ? 'Stop' : 'Start'}
      onClick={onClick}
    />
  );
}

function Pwfs1ObserveButton({ canEdit }: { canEdit: boolean }) {
  return (
    <Button
      className="under-construction"
      disabled={!canEdit}
      icon="pi pi-play"
      style={{ gridArea: 'g13' }}
      aria-label="Start"
      tooltip="Start"
    />
  );
}

function Pwfs2ObserveButton({ canEdit }: { canEdit: boolean }) {
  return (
    <Button
      className="under-construction"
      disabled={!canEdit}
      icon="pi pi-play"
      style={{ gridArea: 'g13' }}
      aria-label="Start"
      tooltip="Start"
    />
  );
}
