import type { QueryHookOptions } from '@apollo/client';
import { useQuery } from '@apollo/client';
import type { ResultOf, VariablesOf } from '@graphql-typed-document-node/core';

import { graphql } from './gen';

export const GET_VERSION = graphql(`
  query version {
    serverVersion
  }
`);

export function useVersion(
  options: QueryHookOptions<ResultOf<typeof GET_VERSION>, VariablesOf<typeof GET_VERSION>> = {},
) {
  return useQuery(GET_VERSION, options);
}
