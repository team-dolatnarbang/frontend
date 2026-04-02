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

const bodyTextStyle: React.CSSProperties = {
  fontFamily: 'Pretendard, sans-serif',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '1.571',
  letterSpacing: '-0.1px',
  color: '#3B3B3B',
  whiteSpace: 'pre-line',
}

export default function MapListenPage() {
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
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#FAFAFA',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
      }}
    >
      {/* 뒤로가기 */}
      <button
        onClick={() => navigate(`/map/${siteId}`)}
        style={{
          position: 'fixed',
          top: '12px',
          left: '12px',
          zIndex: 10,
          background: 'rgba(0,0,0,0.15)',
          border: 'none',
          borderRadius: '50%',
          width: '36px',
          height: '36px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          color: '#000',
        }}
      >
        ←
      </button>

      {/* 장소 뱃지 + 제목 + 부제목 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '8px 20px',
          gap: '8px',
          marginTop: '44px',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '2px 8px',
            backgroundColor: 'rgba(229,0,72,0.1)',
            borderRadius: '100px',
            fontFamily: 'Pretendard, sans-serif',
            fontWeight: 500,
            fontSize: '12px',
            lineHeight: '1.5',
            color: '#E50048',
            alignSelf: 'flex-start',
          }}
        >
          {place.name}
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontWeight: 700,
              fontSize: '24px',
              lineHeight: '1.5',
              letterSpacing: '-0.3px',
              color: '#3B3B3B',
            }}
          >
            {place.memory.title}
          </span>
          <span
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '1.571',
              letterSpacing: '-0.1px',
              color: '#3B3B3B',
            }}
          >
            {place.memory.narrator}의 기억
          </span>
        </div>
      </div>

      {/* 이미지 영역 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          padding: '16px 20px',
          gap: '8px',
          overflowX: 'auto',
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              flexShrink: 0,
              width: '195px',
              height: '214px',
              backgroundColor: '#D9D9D9',
              borderRadius: '4px',
            }}
          />
        ))}
      </div>

      {/* 오디오 플레이어 */}
      <div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 0' }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 0',
          }}
        >
          <span
            style={{
              fontFamily: 'Oxygen, sans-serif',
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '1.5',
              color: '#480000',
            }}
          >
            00:00
          </span>
          <div
            style={{
              width: '259px',
              height: '8px',
              backgroundColor: '#393636',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '20%',
                height: '100%',
                backgroundColor: '#E50048',
                borderRadius: '4px',
              }}
            />
          </div>
          <span
            style={{
              fontFamily: 'Oxygen, sans-serif',
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '1.5',
              color: '#480000',
            }}
          >
            00:00
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            gap: '20px',
            padding: '25px 0',
          }}
        >
          <button
            style={{
              width: '40px',
              height: '40px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
            }}
          >
            ↺
          </button>
          <button
            style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              backgroundColor: '#E50048',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '26px',
            }}
          >
            ▶
          </button>
          <button
            style={{
              width: '40px',
              height: '40px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
            }}
          >
            ↻
          </button>
        </div>
      </div>

      {/* 나레이션 */}
      <div style={{ display: 'flex', flexDirection: 'column', padding: '18px 20px', gap: '8px' }}>
        <span style={sectionTitleStyle}>나레이션</span>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '14px 12px',
            gap: '16px',
            backgroundColor: '#EDEDED',
            borderRadius: '8px',
            minHeight: '210px',
          }}
        >
          <span style={bodyTextStyle}>{place.record}</span>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '2px',
              backgroundColor: '#FFE063',
              borderRadius: '2px',
              alignSelf: 'flex-start',
            }}
          >
            <span
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontWeight: 700,
                fontSize: '16px',
                lineHeight: '1.5',
                letterSpacing: '-0.1px',
                color: '#3B3B3B',
              }}
            >
              {place.memory.title}
            </span>
          </div>
          <span style={bodyTextStyle}>{place.record}</span>
        </div>
      </div>

      {/* 그날의 기록 */}
      <div style={{ display: 'flex', flexDirection: 'column', padding: '18px 20px', gap: '8px' }}>
        <span style={sectionTitleStyle}>그날의 기록</span>
        <div style={{ padding: '14px 12px', backgroundColor: '#EDEDED', borderRadius: '8px' }}>
          <span style={{ ...bodyTextStyle, display: 'block' }}>{place.record}</span>
        </div>
      </div>

      {/* 관련 이미지 둘러보기 */}
      <div style={{ display: 'flex', flexDirection: 'column', padding: '18px 20px', gap: '8px' }}>
        <span style={sectionTitleStyle}>관련 이미지 둘러보기</span>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: '14px 12px',
            gap: '8px',
            backgroundColor: '#EDEDED',
            borderRadius: '8px',
          }}
        >
          {['', '', ''].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'relative',
                width: '98px',
                height: '133px',
                backgroundColor: '#D9D9D9',
                borderRadius: '4px',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  bottom: '6px',
                  left: '6px',
                  fontFamily: 'Pretendard, sans-serif',
                  fontWeight: 500,
                  fontSize: '12px',
                  lineHeight: '1.5',
                  color: '#000000',
                }}
              >
                {i === 0 ? place.name : '??????'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 다음 장소로 버튼 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '14px 20px',
          gap: '8px',
          marginTop: 'auto',
        }}
      >
        <Button
          size="xl"
          colorPalette="secondary"
          variant="fill"
          disabled={isLastPlace}
          onClick={() => nextPlace && navigate(`/map/${nextPlace.id}`)}
          style={{
            width: '100%',
            borderRadius: '8px',
            backgroundColor: '#E1E1E1',
            color: '#262626',
            opacity: isLastPlace ? 0.32 : 1,
          }}
        >
          다음 장소로
        </Button>
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '14px',
            color: '#919191',
            textAlign: 'right',
            alignSelf: 'flex-end',
          }}
        >
          30 초 까지 들어야 활성화 돼요
        </span>
      </div>
    </div>
  )
}
