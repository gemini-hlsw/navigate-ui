import { gql, useLazyQuery, useMutation } from "@apollo/client"

const GET_ALTAIR_GUIDE_LOOP = gql`
  query getAltairGuideLoop {
    altairGuideLoop {
      pk
      aoEnabled
      oiBlend
      focus
      p1Ttf
      strap
      oiTtf
      ttgs
      sfo
    }
  }
`

export function useGetAltairGuideLoop() {
  const [queryFunction, { data, loading, error }] = useLazyQuery(
    GET_ALTAIR_GUIDE_LOOP,
    { context: { clientName: "navigateConfigs" } }
  )

  return queryFunction
}

const UPDATE_ALTAIR_GUIDE_LOOP = gql`
  mutation updateAltairGuideLoop(
    $pk: Int!
    $aoEnabled: Boolean
    $oiBlend: Boolean
    $focus: Boolean
    $p1Ttf: Boolean
    $strap: Boolean
    $oiTtf: Boolean
    $ttgs: Boolean
    $sfo: Boolean
  ) {
    updateAltairGuideLoop(
      pk: $pk
      aoEnabled: $aoEnabled
      oiBlend: $oiBlend
      focus: $focus
      p1Ttf: $p1Ttf
      strap: $strap
      oiTtf: $oiTtf
      ttgs: $ttgs
      sfo: $sfo
    ) {
      pk
      aoEnabled
      oiBlend
      focus
      p1Ttf
      strap
      oiTtf
      ttgs
      sfo
    }
  }
`

export function useUpdateAltairGuideLoop() {
  const [mutationFunction, { data, loading, error }] = useMutation(
    UPDATE_ALTAIR_GUIDE_LOOP,
    { context: { clientName: "navigateConfigs" } }
  )

  return mutationFunction
}
