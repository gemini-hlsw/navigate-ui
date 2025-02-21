import { useQuery } from '@apollo/client';

import { graphql } from './gen';

export const GET_VERSION = graphql(`
  query version {
    serverVersion
  }
`);

export function useVersion() {
  return useQuery(GET_VERSION);
}
