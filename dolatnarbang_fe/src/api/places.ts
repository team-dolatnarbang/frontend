import apiClient from './apiClient'
import type {
  SiteListResponse,
  SiteDetail,
  CompleteListenRequest,
  CompleteListenResponse,
} from '../types/place'

// 1. GET /sites
export const getSites = async (): Promise<SiteListResponse> => {
  const response = await apiClient.get<SiteListResponse>('/sites')
  return response.data
}

// 2. GET /sites/:siteId
export const getSiteById = async (siteId: string): Promise<SiteDetail> => {
  const response = await apiClient.get<SiteDetail>(`/sites/${siteId}`)
  return response.data
}

// 3. POST /sites/:siteId/complete-listen
export const completeListenSite = async (
  siteId: string,
  body?: CompleteListenRequest
): Promise<CompleteListenResponse> => {
  const response = await apiClient.post<CompleteListenResponse>(
    `/sites/${siteId}/complete-listen`,
    body
  )
  return response.data
}
