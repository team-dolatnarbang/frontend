import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { completeListenSite, getSiteById, getSites } from '../api/places'
import type { CompleteListenRequest } from '../types/place'

export const useSites = () => {
  return useQuery({
    queryKey: ['sites'],
    queryFn: getSites,
  })
}

export const useSiteDetail = (siteId: string) => {
  return useQuery({
    queryKey: ['sites', siteId],
    queryFn: () => getSiteById(siteId),
    enabled: !!siteId,
  })
}

export const useCompleteListenSite = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ siteId, body }: { siteId: string; body?: CompleteListenRequest }) =>
      completeListenSite(siteId, body),
    onSuccess: (_, { siteId }) => {
      queryClient.invalidateQueries({ queryKey: ['sites', siteId] })
      queryClient.invalidateQueries({ queryKey: ['sites'] })
    },
  })
}
