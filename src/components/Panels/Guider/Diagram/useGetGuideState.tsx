import { useGuideState } from '@gql/server/GuideState';

export function useGetGuideState() {
  const { data } = useGuideState();

  if (!data)
    return {
      mountOffload: false,
      daytimeMode: false,
      lightPath: 'Sky ➡ AO ➡ AC',
      m1CorrectionsEnable: false,
      m2ComaEnable: false,
      m2ComaM1CorrectionsSource: 'OIWFS',
      m2FocusEnable: false,
      m2FocusSource: 'OIWFS',
      m2TipTiltEnable: false,
      m2TipTiltFocusLink: true,
      m2TipTiltSource: 'OIWFS',
      probeTracking: 'OI➡OI',
    };

  return {
    mountOffload: data.guideState.mountOffload,
    daytimeMode: true,
    lightPath: 'Sky ➡ AO ➡ AC',
    m1CorrectionsEnable: Boolean(data.guideState.m1Input),
    m2ComaEnable: data.guideState.m2Coma,
    m2ComaM1CorrectionsSource: data.guideState.m1Input,
    m2FocusEnable: false,
    m2FocusSource: 'OIWFS',
    m2TipTiltEnable: data.guideState.m2Inputs ? data.guideState.m2Inputs.length : false,
    m2TipTiltFocusLink: true,
    m2TipTiltSource: data.guideState.m2Inputs ? (data.guideState.m2Inputs as string[]).join(',') : 'NONE',
    probeTracking: 'OI➡OI',
  };
}
