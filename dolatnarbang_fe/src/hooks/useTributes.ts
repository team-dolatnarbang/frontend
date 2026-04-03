import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createTribute, getTributes } from '../api/user'
import type { CreateTributeRequest, GetTributesParams } from '../types/tribute'

export const useTributes = (params?: GetTributesParams) => {
  return useQuery({
    queryKey: ['tributes', params],
    queryFn: () => getTributes(params),
  })
}

export const useCreateTribute = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateTributeRequest) => createTribute(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tributes'] })
    },
  })
}
