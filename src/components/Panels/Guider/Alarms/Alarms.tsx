import { GuideAlarm, UpdateGuideAlarmMutationVariables } from '@gql/configs/gen/graphql';
import { useGuideAlarms, useUpdateGuideAlarm } from '@gql/configs/GuideAlarm';
import { useGuideQualities } from '@gql/server/GuideQuality';
import { Title } from '@Shared/Title/Title';
import { Alarm } from './Alarm';
import { useCanEdit } from '@/components/atoms/auth';
import { GuideQuality } from '@gql/server/gen/graphql';
import { useEffect } from 'react';
import { useSetGuideAlarm } from '@/components/atoms/alarm';

export function Alarms() {
  const canEdit = useCanEdit();
  const toggleGuideAlarm = useSetGuideAlarm();

  const { data, loading: subscriptionLoading } = useGuideQualities();
  const guideQualities = data?.guidersQualityValues;

  const { data: alarmsData, loading: alarmsLoading, updateQuery } = useGuideAlarms();
  const alarms = alarmsData?.guideAlarms;

  const [updateAlarm] = useUpdateGuideAlarm();

  useEffect(() => {
    const hasAlarm =
      !!alarms &&
      !!guideQualities &&
      (evaluateAlarm(alarms.OIWFS, guideQualities.oiwfs) ||
        evaluateAlarm(alarms.PWFS1, guideQualities.pwfs1) ||
        evaluateAlarm(alarms.PWFS2, guideQualities.pwfs2));

    toggleGuideAlarm(hasAlarm);
  }, [alarms, guideQualities]);

  function onUpdateAlarm(variables: UpdateGuideAlarmMutationVariables) {
    updateAlarm({
      variables,
      onCompleted(data) {
        updateQuery((prev) => ({ guideAlarms: { ...prev.guideAlarms, [variables.wfs]: data.updateGuideAlarm } }));
      },
    });
  }

  const disabled = !canEdit || subscriptionLoading || alarmsLoading;

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
