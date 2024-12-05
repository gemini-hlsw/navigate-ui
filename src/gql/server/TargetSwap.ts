import { useMutation } from '@apollo/client';

import { graphql } from './gen';

export const SWAP_TARGET_MUTATION = graphql(`
  mutation swapTarget($swapConfig: SwapConfigInput!) {
    swapTarget(swapConfig: $swapConfig) {
      result
      msg
    }
  }
`);
export const RESTORE_TARGET_MUTATION = graphql(`
  mutation restoreTarget($config: TcsConfigInput!) {
    restoreTarget(config: $config) {
      result
      msg
    }
  }
`);

export function useSwapTarget() {
  return useMutation(SWAP_TARGET_MUTATION, {
    update(cache) {
      cache.evict({ fieldName: 'navigateState' });
    },
  });
}

export function useRestoreTarget() {
  return useMutation(RESTORE_TARGET_MUTATION, {
    update(cache) {
      cache.evict({ fieldName: 'navigateState' });
    },
  });
}
