import { useQuery, gql, useLazyQuery } from "@apollo/client"

interface OdbImportI {
  isOdbModalVisible: boolean
  setIsOdbModalVisible: (_: boolean) => void
  canEdit: boolean
  setImportedTarget: (_: any) => void
}

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
  const { loading, error, data, refetch } = useQuery(GET_OBSERVATIONS, {
    context: { clientName: "odb" },
  })

  if (loading) return [refetch, null]
  return [refetch, data.observations]
}

const GET_GUIDE_TARGETS = gql`
  query getGuideTargets($observationId: String!, $observationTime: String!) {
    observation(observationId: $observationId) {
      targetEnvironment {
        guideEnvironment(observationTime: $observationTime) {
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
