import { gql, useSubscription } from "@apollo/client"

const GUIDE_STATE_SUBSCRIPTION = gql`
  subscription guideState {
    guideState {
      m2Inputs
      m2Coma
      m1Input
      mountOffload
    }
  }
`

export function useLogMessages() {
  const { data, loading } = useSubscription(GUIDE_STATE_SUBSCRIPTION)

  return { data, loading }
}
