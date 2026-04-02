// 4. POST /tributes - 헌화 생성
export interface CreateTributeRequest {
  message: string
  nickname: string
  idempotencyKey?: string
}

export interface CreateTributeResponse {
  tributeId: string
  camelliaCount: number
  pledgedAmountWon: number
  createdAt: string
}

// 5. GET /tributes - 헌화 목록 (페이지네이션)
export interface TributeItem {
  id: string
  siteName: string
  message: string
  nickname: string
  camelliaCount: number
  createdAt: string
}

export interface TributeListResponse {
  items: TributeItem[]
  page: number
  size: number
  totalElements: number
  totalPages: number
}

export interface GetTributesParams {
  page?: number
  size?: number
  siteId?: string
}
