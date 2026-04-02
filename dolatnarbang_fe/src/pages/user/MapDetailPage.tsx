import { Badge, Button, HStack, Text, VStack } from '@vapor-ui/core'
import { useNavigate, useParams } from 'react-router-dom'
import { places } from '../../data/places'

export default function MapDetailPage() {
  const { siteId } = useParams()
  const navigate = useNavigate()

  const place = places.find((p) => String(p.id) === siteId)
  if (!place) {
    navigate('/map', { replace: true })
    return null
  }

  return (
    <VStack style={{ minHeight: '100vh', backgroundColor: '#FAFAFA' }}>
      {/* 지도 영역 */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '454px',
          backgroundColor: '#D9D9D9',
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
      </div>

      <div className="px-5 py-2.5">
        {/* 장소명 + 뱃지 */}
        <HStack
          $css={{
            gap: '$100',
          }}
        >
          <Text typography="heading3">{place.name}</Text>
          <HStack $css={{ alignItems: 'center', gap: '$100' }}>
            <Badge className="px-3 py-2" colorPalette="danger" shape="pill" size="lg">
              {place.location}
            </Badge>
            <Badge className="px-3 py-2" colorPalette="hint" shape="pill" size="lg">
              {place.category}
            </Badge>
          </HStack>
        </HStack>
      </div>
      {/* 그날의 기억 */}
      <div className="px-5 py-2.5">
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
            그날의 기억
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
      {/* 그날의 기록 */}
      <div className="px-5 py-2.5">
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
            그날의 기록
          </Text>
          <div style={{ padding: '14px 12px', backgroundColor: '#EDEDED', borderRadius: '8px' }}>
            <Text typography="subtitle2" $css={{ whiteSpace: 'pre-line' }}>
              {place.record}
            </Text>
          </div>
        </VStack>
      </div>
      {/* 들어보기 버튼 */}
      <div className="px-5">
        <HStack
          $css={{
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            size="md"
            colorPalette="primary"
            onClick={() => navigate(`/map/${siteId}/listen`)}
          >
            {place.buttonLabel}
          </Button>
        </HStack>
      </div>
      
    </VStack>
  )
}
