import { useLazyQuery } from '@apollo/client';

import { useOdbTokenValue } from '@/components/atoms/odb';

import { graphql } from './gen';

const GET_OBSERVATIONS = graphql(`
  query getObservations {
    observations {
      matches {
        id
        existence
        title
        subtitle
        instrument
        # execution {
        #   state
        # }
        program {
          id
          existence
          name
          proposal {
            title
          }
          pi {
            user {
              profile {
                givenName
                familyName
              }
            }
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
  const odbToken = useOdbTokenValue();
  return useLazyQuery(GET_OBSERVATIONS, {
    context: {
      clientName: 'odb',
      headers: {
        Authorization: `Bearer ${odbToken}`,
      },
    },
  });
}

const GET_GUIDE_ENVIRONMENT = graphql(`
  query getGuideEnvironment($obsId: ObservationId!) {
    observation(observationId: $obsId) {
      targetEnvironment {
        guideEnvironment {
          posAngle {
            hms
            degrees
          }
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

export function useGetGuideEnvironment() {
  const odbToken = useOdbTokenValue();
  return useLazyQuery(GET_GUIDE_ENVIRONMENT, {
    context: {
      clientName: 'odb',
      headers: {
        Authorization: `Bearer ${odbToken}`,
      },
    },
  });
}

const GET_CENTRAL_WAVELENGTH = graphql(`
  query getCentralWavelength($obsId: ObservationId!) {
    observation(observationId: $obsId) {
      execution {
        config {
          gmosNorth {
            acquisition {
              nextAtom {
                steps {
                  instrumentConfig {
                    centralWavelength {
                      nanometers
                    }
                  }
                }
              }
            }
          }
          gmosSouth {
            acquisition {
              nextAtom {
                steps {
                  instrumentConfig {
                    centralWavelength {
                      nanometers
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`);

export function useGetCentralWavelength() {
  const odbToken = useOdbTokenValue();
  return useLazyQuery(GET_CENTRAL_WAVELENGTH, {
    context: {
      clientName: 'odb',
      headers: {
        Authorization: `Bearer ${odbToken}`,
      },
    },
  });
}
