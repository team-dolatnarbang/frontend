import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function RootPage() {
  const navigate = useNavigate()

  // 2초 후 자동 이동
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigate('/onboarding')
  //   }, 2000)

  //   return () => clearTimeout(timer)
  // }, [navigate])

  return (
    <div
      style={{
        height: '100vh',
        backgroundImage: 'url(/images/mainBackground.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',

        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
        // justifyContent: 'center',
      }}
    >
      {/* 로고 영역 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '180px',
          transform: 'translateY(-60px)',
        }}
      >
        <img
          src="/images/subLogo.png"
          alt="sub logo"
          style={{
            width: '50px',
            height: '50px',
            objectFit: 'contain',
          }}
        />
        <img
          src="/images/mainLogo.svg"
          alt="logo"
          style={{
            width: '240px',
            height: '100px',
            objectFit: 'contain',
          }}
        />
      </div>
    </div>
  )
}
