import { Badge, HStack, Text, VStack } from '@vapor-ui/core'
import { places } from '../data/places'
import { useNavigationStore } from '../stores/navigationStore'

// 제주도 지도 내 마커 위치 (%) - 실제 지리 좌표 기반 근사값
const markerPositions: Record<number, { x: number; y: number }> = {
  1: { x: 52, y: 72 }, // 수악 주둔소 - 서귀포시 중남부
  2: { x: 13, y: 50 }, // 고산 국민학교 - 제주 서쪽
  3: { x: 64, y: 22 }, // 너븐 숭이 - 조천읍 북동
  4: { x: 37, y: 18 }, // 관덕정 - 제주시 중심
  5: { x: 45, y: 22 }, // 주정 공장 - 제주시 동쪽
}

function MapMarker({
  place,
  position,
  onClick,
}: {
  place: (typeof places)[0]
  position: { x: number; y: number }
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'absolute',
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        zIndex: 10,
      }}
    >
      {/* 핀 */}
      <div
        style={{
          width: '28px',
          height: '28px',
          backgroundColor: '#E50049',
          borderRadius: '50% 50% 50% 0',
          transform: 'rotate(-45deg)',
          boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '10px',
            height: '10px',
            backgroundColor: 'white',
            borderRadius: '50%',
            transform: 'rotate(45deg)',
          }}
        />
      </div>
      {/* 라벨 */}
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '6px',
          padding: '2px 6px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
          whiteSpace: 'nowrap',
          fontSize: '11px',
          fontWeight: '600',
          color: '#1a1a1a',
          marginTop: '2px',
        }}
      >
        {place.name}
      </div>
    </button>
  )
}

export default function MapPage() {
  const goTo = useNavigationStore((s) => s.goTo)

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
        {/* 헤더 */}
        <VStack
          $css={{
            padding: '$400',
            paddingBottom: '$300',
            gap: '$100',
            borderBottom: '1px solid var(--vapor-color-gray-200)',
          }}
        >
          <Text typography="heading4" $css={{ color: 'var(--vapor-color-gray-900)' }}>
            제주 4.3 유적지
          </Text>
          <Text typography="body2" $css={{ color: 'var(--vapor-color-gray-500)' }}>
            마커를 눌러 이야기를 들어보세요
          </Text>
        </VStack>

        {/* 지도 영역 */}
        <div style={{ padding: '1.5rem', flex: 1 }}>
          {/* 제주도 지도 컨테이너 */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '5/3',
              backgroundColor: '#C8E6F5',
              borderRadius: '16px',
              overflow: 'visible',
            }}
          >
            {/* 제주도 섬 형태 */}
            <div
              style={{
                position: 'absolute',
                top: '10%',
                left: '5%',
                width: '90%',
                height: '80%',
                backgroundColor: '#7CB87C',
                borderRadius: '45% 45% 42% 42% / 50% 50% 45% 45%',
                boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)',
              }}
            />

            {/* 마커들 */}
            {places.map((place) => {
              const pos = markerPositions[place.id]
              if (!pos) return null
              // 섬 영역 내부로 좌표 보정 (섬이 전체 컨테이너의 5%~95%, 10%~90% 범위)
              const adjustedX = 5 + pos.x * 0.9
              const adjustedY = 10 + pos.y * 0.8
              return (
                <MapMarker
                  key={place.id}
                  place={place}
                  position={{ x: adjustedX, y: adjustedY }}
                  onClick={() => goTo('detail', place.id)}
                />
              )
            })}
          </div>

          {/* 장소 목록 */}
          <VStack $css={{ marginTop: '$400', gap: '$200' }}>
            <Text
              typography="subtitle1"
              $css={{ color: 'var(--vapor-color-gray-700)', fontWeight: '600' }}
            >
              유적지 목록
            </Text>
            {places.map((place) => (
              <button
                key={place.id}
                onClick={() => goTo('detail', place.id)}
                style={{
                  width: '100%',
                  background: 'white',
                  border: '1px solid var(--vapor-color-gray-200)',
                  borderRadius: '10px',
                  padding: '0.75rem 1rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'box-shadow 0.15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <HStack $css={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  <VStack $css={{ gap: '$075', alignItems: 'flex-start' }}>
                    <Text
                      typography="subtitle1"
                      $css={{ color: 'var(--vapor-color-gray-900)', fontWeight: '600' }}
                    >
                      {place.name}
                    </Text>
                    <HStack $css={{ gap: '$100' }}>
                      <Badge colorPalette={place.locationColor} shape="pill" size="sm">
                        {place.location}
                      </Badge>
                      <Badge colorPalette={place.categoryColor} shape="pill" size="sm">
                        {place.category}
                      </Badge>
                    </HStack>
                  </VStack>
                  <Text typography="body2" $css={{ color: 'var(--vapor-color-gray-400)' }}>
                    →
                  </Text>
                </HStack>
              </button>
            ))}
          </VStack>
        </div>
      </VStack>
    </div>
  )
}
