import { useMutation, useSubscription } from '@apollo/client';
import { graphql } from './gen';

const GUIDE_STATE_SUBSCRIPTION = graphql(`
  subscription guideState {
    guideState {
      m2Inputs
      m2Coma
      m1Input
      mountOffload
    }
  }
`);

export function useGuideState() {
  const { data, loading } = useSubscription(GUIDE_STATE_SUBSCRIPTION);

  return { data, loading };
}

const GUIDE_ENABLE = graphql(`
  mutation guideEnable($config: GuideConfigurationInput!) {
    guideEnable(config: $config) {
      result
      msg
    }
  }
`);

export function useGuideEnable() {
  return useMutation(GUIDE_ENABLE);
}

const GUIDE_DISABLE = graphql(`
  mutation guideDisable {
    guideDisable {
      result
      msg
    }
  }
`);

export function useGuideDisable() {
  return useMutation(GUIDE_DISABLE);
}
