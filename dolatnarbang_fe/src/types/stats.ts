// 6. GET /stats - 공개 통계 (비실시간, ~10분 캐시)
export interface StatsResponse {
  participantCount: number
  camelliaTotal: number
  pledgedAmountTotalWon: number
  pledgeUnitWon: number
  currency: string
  refreshIntervalSec: number
  updatedAt: string
}
