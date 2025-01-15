import type { GuideAlarm, UpdateGuideAlarmMutationVariables, WfsType } from '@gql/configs/gen/graphql';
import type { GuideQuality } from '@gql/server/gen/graphql';
import { Title } from '@Shared/Title/Title';
import { clsx } from 'clsx';
import type { CheckboxChangeEvent } from 'primereact/checkbox';
import { Checkbox } from 'primereact/checkbox';
import type { InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { InputNumber } from 'primereact/inputnumber';
import { useId } from 'react';

import { isNotNullish } from '@/Helpers/functions';

export function Alarm({
  wfs,
  disabled,
  guideQuality,
  alarm,
  onUpdateAlarm,
  hasAlarm,
}: {
  wfs: WfsType;
  disabled: boolean;
  guideQuality: GuideQuality | undefined;
  alarm: GuideAlarm | undefined;
  onUpdateAlarm: (alarm: UpdateGuideAlarmMutationVariables) => void;
  hasAlarm: boolean;
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

  return (
    <div
      data-testid={hasAlarm ? 'has-alarm' : 'no-alarm'}
      className={clsx('alarm', hasAlarm && 'has-alarm animate-error-bg')}
    >
      <div className="title-bar">
        <Title title={wfs} />
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
          data-testid={`limit-${wfs}`}
        />
        <label htmlFor={`centroid-${id}`} className="label">
          Subaperture
        </label>
        <output id={`centroid-${id}`} style={{ alignSelf: 'center' }}>
          {guideQuality?.centroidDetected ? 'OK' : 'NOK'}
        </output>
        <label htmlFor={`enabled-${id}`} className="label">
          Enable
        </label>
        <Checkbox inputId={`enabled-${id}`} disabled={disabledOrNoData} checked={enabled} onChange={onEnabledChange} />
      </div>
    </div>
  );
}
