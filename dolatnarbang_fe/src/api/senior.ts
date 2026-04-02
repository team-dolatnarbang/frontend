// 시니어 전용
import apiClient from './apiClient'

export interface AudioContributionRequest {
  contributorName: string
  siteId: string
  audio: File
  durationSec: number
}

export interface AudioContributionResponse {
  contributionId: string
  status: string
  siteId: string
  contributorName: string
}

export const uploadContributionAudio = async (
  data: AudioContributionRequest,
  sessionId?: string
): Promise<AudioContributionResponse> => {
  const formData = new FormData()
  formData.append('contributorName', data.contributorName)
  formData.append('siteId', data.siteId)
  formData.append('audio', data.audio)
  formData.append('durationSec', String(data.durationSec))

  const headers: Record<string, string> = {}
  if (sessionId) {
    headers['X-Session-Id'] = sessionId
  }

  const response = await apiClient.post<AudioContributionResponse>(
    '/contributions/audio',
    formData,
    { headers }
  )

  return response.data
}

