import { gql, useMutation, useSubscription } from '@apollo/client';

const GUIDE_STATE_SUBSCRIPTION = gql`
  subscription guideState {
    guideState {
      m2Inputs
      m2Coma
      m1Input
      mountOffload
    }
  }
`;

export function useGuideState() {
  const { data, loading } = useSubscription(GUIDE_STATE_SUBSCRIPTION);

  return { data, loading };
}

const GUIDE_ENABLE = gql`
  mutation guideEnable($config: GuideConfigurationInput!) {
    guideEnable(config: $config) {
      result
      msg
    }
  }
`;

export function useGuideEnable() {
  const [mutationFunction] = useMutation(GUIDE_ENABLE);

  return mutationFunction;
}

const GUIDE_DISABLE = gql`
  mutation guideDisable {
    guideDisable {
      result
      msg
    }
  }
`;

export function useGuideDisable() {
  const [mutationFunction] = useMutation(GUIDE_DISABLE);

  return mutationFunction;
}
