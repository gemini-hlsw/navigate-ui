import type { ApolloError, DocumentNode } from '@apollo/client';
import { useQuery, useSubscription } from '@apollo/client';
import type { ResultOf } from '@graphql-typed-document-node/core';
import { useDebugValue } from 'react';

/**
 * Combines the results of a query and a subscription into a single object.
 *
 * Subscription data is preferred over query data. Until the subscription data is received, the query data is used.
 */
export function useQueryAndSubscription<
  TQuery extends DocumentNode,
  TSub extends DocumentNode,
  K extends keyof ResultOf<TQuery | TSub>,
>(
  queryNode: TQuery,
  subscriptionNode: TSub,
  key: K,
): {
  data: NonNullable<ResultOf<TQuery | TSub>>[K] | undefined;
  loading: boolean;
  error: ApolloError | undefined;
} {
  const query = useQuery<ResultOf<TQuery>>(queryNode);
  const subscription = useSubscription<ResultOf<TSub>>(subscriptionNode);

  const isSubscription = subscription.data !== undefined;

  useDebugValue(isSubscription ? 'Subscription data' : 'Query data');

  return {
    data: isSubscription ? subscription.data?.[key] : query.data?.[key],
    loading: isSubscription ? subscription.loading : query.loading,
    error: subscription.error ?? query.error,
  };
}
