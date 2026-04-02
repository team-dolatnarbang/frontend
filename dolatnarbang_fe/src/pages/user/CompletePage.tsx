import { useState, useEffect } from 'react'
import { Box, Button, Text, VStack } from '@vapor-ui/core'

import type { StatsResponse } from '../../types/stats'
import { getStats } from '../../api/user'

export default function CompletePage() {
  const [stats, setStats] = useState<StatsResponse | null>(null)

  useEffect(() => {
    getStats().then(setStats).catch(console.error)
  }, [])

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin)
    } catch {
      console.error('클립보드 복사에 실패했습니다.')
    }
    onShare()
  }

  const onShare = () => {
    alert('공유하기 기능은 곧 제공될 예정입니다.')
  }

  const onReview = () => {
    alert('후기 남기기 기능은 곧 제공될 예정입니다.')
  }

  return (
    <Box $css={{ maxWidth: '390px', margin: '0 auto', padding: '$400' }}>
      <VStack $css={{ gap: '$400', alignItems: 'center' }}>
        {/* 이미지 자리 */}
        <Box
          $css={{
            width: '220px',
            height: '220px',
            background: 'var(--vapor-color-gray-200)',
            borderRadius: '$200',
          }}
        />

        {/* 통계 텍스트 */}
        <VStack $css={{ gap: '$100', alignItems: 'center', textAlign: 'center' }}>
          <Text typography="body3" foreground="warning-100">
            지금까지
          </Text>
          <Text typography="heading2" $css={{ color: 'var(--vapor-color-foreground-warning-100)' }}>
            {stats ? `${stats.participantCount.toLocaleString()}명` : '-'}{' '}
            <Text
              typography="heading2"
              $css={{ color: 'var(--vapor-color-foreground-normal-200)', display: 'inline' }}
            >
              이
            </Text>
          </Text>
          <Text typography="heading2">함께 동백꽃을 피웠습니다</Text>
        </VStack>

        {/* 안내 문구 */}
        <Text typography="body2" foreground="hint-100" $css={{ textAlign: 'center' }}>
          동백꽃은 한 송이당 {stats ? stats.pledgeUnitWon.toLocaleString() : '1,000'}원이 되어{'\n'}
          제주 4·3 유적지 복원 사업을 위해{'\n'}
          전액 기부될 예정입니다
        </Text>

        {/* 버튼 영역 */}
        <VStack $css={{ gap: '$200', width: '100%', alignItems: 'center' }}>
          <Text typography="body3" $css={{ color: 'var(--vapor-color-foreground-warning-100)' }}>
            제주 어르신들의 이야기가 기억에 남는다면
          </Text>
          <Button
            colorPalette="warning"
            variant="fill"
            $css={{ width: '100%', borderRadius: '$500' }}
            onClick={onReview}
          >
            후기 남기기
          </Button>
          <Button variant="ghost" $css={{ width: '100%' }} onClick={handleShare}>
            공유하기
          </Button>
        </VStack>
      </VStack>
    </Box>
  )
}
