import { useNavigate } from 'react-router-dom'
import { Button } from '@vapor-ui/core'

export default function RootPage() {
  const navigate = useNavigate()

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#FAFAFA',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '375px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        {/* 로고 / 서비스명 플레이스홀더 */}
        <div
          style={{
            width: '120px',
            height: '120px',
            backgroundColor: '#D9D9D9',
            borderRadius: '24px',
          }}
        />
        <span
          style={{
            fontFamily: 'Pretendard, sans-serif',
            fontWeight: 700,
            fontSize: '28px',
            color: '#000000',
          }}
        >
          (서비스명)
        </span>
        <Button
          size="xl"
          colorPalette="primary"
          variant="fill"
          onClick={() => navigate('/onboarding')}
          style={{ width: '100%', borderRadius: '8px', backgroundColor: '#E50049' }}
        >
          시작하기
        </Button>
      </div>
    </div>
  )
}
