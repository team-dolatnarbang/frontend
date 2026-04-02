import { Badge, Button, Card, HStack, Text, VStack } from '@vapor-ui/core'
import type { Place } from '../data/places'

interface Props {
  place: Place
  onPrev?: () => void
  onNext?: () => void
  onBack?: () => void
  currentIndex: number
  total: number
}

export default function PlaceDetailPage({
  place,
  onPrev,
  onNext,
  onBack,
  currentIndex,
  total,
}: Props) {
  return (
    <div
      className="min-h-screen flex justify-center"
      style={{ backgroundColor: 'var(--vapor-color-gray-050)' }}
    >
      <VStack
        $css={{
          width: '100%',
          maxWidth: { sm: '448px', md: '576px', lg: '672px' },
          minHeight: '100vh',
        }}
      >
        {/* 히어로 영역 */}
        <div
          className={`relative w-full flex-shrink-0 overflow-hidden bg-gradient-to-b ${place.imageGradient}`}
          style={{ height: 'clamp(260px, 40vw, 384px)' }}
        >
          <div className="absolute inset-0 bg-black/30" />

          {/* 뒤로가기 버튼 */}
          {onBack && (
            <button
              onClick={onBack}
              style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                background: 'rgba(0,0,0,0.35)',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                color: 'white',
                fontSize: '18px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 20,
              }}
            >
              ←
            </button>
          )}

          {/* 페이지 인디케이터 */}
          <HStack
            $css={{
              position: 'absolute',
              top: '$300',
              left: '0',
              right: '0',
              justifyContent: 'center',
              gap: '$100',
            }}
          >
            {Array.from({ length: total }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: '4px',
                  width: i === currentIndex ? '24px' : '6px',
                  borderRadius: '9999px',
                  backgroundColor: i === currentIndex ? 'white' : 'rgba(255,255,255,0.5)',
                  transition: 'all 0.2s',
                }}
              />
            ))}
          </HStack>

          {/* 장소 정보 */}
          <VStack
            $css={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              right: '0',
              padding: '$400',
              gap: '$200',
            }}
          >
            <Text as="h1" typography="heading3" $css={{ color: 'white' }}>
              {place.name}
            </Text>
            <HStack $css={{ gap: '$150' }}>
              <Badge colorPalette={place.locationColor} shape="pill" size="sm">
                {place.location}
              </Badge>
              <Badge colorPalette={place.categoryColor} shape="pill" size="sm">
                {place.category}
              </Badge>
            </HStack>
          </VStack>
        </div>

        {/* 콘텐츠 영역 */}
        <VStack $css={{ flex: '1', padding: '$400', gap: '$500' }}>
          {/* 그날의 기억 */}
          <VStack $css={{ gap: '$250' }}>
            <Text as="h2" typography="heading5" $css={{ color: 'var(--vapor-color-gray-900)' }}>
              그날의 기억
            </Text>
            <Card.Root $css={{ borderRadius: '$200', boxShadow: 'none' }}>
              <Card.Body $css={{ padding: '$300' }}>
                <HStack $css={{ gap: '$150', flexWrap: 'wrap' }}>
                  <Text
                    typography="subtitle2"
                    $css={{ color: 'var(--vapor-color-gray-800)', fontWeight: '600' }}
                  >
                    {place.memory.narrator}
                  </Text>
                  <Text typography="subtitle2" $css={{ color: 'var(--vapor-color-gray-400)' }}>
                    |
                  </Text>
                  <Text typography="subtitle2" $css={{ color: 'var(--vapor-color-gray-700)' }}>
                    {place.memory.title}
                  </Text>
                </HStack>
              </Card.Body>
            </Card.Root>
          </VStack>

          {/* 그날의 기록 */}
          <VStack $css={{ gap: '$250' }}>
            <Text as="h2" typography="heading5" $css={{ color: 'var(--vapor-color-gray-900)' }}>
              그날의 기록
            </Text>
            <Card.Root $css={{ borderRadius: '$200', boxShadow: 'none' }}>
              <Card.Body $css={{ padding: '$300' }}>
                <Text
                  typography="body2"
                  $css={{
                    color: 'var(--vapor-color-gray-600)',
                    lineHeight: '1.7',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {place.record}
                </Text>
              </Card.Body>
            </Card.Root>
          </VStack>
        </VStack>

        {/* 하단 버튼 영역 */}
        <VStack $css={{ padding: '$400', paddingTop: '$200', gap: '$200' }}>
          <Button size="lg" colorPalette="primary" variant="fill" $css={{ width: '100%' }}>
            {place.buttonLabel}
          </Button>

          <HStack $css={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Button
              size="sm"
              variant="ghost"
              colorPalette="secondary"
              disabled={currentIndex === 0}
              onClick={onPrev}
            >
              ← 이전
            </Button>
            <Text typography="body3" $css={{ color: 'var(--vapor-color-gray-400)' }}>
              {currentIndex + 1} / {total}
            </Text>
            <Button
              size="sm"
              variant="ghost"
              colorPalette="secondary"
              disabled={currentIndex === total - 1}
              onClick={onNext}
            >
              다음 →
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </div>
  )
}
