import { Button } from '@vapor-ui/core'
import { useNavigate, useParams } from 'react-router-dom'
import { places } from '../../data/places'

const sectionTitleStyle: React.CSSProperties = {
  fontFamily: 'Pretendard, sans-serif',
  fontWeight: 700,
  fontSize: '14px',
  lineHeight: '1.286',
  color: '#000000',
}

const cardTextStyle: React.CSSProperties = {
  fontFamily: 'Pretendard, sans-serif',
  fontWeight: 500,
  fontSize: '12px',
  lineHeight: '1.5',
  color: '#3B3B3B',
}

const badgeBaseStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '2px 8px',
  borderRadius: '100px',
  fontFamily: 'Pretendard, sans-serif',
  fontWeight: 500,
  fontSize: '12px',
  lineHeight: '1.5',
  whiteSpace: 'nowrap',
}

export default function MapDetailPage() {
  const { siteId } = useParams()
  const navigate = useNavigate()

  const place = places.find((p) => String(p.id) === siteId)
  if (!place) {
    navigate('/map', { replace: true })
    return null
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#FAFAFA',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 지도 영역 */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '458px',
          backgroundColor: '#D9D9D9',
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '157px',
            top: '281px',
            width: '62px',
            height: '62px',
            borderRadius: '50%',
            backgroundColor: '#FF6363',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '336px',
            top: '414px',
            width: '62px',
            height: '62px',
            borderRadius: '50%',
            backgroundColor: '#AD0000',
          }}
        />
      </div>

      {/* 장소명 + 뱃지 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 20px',
          gap: '8px',
        }}
      >
        <span
          style={{
            fontFamily: 'Pretendard, sans-serif',
            fontWeight: 700,
            fontSize: '24px',
            lineHeight: '1.5',
            letterSpacing: '-0.3px',
            color: '#000000',
            flexShrink: 0,
          }}
        >
          {place.name}
        </span>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
          <span
            style={{ ...badgeBaseStyle, backgroundColor: 'rgba(229,0,72,0.1)', color: '#E50048' }}
          >
            {place.location}
          </span>
          <span
            style={{ ...badgeBaseStyle, backgroundColor: 'rgba(84,0,229,0.1)', color: '#5400E5' }}
          >
            {place.category}
          </span>
        </div>
      </div>

      {/* 그날의 기억 */}
      <div style={{ display: 'flex', flexDirection: 'column', padding: '8px 20px', gap: '8px' }}>
        <span style={sectionTitleStyle}>그날의 기억</span>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '12px',
            gap: '3px',
            backgroundColor: '#EDEDED',
            borderRadius: '8px',
          }}
        >
          <span style={cardTextStyle}>{place.memory.narrator}</span>
          <span style={cardTextStyle}>ㅣ</span>
          <span style={cardTextStyle}>{place.memory.title}</span>
        </div>
      </div>

      {/* 그날의 기록 */}
      <div style={{ display: 'flex', flexDirection: 'column', padding: '8px 20px', gap: '8px' }}>
        <span style={sectionTitleStyle}>그날의 기록</span>
        <div style={{ padding: '14px 12px', backgroundColor: '#EDEDED', borderRadius: '8px' }}>
          <span style={{ ...cardTextStyle, whiteSpace: 'pre-line', display: 'block' }}>
            {place.record}
          </span>
        </div>
      </div>

      {/* 들어보기 버튼 */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '12px 20px' }}>
        <Button
          size="md"
          colorPalette="primary"
          variant="fill"
          onClick={() => navigate(`/map/${siteId}/listen`)}
          style={{ width: '88px', height: '40px', backgroundColor: '#E50049', borderRadius: '8px' }}
        >
          {place.buttonLabel}
        </Button>
      </div>
    </div>
  )
}
