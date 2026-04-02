import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function RootPage() {
  const navigate = useNavigate()

  // 2초 후 자동 이동
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding')
    }, 2000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div
      style={{
        height: '100vh',
        background: 'var(--vapor-color-blue-200)',

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 로고 영역 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',

          transform: 'translateY(-60px)',
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
      </div>
    </div>
  )
}