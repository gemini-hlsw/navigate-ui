import type { GuideAlarm, WfsType } from '@gql/configs/gen/graphql';
import type { GuideConfigurationState, GuideQuality } from '@gql/server/gen/graphql';

/**
 * Alarms should trigger only for WFS that are being used for correction M2 or M1, and only if the guide quality is below the limit or the centroid is not detected.
 */
export function evaluateAlarm(
  alarm: GuideAlarm | undefined,
  guideQuality: GuideQuality | undefined,
  guideState: Pick<GuideConfigurationState, 'm1Input' | 'm2Inputs' | 'mountOffload'> | undefined,
): boolean {
  if (!alarm || !guideQuality) return false;

  const allInputs = [...(guideState?.m2Inputs ?? []), guideState?.m1Input] as (string | undefined)[];

  const correctingM1OrM2 = allInputs.includes(alarm.wfs);

  const isDrifting = guideQuality.flux < alarm.limit || !guideQuality.centroidDetected;

  return correctingM1OrM2 && isDrifting;
}

/**
 * In addition to other alarm rules, if a WFS is used for M2 tip/tilt correction and The offloading of corrections to the mount is enabled, the alarm must also produce a sound.
 * Disabling alarms should only stop the sound.
 */
export function evaluateAlarmSound(
  alarm: GuideAlarm,
  guideQuality: GuideQuality,
  guideState: Pick<GuideConfigurationState, 'm2Inputs' | 'mountOffload'>,
): boolean {
  const correctingM2TipTilt = ((guideState.m2Inputs ?? []) as WfsType[]).includes(alarm.wfs);

  return (
    alarm.enabled && evaluateAlarm(alarm, guideQuality, guideState) && guideState.mountOffload && correctingM2TipTilt
  );
}
