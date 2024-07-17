import { isNotNullish } from '@/Helpers/functions';
import { GuideAlarm, UpdateGuideAlarmMutationVariables, WfsType } from '@gql/configs/gen/graphql';
import { GuideQuality } from '@gql/server/gen/graphql';
import { Title } from '@Shared/Title/Title';
import { clsx } from 'clsx';
import { Checkbox, CheckboxChangeEvent } from 'primereact/checkbox';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { useId } from 'react';

export function Alarm({
  wfs,
  disabled,
  guideQuality,
  alarm,
  onUpdateAlarm,
}: {
  wfs: WfsType;
  disabled: boolean;
  guideQuality: GuideQuality | undefined;
  alarm: GuideAlarm | undefined;
  onUpdateAlarm: (alarm: UpdateGuideAlarmMutationVariables) => void;
}) {
  const id = useId();

  const limit = alarm?.limit;
  const enabled = alarm?.enabled ?? true;

  function onLimitChange(e: InputNumberValueChangeEvent) {
    if (isNotNullish(e.value)) onUpdateAlarm({ wfs, limit: e.value });
  }

  function onEnabledChange(e: CheckboxChangeEvent): void {
    if (isNotNullish(e.checked)) onUpdateAlarm({ wfs, enabled: e.checked });
  }

  const disabledOrNoData = disabled || !guideQuality || !alarm;
  const hasAlarm = enabled && ((guideQuality?.flux ?? 0) < (limit ?? 0) || !guideQuality?.centroidDetected);

  return (
    <div className={clsx('alarm', hasAlarm && 'has-alarm')}>
      <div className="title-bar">
        <Title title={wfs} />
        <div className="alarm-indicator animate-ping" />
      </div>
      <div className="body">
        <label htmlFor={`flux-${id}`} className="label">
          Counts
        </label>
        <output id={`flux-${id}`} style={{ alignSelf: 'center' }}>
          {guideQuality?.flux ?? ''}
        </output>
        <label htmlFor={`limit-${id}`} className="label">
          Limit
        </label>
        <InputNumber
          inputId={`limit-${id}`}
          min={0}
          disabled={disabledOrNoData}
          value={limit}
          onValueChange={onLimitChange}
        />
        <label htmlFor={`centroid-${id}`} className="label">
          Subaperture
        </label>
        <output id={`centroid-${id}`} style={{ alignSelf: 'center' }}>
          {guideQuality?.centroidDetected ? 'OK' : 'NOK'}
        </output>
        <label htmlFor={`enabled-${id}`} className="label">
          Enabled
        </label>
        <Checkbox inputId={`enabled-${id}`} disabled={disabledOrNoData} checked={enabled} onChange={onEnabledChange} />
      </div>
    </div>
  );
}
