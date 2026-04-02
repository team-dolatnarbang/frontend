// 일반 사용자 전용 (4~6번)
import apiClient from './apiClient'
import type {
  CreateTributeRequest,
  CreateTributeResponse,
  TributeListResponse,
  GetTributesParams,
} from '../types/tribute'
import type { StatsResponse } from '../types/stats'

// 4. POST /tributes - 헌화 생성
export const createTribute = async (data: CreateTributeRequest): Promise<CreateTributeResponse> => {
  const response = await apiClient.post<CreateTributeResponse>('/tributes', data)
  return response.data
}

// 5. GET /tributes - 헌화 목록
export const getTributes = async (params?: GetTributesParams): Promise<TributeListResponse> => {
  const response = await apiClient.get<TributeListResponse>('/tributes', { params })
  return response.data
}

// 6. GET /stats - 공개 통계 (~10분 캐시)
export const getStats = async (): Promise<StatsResponse> => {
  const response = await apiClient.get<StatsResponse>('/stats')
  return response.data
}
