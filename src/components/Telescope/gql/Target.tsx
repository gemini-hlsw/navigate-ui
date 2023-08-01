import { useQuery, useMutation, gql } from '@apollo/client'
import { ScienceTarget } from '../../../types'
import { useEffect } from 'react'

const TARGET_MUTATION = gql`
  mutation addTarget(
    $id: String!
    $name: String!
    $raAz: String!
    $decEl: String!
    $epoch: String!
    $type: String!
    $guideTargets: JSON
    $blindTargets: JSON
  ) {
    createTarget(
      id: $id
      name: $name
      raAz: $raAz
      decEl: $decEl
      epoch: $epoch
      type: $type
      guideTargets: $guideTargets
      blindTargets: $blindTargets
    ) {
      id
      name
      raAz
      decEl
      type
      createdAt
      blindTargets
      guideTargets
    }
  }
`

export function useCreateTarget() {
  const [mutationFunction, {data, loading, error}] = useMutation(TARGET_MUTATION)

  function createTarget(target: ScienceTarget) {
    if (target.raAz !== "" && target.decEl !== "") {
      let auxTarget = {
        ...target,
        guideTargets: ("guideTargets" in target) ? target.guideTargets : [],
        blindTargets: ("blindTargets" in target) ? target.blindTargets : [],
      }

      mutationFunction({
        variables: auxTarget,
        context: { clientName: "navigateConfigs" }
      })
    }
  }

  return createTarget
}

const TARGET_QUERY = gql`
  query getTarget {
    target {
      id
      name
      raAz
      decEl
      epoch
      type
      createdAt
      guideTargets
      blindTargets
    }
  }
`

export function useGetTarget() {
  const { loading, error, data, refetch } = useQuery(TARGET_QUERY, {
    context: { clientName: "navigateConfigs" }
  })

  if (loading)
  return {
    id: "",
    name:"",
    raAz: "",
    decEl: "",
    epoch: "",
    type: "Horizontal",
    blindTargets: [],
    guideTargets: []
  }

  return data.target
}