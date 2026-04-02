// import { Text, VStack } from '@vapor-ui/core'
// import { useNavigate } from 'react-router-dom'
// import { places } from '../../data/places'

// // 제주도 지도 내 마커 위치 (%) - 실제 지리 좌표 기반 근사값
// const markerPositions: Record<number, { x: number; y: number }> = {
//   1: { x: 52, y: 72 }, // 수악 주둔소 - 서귀포시 중남부
//   2: { x: 13, y: 50 }, // 고산 국민학교 - 제주 서쪽
//   3: { x: 64, y: 22 }, // 너븐 숭이 - 조천읍 북동
//   4: { x: 37, y: 18 }, // 관덕정 - 제주시 중심
//   5: { x: 45, y: 22 }, // 주정 공장 - 제주시 동쪽
// }

// function MapMarker({
//   place,
//   position,
//   onClick,
// }: {
//   place: (typeof places)[0]
//   position: { x: number; y: number }
//   onClick: () => void
// }) {
//   return (

//     <button
//       onClick={onClick}
//       style={{
//         position: 'absolute',
//         left: `${position.x}%`,
//         top: `${position.y}%`,
//         transform: 'translate(-50%, -100%)',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         gap: '2px',
//         background: 'none',
//         border: 'none',
//         cursor: 'pointer',
//         zIndex: 10,
//       }}
//     >
//       {/* 핀 */}
//       <div
//         style={{
//           width: '28px',
//           height: '28px',
//           backgroundColor: '#E50049',
//           borderRadius: '50% 50% 50% 0',
//           transform: 'rotate(-45deg)',
//           boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}
//       >
//         <div
//           style={{
//             width: '10px',
//             height: '10px',
//             backgroundColor: 'white',
//             borderRadius: '50%',
//             transform: 'rotate(45deg)',
//           }}
//         />
//       </div>
//       {/* 라벨 */}
//       <div
//         style={{
//           backgroundColor: 'white',
//           borderRadius: '6px',
//           padding: '2px 6px',
//           boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
//           whiteSpace: 'nowrap',
//           fontSize: '11px',
//           fontWeight: '600',
//           color: '#1a1a1a',
//           marginTop: '2px',
//         }}
//       >
//         {place.name}
//       </div>
//     </button>
//   )
// }

export default function MapPage() {
  // const navigate = useNavigate()

  return (
    <div
      style={{
        height: '100vh',
        background: 'var(--vapor-color-blue-200)',

      }}
    >

<div
  style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  }}
>
  <img
    src="/images/mainLogo/logo.svg"
    alt="logo"
    style={{
      width: '140px',
      height: '140px',
      objectFit: 'contain',
    }}
  />

<img
  src="/images/map/map.svg"
  alt="map"
  style={{
    width: '351.667px',
    height: '211.403px',
    objectFit: 'contain',
  }}
/>
</div>
    </div>
  )
}
