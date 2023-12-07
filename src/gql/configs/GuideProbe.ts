import { gql, useMutation } from "@apollo/client"

const CREATE_GUIDEPROBE = gql`
  mutation createGuideProbe(
    $probe: String!
    $observationPk: Int
    $targets: [TargetInput]
  ) {
    createGuideProbe(
      probe: $probe
      observationPk: $observationPk
      targets: $targets
    ) {
      pk
      probe
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
`

export function useCreateGuideProbe() {
  const [mutationFunction, { data, loading, error }] = useMutation(
    CREATE_GUIDEPROBE,
    { context: { clientName: "navigateConfigs" } }
  )

  return mutationFunction
}
