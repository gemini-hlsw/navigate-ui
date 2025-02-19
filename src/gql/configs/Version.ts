import { useQuery } from '@apollo/client';

import { graphql } from './gen';

export const GET_VERSION = graphql(`
  query version {
    version {
      version
      databaseVersion
    }
  }
`);

export function useVersion() {
  return useQuery(GET_VERSION, {
    context: { clientName: 'navigateConfigs' },
  });
}
