import { gql, useLazyQuery } from "@apollo/client"

const GET_OBSERVATIONS = gql`
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
`

export function useGetObservations() {
  const [getObservations, { loading, error, data }] = useLazyQuery(
    GET_OBSERVATIONS,
    {
      context: { clientName: "odb" },
    }
  )

  return { getObservations, loading, data, error }
}

const GET_GUIDE_TARGETS = gql`
  query getGuideTargets($observationId: String!, $observationTime: String!) {
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
`

export function useGetGuideTargets() {
  const [queryFunction, { called, loading, error, data }] = useLazyQuery(
    GET_GUIDE_TARGETS,
    {
      context: { clientName: "odb" },
    }
  )

  return queryFunction
}
