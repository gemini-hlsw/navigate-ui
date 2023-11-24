import { useQuery, gql, useMutation } from "@apollo/client"
import { InstrumentType, ObservationType, RotatorType } from "../../types"

const GET_SELECTED_CONFIGURATION = gql`
  query getSelectedConfiguration {
    selectedConfiguration {
      pk
      configuration {
        pk
        name
        instrument {
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
        rotator {
          pk
          angle
          tracking
        }
        observation {
          pk
          id
          name
          selectedTarget
          selectedProbe
          guideProbes {
            pk
            probe
            selectedTarget
            targets {
              pk
              id
              name
              ra {
                degrees
                hms
              }
              dec {
                degrees
                dms
              }
              az {
                degrees
                dms
              }
              el {
                degrees
                dms
              }
              epoch
              type
              createdAt
            }
          }
          targets {
            pk
            id
            name
            ra {
              degrees
              hms
            }
            dec {
              degrees
              dms
            }
            az {
              degrees
              dms
            }
            el {
              degrees
              dms
            }
            epoch
            type
            createdAt
          }
        }
      }
    }
  }
`

export function useGetSelectedConfiguration() {
  const { loading, data } = useQuery(GET_SELECTED_CONFIGURATION, {
    context: { clientName: "navigateConfigs" },
  })

  if (loading)
    return {
      configuration: {
        instrument: {} as InstrumentType,
        observation: {} as ObservationType,
        rotator: {} as RotatorType,
      },
    }

  return data.selectedConfiguration
}

const UPDATE_SELECTED_CONFIGURATION = gql`
  mutation updateSelectedConfiguration($pk: Int!, $configurationPk: Int!) {
    updateSelectedConfiguration(pk: $pk, configurationPk: $configurationPk) {
      pk
      configuration {
        pk
        name
      }
    }
  }
`

export function useUpdateSelectedConfiguration() {
  const [mutationFunction, { data, loading, error }] = useMutation(
    UPDATE_SELECTED_CONFIGURATION,
    {
      context: { clientName: "navigateConfigs" },
    }
  )

  return mutationFunction
}
