import axios from 'axios'

import { v4 as uuidv4 } from 'uuid'

const getSessionId = (): string => {
  let sessionId = localStorage.getItem('sessionId')
  if (!sessionId) {
    sessionId = uuidv4()
    localStorage.setItem('sessionId', sessionId)
  }
  return sessionId
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

apiClient.interceptors.request.use(
  (config) => {
    config.headers['X-Session-Id'] = getSessionId()
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      const { status } = error.response
      if (status === 404) {
        console.error('요청한 리소스를 찾을 수 없습니다.')
      } else if (status >= 500) {
        console.error('서버 오류가 발생했습니다.')
      }
    } else if (error.request) {
      console.error('네트워크 연결을 확인해주세요.')
    }
    return Promise.reject(error)
  }
)

export default apiClient
