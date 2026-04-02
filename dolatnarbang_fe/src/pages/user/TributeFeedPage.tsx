import { useState, useEffect } from 'react'
import { Box, Button, Text, VStack } from '@vapor-ui/core'
import type { TributeItem } from '../../types/tribute'
import type { StatsResponse } from '../../types/stats'
import { getStats, getTributes } from '../../api/user'

export default function TributeFeedPage() {
  const [items, setItems] = useState<TributeItem[]>([])
  const [stats, setStats] = useState<StatsResponse | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard API 미지원 환경 fallback
      const textarea = document.createElement('textarea')
      textarea.value = window.location.origin
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // TODO: 페이지네이션, 에러 핸들링, 로딩 상태 등 보완 필요
  const fetchData = async (currentPage: number) => {
    setIsLoading(true)
    setError(null)
    try {
      const [tributeRes, statsRes] = await Promise.all([
        getTributes({ page: currentPage, size: 20 }),
        getStats(),
      ])
      setItems(tributeRes.items)
      setTotalPages(tributeRes.totalPages)
      setStats(statsRes)
    } catch {
      setError('데이터를 불러오는 데 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData(page)
  }, [page])

  return (
    <Box $css={{ maxWidth: '360px', margin: '0 auto', padding: '$400' }}>
      <VStack $css={{ gap: '$400' }}>
        <Text typography="heading5" $css={{ textAlign: 'center' }}>
          기억을 지도에 남겼어요
        </Text>

        {/* 통계 */}
        {stats && (
          <VStack $css={{ gap: '$100' }}>
            <Text typography="body3">
              참여 {stats.participantCount.toLocaleString()}명 · 동백{' '}
              {stats.camelliaTotal.toLocaleString()}송이 · 적립금{' '}
              {stats.pledgedAmountTotalWon.toLocaleString()}원
            </Text>
            <Text typography="body4" foreground="hint-100">
              최근 집계 기준 (약 {stats.refreshIntervalSec / 60}분 단위 갱신)
            </Text>
          </VStack>
        )}

        {/* 메시지 목록 */}
        {error && (
          <Text typography="body3" foreground="danger-100">
            {error}
          </Text>
        )}

        {isLoading ? (
          <Text typography="body3" foreground="hint-100">
            불러오는 중...
          </Text>
        ) : (
          <VStack $css={{ gap: '$200' }}>
            {items.map((item) => (
              <Box
                key={item.id}
                $css={{
                  padding: '$200',
                  border: '1px solid var(--vapor-color-border-normal)',
                  borderRadius: '$200',
                }}
              >
                <VStack $css={{ gap: '$050' }}>
                  <Text typography="body3">
                    {item.nickname} · 꽃잎 {item.camelliaCount}개
                  </Text>
                  <Text typography="body2">{item.message}</Text>
                </VStack>
              </Box>
            ))}
          </VStack>
        )}

        {/* 페이지네이션 */}
        {!isLoading && totalPages > 1 && (
          <Box $css={{ display: 'flex', justifyContent: 'center', gap: '$200' }}>
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              이전
            </Button>
            <Text typography="body3" $css={{ alignSelf: 'center' }}>
              {page} / {totalPages}
            </Text>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              다음
            </Button>
          </Box>
        )}

        {/* SNS 공유 버튼 */}
        <Button colorPalette="warning" variant="fill" onClick={handleShare}>
          {copied ? '링크가 복사되었습니다!' : '기억의 sns 공유'}
        </Button>
      </VStack>
    </Box>
  )
}
