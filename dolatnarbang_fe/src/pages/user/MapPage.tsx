import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { places } from '../../data/places'

const markerPositions: Record<number, { x: number; y: number }> = {
  1: { x: 37, y: 55 }, // 관덕정
  2: { x: 13, y: 80 }, // 고산 국민학교
  3: { x: 45, y: 58 }, // 주정 공장
  4: { x: 64, y: 55 }, // 너븐 숭이
  5: { x: 52, y: 50 }, // 수악 주둔소
}

export default function MapPage() {
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState('1')

  const selectedPlace = places.find((p) => p.id === selectedId) ?? places[0]

  return (
    <div
      style={{
        height: '100vh',
        background: 'linear-gradient(180deg, #51A9F7 0%, #8DCDFF 100%)',
        position: 'relative',
        overflow: 'hidden',
        maxWidth: '375px',
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px',
          position: 'absolute',
          top: '49px',
          left: 0,
          right: 0,
          zIndex: 2,
        }}
      >
        <img
          src="/images/mainLogo/logo2.svg"
          alt="기억납서"
          style={{
            flexShrink: 0,
          }}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <img
            src="/images/map/Ellipse.png"
            alt="설명"
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              objectFit: 'cover',
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: 'EF_jejudoldam',
              fontWeight: 400,
              fontSize: '15px',
              color: '#FFFFFF',
            }}
          >
            4/{places.length}
          </span>
        </div>
      </div>

      {/* Map area */}
      <div
        style={{
          position: 'absolute',
          top: '161px',
          left: '9px',
          width: '346px',
          height: '345px',
          zIndex: 1,
        }}
      >
        <img
          src="/images/map/map.png"
          alt="제주도 지도"
          style={{
            width: '100%',
            height: '120%',
            objectFit: 'contain',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/map/1')}
        />
        {/* 위치 마커 */}
        {places.map((place) => {
          const pos = markerPositions[place.order]
          const isSelected = place.id === selectedId
          return (
            <button
              key={place.id}
              onClick={() => setSelectedId(place.id)}
              aria-label={place.name}
              style={{
                position: 'absolute',
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: 'translate(-50%, -50%)',
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                backgroundColor: isSelected ? '#FFBF36' : '#CECECE',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                boxShadow: isSelected ? '2px 2px 20px 0px rgba(255, 234, 0, 0.9)' : 'none',
                transition: 'background-color 0.2s, box-shadow 0.2s',
                zIndex: 10,
              }}
            />
          )
        })}
      </div>

      {/* 하단 정보 패널 */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '231px',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px 16px 0 0',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          zIndex: 2,
        }}
      >
        {/* 섹션 제목 */}
        <span
          style={{
            fontFamily: 'Pretendard',
            fontWeight: 700,
            fontSize: '14px',
            lineHeight: 1.286,
            color: '#393939',
          }}
        >
          방문할 장소와 이야기 | 미리보기
        </span>

        {/* 선택된 장소 카드 + 이야기 칩 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {/* 장소 카드 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 8px',
              backgroundColor: '#FFEEE8',
              borderRadius: '8px',
            }}
          >
            {/* 썸네일 */}
            <div
              style={{
                position: 'relative',
                width: '36px',
                height: '36px',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#FFB4A1',
                  overflow: 'hidden',
                }}
              />
              <img
                src={selectedPlace.imageUrl}
                alt={selectedPlace.name}
                style={{
                  position: 'absolute',
                  top: '8px',
                  left: '2px',
                  width: '32px',
                  height: '20px',
                  objectFit: 'cover',
                  borderRadius: '2px',
                }}
              />
            </div>
            {/* 텍스트 */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                flex: 1,
                minWidth: 0,
              }}
            >
              <span
                style={{
                  fontFamily: 'Pretendard',
                  fontWeight: 700,
                  fontSize: '18px',
                  lineHeight: 1.444,
                  color: '#3B3B3B',
                }}
              >
                {selectedPlace.name}
              </span>
              <span
                style={{
                  fontFamily: 'Pretendard',
                  fontWeight: 500,
                  fontSize: '12px',
                  lineHeight: 1.5,
                  color: '#959595',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {selectedPlace.acRecord.replace(/\n/g, ' ').trim()}
              </span>
            </div>
          </div>

          {/* 이야기 칩 (가로 스크롤) */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              scrollbarWidth: 'none',
            }}
          >
            {places.map((place) => {
              const isActive = place.id === selectedId
              return (
                <button
                  key={place.id}
                  onClick={() => {
                    setSelectedId(place.id)
                  }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '6px',
                    borderRadius: '7px',
                    backgroundColor: isActive ? '#FA502D' : '#EFEFEF',
                    border: 'none',
                    cursor: 'pointer',
                    minWidth: '100px',
                    height: '64px',
                    flexShrink: 0,
                    textAlign: 'left',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Pretendard',
                      fontWeight: isActive ? 700 : 600,
                      fontSize: '10px',
                      lineHeight: 1.595,
                      color: isActive ? '#FFFFFF' : '#393939',
                    }}
                  >
                    {place.contributorLabel}
                  </span>
                  <span
                    style={{
                      fontFamily: 'Pretendard',
                      fontWeight: 500,
                      fontSize: '12px',
                      lineHeight: 1.329,
                      color: isActive ? '#FFFFFF' : '#767676',
                    }}
                  >
                    {place.title}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
