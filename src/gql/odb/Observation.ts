import { useLazyQuery } from '@apollo/client';
import { VariablesContext } from '@Contexts/Variables/VariablesProvider';
import { useContext } from 'react';
import { graphql } from './gen';

const GET_OBSERVATIONS = graphql(`
  query getObservations {
    observations {
      matches {
        id
        existence
        title
        subtitle
        status
        activeStatus
        instrument
        program {
          id
          existence
          name
          proposal {
            title
          }
          pi {
            orcidGivenName
            orcidFamilyName
          }
          users {
            user {
              serviceName
            }
          }
        }
        targetEnvironment {
          firstScienceTarget {
            id
            existence
            name
            sidereal {
              epoch
              ra {
                hms
                degrees
              }
              dec {
                dms
                degrees
              }
            }
          }
        }
      }
    }
  }
`);

export function useGetObservations() {
  const { odbToken } = useContext(VariablesContext);
  const [getObservations, { loading, error, data }] = useLazyQuery(GET_OBSERVATIONS, {
    context: {
      clientName: 'odb',
      headers: {
        Authorization: `Bearer ${odbToken}`,
      },
    },
  });

  return { getObservations, loading, data, error };
}

const GET_GUIDE_TARGETS = graphql(`
  query getGuideTargets($observationId: ObservationId!, $observationTime: Timestamp!) {
    observation(observationId: $observationId) {
      targetEnvironment {
        guideEnvironments(observationTime: $observationTime) {
          guideTargets {
            probe
            name
            sidereal {
              epoch
              ra {
                hms
                degrees
              }
              dec {
                dms
                degrees
              }
            }
          }
        }
      }
    }
  }
`);

export function useGetGuideTargets() {
  const { odbToken } = useContext(VariablesContext);
  const [queryFunction] = useLazyQuery(GET_GUIDE_TARGETS, {
    context: {
      clientName: 'odb',
      headers: {
        Authorization: `Bearer ${odbToken}`,
      },
    },
  });

  return queryFunction;
}
