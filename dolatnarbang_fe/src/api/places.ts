import apiClient from './apiClient'
import type { PlaceItem } from '../types/place'

// 전체 장소 목록 조회
export const getPlaces = async (): Promise<PlaceItem[]> => {
  const response = await apiClient.get<PlaceItem[]>('/places')
  return response.data
}

// 특정 장소 단건 조회
export const getPlaceById = async (id: string): Promise<PlaceItem> => {
  const response = await apiClient.get<PlaceItem>(`/places/${id}`)
  return response.data
}

// 나레이션 청취 완료 처리
export const markListenCompleted = async (id: string): Promise<void> => {
  await apiClient.patch(`/places/${id}/listen-completed`)
}
