import { useQuery, gql } from '@apollo/client'
import { useEffect, useState } from 'react'

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
    context: { clientName: "odb" }
  })

  if (loading) return [refetch, null]
  return [refetch, data.observations]
}