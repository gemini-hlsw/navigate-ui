import { useLazyQuery, useQuery } from '@apollo/client';
import { graphql } from './gen';
import { OptionsOf } from '@gql/util';

const GET_DISTINCT_INSTRUMENTS = graphql(`
  query getDistinctInstruments {
    distinctInstruments {
      name
    }
  }
`);

export function useGetDistinctInstruments() {
  const [queryFunction] = useLazyQuery(GET_DISTINCT_INSTRUMENTS, {
    context: { clientName: 'navigateConfigs' },
  });

  return queryFunction;
}

const GET_DISTINCT_PORTS = graphql(`
  query getDistinctPorts($name: String!) {
    distinctPorts(name: $name) {
      issPort
    }
  }
`);

export function useGetDistinctPorts() {
  const [queryFunction] = useLazyQuery(GET_DISTINCT_PORTS, {
    context: { clientName: 'navigateConfigs' },
  });

  return queryFunction;
}

const GET_INSTRUMENTS = graphql(`
  query getInstruments($name: String!, $issPort: Int!) {
    instruments(name: $name, issPort: $issPort) {
      pk
      name
      iaa
      issPort
      focusOffset
      wfs
      originX
      originY
      ao
      extraParams
    }
  }
`);

export function useGetInstruments() {
  const [queryFunction] = useLazyQuery(GET_INSTRUMENTS, {
    context: { clientName: 'navigateConfigs' },
  });

  return queryFunction;
}

const GET_INSTRUMENT = graphql(`
  query getInstrument($name: String!, $issPort: Int!, $wfs: WfsType) {
    instrument(name: $name, issPort: $issPort, wfs: $wfs) {
      pk
      name
      iaa
      issPort
      focusOffset
      wfs
      originX
      originY
      ao
      extraParams
    }
  }
`);

export function useInstrument(options: OptionsOf<typeof GET_INSTRUMENT> = {}) {
  return useQuery(GET_INSTRUMENT, {
    ...options,
    context: { clientName: 'navigateConfigs' },
  });
}
