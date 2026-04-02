import { Badge, Button, HStack, Text, VStack } from '@vapor-ui/core'
import { useNavigate, useParams } from 'react-router-dom'
import { places } from '../../data/places'

export default function MapDetailPageEnd() {
  const { siteId } = useParams()
  const navigate = useNavigate()

  const place = places.find((p) => String(p.id) === siteId)
  if (!place) {
    navigate('/map', { replace: true })
    return null
  }

  const currentIndex = places.findIndex((p) => String(p.id) === siteId)
  const isLastPlace = currentIndex === places.length - 1
  const nextPlace = places[currentIndex + 1]

  return (
    <VStack style={{ minHeight: '100vh', backgroundColor: '#FAFAFA' }}>
      {/* 지도 영역 (완료 오버레이 포함) */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          flex: 1,
          backgroundColor: '#D9D9D9',
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        {/* 블러 + 다크 오버레이 */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
          }}
        >
          {/* 완료 아이콘 */}
          <div
            style={{
              width: '89px',
              height: '89px',
              backgroundColor: '#FA502D',
              flexShrink: 0,
            }}
          />
          {/* 완료 텍스트 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Text
              typography="heading2"
              $css={{ color: '#FFFFFF', textAlign: 'center', letterSpacing: '-0.4px' }}
            >
              {place.name} 이야기 완료
            </Text>
            <Text
              typography="heading5"
              $css={{ color: '#FFFFFF', textAlign: 'center' }}
            >
              {place.memory.narrator}의 첫 번째 꽃잎을 얻었어요
            </Text>
          </div>
        </div>
      </div>

      {/* 장소명 + 뱃지 */}
      <div className="px-5 py-4.5">
        <HStack $css={{ gap: '$100' }}>
          <Text typography="heading3">{place.name}</Text>
          <HStack $css={{ alignItems: 'center', gap: '$100' }}>
            <Badge
              size="md"
              $css={{
                display: 'flex',
                width: '57px',
                padding: '2px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '100px',
                border: '1px solid var(--vapor-color-hondi-400)',
                background: 'var(--vapor-color-hondi-050)',
                color: 'var(--vapor-color-hondi-400)',
              }}
            >
              {place.location}
            </Badge>
            <Badge
              shape="pill"
              size="md"
              $css={{
                display: 'flex',
                minWidth: '57px',
                padding: '2px 8px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid var(--vapor-color-green-400)',
                background: 'var(--vapor-color-green-050)',
                color: 'var(--vapor-color-green-400)',
              }}
            >
              {place.category}
            </Badge>
          </HStack>
        </HStack>
      </div>

      {/* 그날의 이야기 */}
      <div>
        <VStack
          $css={{
            paddingTop: '$100',
            paddingBottom: '$100',
            paddingLeft: '$250',
            paddingRight: '$250',
            gap: '$100',
            alignItems: 'stretch',
          }}
        >
          <Text typography="subtitle1" $css={{ fontWeight: '700' }}>
            그날의 이야기
          </Text>
          <HStack
            style={{ padding: '12px', gap: '3px', backgroundColor: '#EDEDED', borderRadius: '8px' }}
          >
            <Text typography="subtitle2">{place.memory.narrator}</Text>
            <Text typography="subtitle2">ㅣ</Text>
            <Text typography="subtitle2">{place.memory.title}</Text>
          </HStack>
        </VStack>
      </div>

      {/* 사건 기록 */}
      <div>
        <VStack
          $css={{
            paddingTop: '$100',
            paddingBottom: '$100',
            paddingLeft: '$250',
            paddingRight: '$250',
            gap: '$100',
            alignItems: 'stretch',
          }}
        >
          <Text typography="subtitle1" $css={{ fontWeight: '700' }}>
            사건 기록
          </Text>
          <div style={{ padding: '14px 12px', backgroundColor: '#EDEDED', borderRadius: '8px' }}>
            <Text typography="subtitle2" $css={{ whiteSpace: 'pre-line' }}>
              {place.record}
            </Text>
          </div>
        </VStack>
      </div>

      {/* 하단 버튼 영역: 다시 듣기 + 다른 이야기 듣기 */}
      <div
        style={{
          padding: '24px 20px',
          display: 'flex',
          flexDirection: 'row',
          gap: '8px',
          alignItems: 'center',
        }}
      >
<Button
  onClick={() => navigate(`/map/${siteId}`)}
  $css={{
    display: 'flex',
    flex: '1 0 0', 
    height: 'var(--vapor-size-dimension-500)',
    padding: '0 var(--vapor-size-space-200)',

    justifyContent: 'center',
    alignItems: 'center',
    gap: 'var(--vapor-button-gap)',

    borderRadius: 'var(--vapor-size-borderRadius-300)',
    background: 'var(--vapor-color-gray-200)',

    color: 'var(--vapor-color-gray-700)', 
    fontSize: '14px',
    fontWeight: '500',
  }}
>
  다시 듣기
</Button>

<Button
  disabled={isLastPlace}
  onClick={() => nextPlace && navigate(`/map/${nextPlace.id}`)}
  $css={{
    display: 'flex',
    width: '227px',
    height: 'var(--vapor-size-dimension-500)',
    padding: '0 var(--vapor-size-space-200)',

    justifyContent: 'center',
    alignItems: 'center',
    gap: 'var(--vapor-button-gap)',

    flexShrink: 0,

    borderRadius: 'var(--vapor-size-borderRadius-300)',
    background: 'var(--vapor-color-gray-700)',
    color: 'var(--vapor-color-white)',

    fontSize: '14px',
    fontWeight: '500',

    opacity: isLastPlace ? 0.32 : 1,
  }}
>
  다른 이야기 듣기
</Button>
      </div>
    </VStack>
  )
}
