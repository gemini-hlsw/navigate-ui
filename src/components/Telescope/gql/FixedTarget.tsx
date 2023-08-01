import { useQuery, gql } from '@apollo/client'
import { useEffect, useState } from 'react'

interface OdbImportI {
  isOdbModalVisible: boolean
  setIsOdbModalVisible: (_: boolean) => void
  canEdit: boolean
  setImportedTarget: (_: any) => void
}

const GET_FIXED_TARGETS = gql`
  query getFixedTargets {
    allFixedTargets {
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

export function useGetFixedTargets() {
  const { loading, error, data, refetch } = useQuery(GET_FIXED_TARGETS, {
    context: { clientName: "navigateConfigs" }
  })

  if (loading) return [refetch, null]
  return [refetch, data.allFixedTargets]
}