import { useState, useEffect } from 'react'
import { Box, Button, Text, VStack } from '@vapor-ui/core'

import type { StatsResponse } from '../../types/stats'
import { getStats } from '../../api/user'
import { useLocation, useNavigate } from 'react-router-dom'
import CompleteModal from '../../components/CompleteModal'

interface CompletePageLocationState {
  completedModal?: {
    petalOrder: number
    siteName: string
    elderName: string
    storyTitle?: string
    isLast?: boolean
  }
}

export default function CompletePage() {
  const [stats, setStats] = useState<StatsResponse | null>(null)
  const navigate = useNavigate()
  const location = useLocation()
  const locationState = location.state as CompletePageLocationState | null
  const [copied, setCopied] = useState(false)
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(
    Boolean(locationState?.completedModal)
  )

  useEffect(() => {
    getStats().then(setStats).catch(console.error)
  }, [])

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      console.error('클립보드 복사에 실패했습니다.')
    }
  }

  const onReview = () => {
    navigate('/tribute/feed')
  }

  const handleCloseCompleteModal = () => {
    setIsCompleteModalOpen(false)
    navigate(location.pathname, { replace: true })
  }

  return (
    <>
      <Box $css={{ maxWidth: '390px', margin: '0 auto', padding: '$400' }}>
        <VStack $css={{ gap: '$400', alignItems: 'center' }}>
          {/* 이미지 자리 */}

          <img
            src="/images/flower.png"
            alt="꽃잎"
            style={{ width: '208px', objectFit: 'contain', marginTop: '60px' }}
          />

          {/* 통계 텍스트 */}
          <VStack $css={{ gap: '$100', alignItems: 'center', textAlign: 'center' }}>
            <Text
              typography="subtitle2"
              $css={{
                color: 'var(--vapor-color-hondi-300)',
                textAlign: 'center',
                letterSpacing: 'var(--vapor-typography-letterSpacing-000)',
              }}
            >
              지금까지
            </Text>
            <Text
              $css={{
                color: 'var(--vapor-color-hondi-400)',
                textAlign: 'center',
                fontFamily: 'var(--vapor-typography-fontFamily-sans)',
                fontSize: '28px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: 'var(--vapor-typography-lineHeight-400)' /* 128.571% */,
                letterSpacing: 'var(--vapor-typography-letterSpacing-300)',
              }}
            >
              {stats ? `${stats.participantCount.toLocaleString()}명` : '-'}{' '}
              <Text
                typography="heading2"
                $css={{ color: 'var(--vapor-color-foreground-normal-200)', display: 'inline' }}
              >
                이
              </Text>
            </Text>
            <Text
              $css={{
                color: 'var(--vapor-color-foreground-normal-200)',
                textAlign: 'center',
                fontFamily: 'var(--vapor-typography-fontFamily-sans)',
                fontSize: '28px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: 'var(--vapor-typography-lineHeight-400)',
                letterSpacing: 'var(--vapor-typography-letterSpacing-300)',
              }}
            >
              함께 동백꽃을 피웠습니다
            </Text>
          </VStack>

          {/* 안내 문구 */}
          <Text
            typography="body2"
            foreground="hint-100"
            $css={{
              textAlign: 'center',
              color: 'var(--vapor-color-gray-400)',
              fontFamily: 'var(--vapor-typography-fontFamily-sans)',
              fontSize: 'var(--vapor-typography-fontSize-200)',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: 'var(--vapor-typography-lineHeight-200)',
              letterSpacing: 'var(--vapor-typography-letterSpacing-000)',
            }}
          >
            동백꽃은 한 송이당 {stats ? stats.pledgeUnitWon.toLocaleString() : '1,000'}원이 되어
            <br />
            제주 4·3 유적지 복원 사업을 위해
            <br />
            전액 기부될 예정입니다
          </Text>

          {/* 버튼 영역 */}
          <VStack $css={{ gap: '$200', width: '100%', alignItems: 'center' }}>
            <Text
              typography="body3"
              $css={{
                color: 'var(--vapor-color-hondi-300)',
                textAlign: 'center',
                fontFamily: 'var(--vapor-typography-fontFamily-sans)',
                fontSize: 'var(--vapor-typography-fontSize-075)',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: 'var(--vapor-typography-lineHeight-200)',
                letterSpacing: 'var(--vapor-typography-letterSpacing-100)',
                marginTop: '68px',
              }}
            >
              제주 어르신들의 이야기가 기억에 남는다면
            </Text>
            <Button
              variant="fill"
              $css={{
                width: '100%',
                height: '48px',
                borderRadius: 'var(--vapor-size-borderRadius-300)',
                fontFamily: 'var(--vapor-typography-fontFamily-sans)',
                fontSize: 'var(--vapor-typography-fontSize-100)',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: 'var(--vapor-typography-lineHeight-100)',
                letterSpacing: 'var(--vapor-typography-letterSpacing-100)',
                color: 'var(--vapor-color-white)',
              }}
              onClick={onReview}
            >
              후기 남기기
            </Button>
            <Button
              variant="ghost"
              $css={{
                width: '100%',
                height: '48px',
                borderRadius: 'var(--vapor-size-borderRadius-300)',
                fontFamily: 'var(--vapor-typography-fontFamily-sans)',
                fontSize: 'var(--vapor-typography-fontSize-100)',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: 'var(--vapor-typography-lineHeight-100)',
                letterSpacing: 'var(--vapor-typography-letterSpacing-100)',
                color: 'var(--vapor-secondary)',
                backgroundColor: 'var(--vapor-color-gray-100)',
              }}
              onClick={handleShare}
            >
              {copied ? '링크가 복사되었습니다!' : '공유하기'}
            </Button>
          </VStack>
        </VStack>
      </Box>

      {locationState?.completedModal && (
        <CompleteModal
          open={isCompleteModalOpen}
          onClose={handleCloseCompleteModal}
          petalOrder={locationState.completedModal.petalOrder}
          siteName={locationState.completedModal.siteName}
          elderName={locationState.completedModal.elderName}
          storyTitle={locationState.completedModal.storyTitle}
          isLast={locationState.completedModal.isLast}
        />
      )}
    </>
  )
}
