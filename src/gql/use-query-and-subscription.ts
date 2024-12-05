import type { ApolloError, DocumentNode } from '@apollo/client';
import { useQuery } from '@apollo/client';
import type { ResultOf } from '@graphql-typed-document-node/core';
import { useEffect } from 'react';

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
  error?: ApolloError;
} {
  const query = useQuery<ResultOf<TQuery>>(queryNode, {
    nextFetchPolicy: 'cache-only',
    returnPartialData: true,
  });

  useEffect(() =>
    query.subscribeToMore({
      document: subscriptionNode,
      updateQuery: (prev, { subscriptionData }) => subscriptionData.data ?? prev,
    }),
  );

  return {
    ...query,
    data: query.data?.[key],
    loading: query.loading || query.data === undefined,
  };
}
