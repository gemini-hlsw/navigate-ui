import type { GuideAlarm, UpdateGuideAlarmMutationVariables } from '@gql/configs/gen/graphql';
import { useGuideAlarms, useUpdateGuideAlarm } from '@gql/configs/GuideAlarm';
import type { GuideQuality } from '@gql/server/gen/graphql';
import { useGuideQualities } from '@gql/server/GuideQuality';
import { Title } from '@Shared/Title/Title';
import { useEffect } from 'react';

import { useSetGuideAlarm } from '@/components/atoms/alarm';
import { useCanEdit } from '@/components/atoms/auth';

import { Alarm } from './Alarm';

export function Alarms() {
  const canEdit = useCanEdit();
  const toggleGuideAlarm = useSetGuideAlarm();

  const { data, loading: subscriptionLoading } = useGuideQualities();
  const guideQualities = data?.guidersQualityValues;

  const { data: alarmsData, loading: alarmsLoading } = useGuideAlarms();
  const alarms = alarmsData?.guideAlarms;

  const [updateAlarm, { loading: updateLoading }] = useUpdateGuideAlarm();

  useEffect(() => {
    const hasAlarm =
      !!alarms &&
      !!guideQualities &&
      (evaluateAlarm(alarms.OIWFS, guideQualities.oiwfs) ||
        evaluateAlarm(alarms.PWFS1, guideQualities.pwfs1) ||
        evaluateAlarm(alarms.PWFS2, guideQualities.pwfs2));

    toggleGuideAlarm(hasAlarm);
  }, [alarms, guideQualities, toggleGuideAlarm]);

  function onUpdateAlarm(variables: UpdateGuideAlarmMutationVariables) {
    void updateAlarm({
      variables,
    });
  }

  const disabled = !canEdit || subscriptionLoading || alarmsLoading || updateLoading;

  return (
    <div className="alarms">
      <Title title="Guide Alarms" />
      <div className="body">
        <Alarm
          wfs="PWFS1"
          guideQuality={guideQualities?.pwfs1}
          alarm={alarms?.PWFS1}
          disabled={disabled}
          onUpdateAlarm={onUpdateAlarm}
        />
        <Alarm
          wfs="PWFS2"
          guideQuality={guideQualities?.pwfs2}
          alarm={alarms?.PWFS2}
          disabled={disabled}
          onUpdateAlarm={onUpdateAlarm}
        />
        <Alarm
          wfs="OIWFS"
          guideQuality={guideQualities?.oiwfs}
          alarm={alarms?.OIWFS}
          disabled={disabled}
          onUpdateAlarm={onUpdateAlarm}
        />
      </div>
    </div>
  );
}

export function evaluateAlarm(alarm: GuideAlarm | undefined, guideQuality: GuideQuality | undefined): boolean {
  if (!alarm || !guideQuality) return false;

  return alarm.enabled && (guideQuality.flux < alarm.limit || !guideQuality.centroidDetected);
}
