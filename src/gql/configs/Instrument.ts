import { gql, useLazyQuery } from '@apollo/client';

const GET_DISTINCT_INSTRUMENTS = gql`
  query getDistinctInstruments {
    distinctInstruments {
      name
    }
  }
`;

export function useGetDistinctInstruments() {
  const [queryFunction] = useLazyQuery(GET_DISTINCT_INSTRUMENTS, {
    context: { clientName: 'navigateConfigs' },
  });

  return queryFunction;
}

const GET_DISTINCT_PORTS = gql`
  query getDistinctPorts($name: String!) {
    distinctPorts(name: $name) {
      issPort
    }
  }
`;

export function useGetDistinctPorts() {
  const [queryFunction] = useLazyQuery(GET_DISTINCT_PORTS, {
    context: { clientName: 'navigateConfigs' },
  });

  return queryFunction;
}

const GET_INSTRUMENTS = gql`
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
`;

export function useGetInstruments() {
  const [queryFunction] = useLazyQuery(GET_INSTRUMENTS, {
    context: { clientName: 'navigateConfigs' },
  });

  return queryFunction;
}

const GET_INSTRUMENT = gql`
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
`;

export function useGetInstrument() {
  const [queryFunction] = useLazyQuery(GET_INSTRUMENT, {
    context: { clientName: 'navigateConfigs' },
  });

  return queryFunction;
}
