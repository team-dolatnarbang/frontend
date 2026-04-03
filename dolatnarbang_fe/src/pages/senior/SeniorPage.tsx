import { Button } from '@vapor-ui/core'
import { useNavigate } from 'react-router-dom'

export default function SeniorPage() {
  const navigate = useNavigate()

  return (
    <div
      style={{
        height: '100vh',
        backgroundImage: 'url(/images/mainBackground.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
      <Button
        size="xl"
        onClick={() => navigate('/senior/register')}
        $css={{
          width: '335px',

          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 'var(--vapor-button-gap)',

          borderRadius: 'var(--vapor-size-borderRadius-300)',
          background: 'var(--vapor-color-hondi-400)',

          color: 'white',
          marginTop: '367px',
        }}
      >
        시작하기
      </Button>
    </div>
  )
}
