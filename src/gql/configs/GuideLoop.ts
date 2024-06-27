import { gql, useLazyQuery, useMutation } from '@apollo/client';

const GET_GUIDE_LOOP = gql`
  query getGuideLoop {
    guideLoop {
      pk
      m2TipTiltEnable
      m2TipTiltSource
      m2FocusEnable
      m2FocusSource
      m2TipTiltFocusLink
      m2ComaEnable
      m1CorrectionsEnable
      m2ComaM1CorrectionsSource
      mountOffload
      daytimeMode
      probeTracking
      lightPath
    }
  }
`;

export function useGetGuideLoop() {
  const [queryFunction, { data, loading, error }] = useLazyQuery(GET_GUIDE_LOOP, {
    context: { clientName: 'navigateConfigs' },
  });

  return queryFunction;
}

const UPDATE_GUIDE_LOOP = gql`
  mutation updateGuideLoop(
    $pk: Int!
    $m2TipTiltEnable: Boolean
    $m2TipTiltSource: String
    $m2FocusEnable: Boolean
    $m2FocusSource: String
    $m2TipTiltFocusLink: Boolean
    $m2ComaEnable: Boolean
    $m1CorrectionsEnable: Boolean
    $m2ComaM1CorrectionsSource: String
    $mountOffload: Boolean
    $daytimeMode: Boolean
    $probeTracking: String
    $lightPath: String
  ) {
    updateGuideLoop(
      pk: $pk
      m2TipTiltEnable: $m2TipTiltEnable
      m2TipTiltSource: $m2TipTiltSource
      m2FocusEnable: $m2FocusEnable
      m2FocusSource: $m2FocusSource
      m2TipTiltFocusLink: $m2TipTiltFocusLink
      m2ComaEnable: $m2ComaEnable
      m1CorrectionsEnable: $m1CorrectionsEnable
      m2ComaM1CorrectionsSource: $m2ComaM1CorrectionsSource
      mountOffload: $mountOffload
      daytimeMode: $daytimeMode
      probeTracking: $probeTracking
      lightPath: $lightPath
    ) {
      pk
      m2TipTiltEnable
      m2TipTiltSource
      m2FocusEnable
      m2FocusSource
      m2TipTiltFocusLink
      m2ComaEnable
      m1CorrectionsEnable
      m2ComaM1CorrectionsSource
      mountOffload
      daytimeMode
      probeTracking
      lightPath
    }
  }
`;

export function useUpdateGuideLoop() {
  const [mutationFunction, { data, loading, error }] = useMutation(UPDATE_GUIDE_LOOP, {
    context: { clientName: 'navigateConfigs' },
  });

  return mutationFunction;
}
