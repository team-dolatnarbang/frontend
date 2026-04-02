import { Badge, Button, HStack, Text, VStack } from '@vapor-ui/core'
import { useNavigate, useParams } from 'react-router-dom'
import { places } from '../../data/places'

export default function MapDetailPage() {
  const { siteId } = useParams()
  const navigate = useNavigate()

  const place = places.find((p) => String(p.order) === siteId)
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
          flex: 1,
          backgroundColor: '#D9D9D9',
          flexShrink: 0,
          overflow: 'hidden',
        }}
      ></div>

      <div className="px-5 py-4.5">
        {/* 장소명 + 뱃지 */}
        <HStack
          $css={{
            gap: '$100',
          }}
        >
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
              {place.region}
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
              {place.detailRegion}
            </Badge>
          </HStack>
        </HStack>
      </div>

      {/* 그날의 기억 */}
      <div className="">
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
            <Text typography="subtitle2">{place.contributorLabel}</Text>
            <Text typography="subtitle2">ㅣ</Text>
            <Text typography="subtitle2">{place.title}</Text>
          </HStack>
        </VStack>
      </div>

      {/* 그날의 기록 */}
      <div className="">
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
              {place.acRecord}
            </Text>
          </div>
        </VStack>
      </div>

      {/* 들어보기 버튼 */}
      <div
        className="px-5 py-5.5"
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button
          onClick={() => navigate(`/map/${siteId}/listen`)}
          $css={{
            width: '335px',
            height: 'var(--vapor-size-dimension-500)',
            padding: '0 var(--vapor-size-space-200)',

            justifyContent: 'center',
            alignItems: 'center',
            gap: 'var(--vapor-button-gap)',

            borderRadius: 'var(--vapor-size-borderRadius-300)',
            background: 'var(--vapor-color-hondi-400)',

            boxSizing: 'border-box',

            color: 'white',
          }}
        >
          이야기 듣기
        </Button>
      </div>
    </VStack>
  )
}
