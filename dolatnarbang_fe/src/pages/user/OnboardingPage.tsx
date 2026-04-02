import { useState } from 'react'
import { Box, Button, Text } from '@vapor-ui/core'
import { useNavigate } from 'react-router-dom'

export default function OnboardingPage() {
  const navigate = useNavigate()

  const slides = [
    {
      title: '제주 어르신이 \n직접 들려주는 이야기',
      desc: '교과서가 아닌, 그날을 살아낸 분들의 \n목소리로 듣는 제주 4.3사건은 어떨까요?',
    },
    {
      title: '이야기를 들을수록 \n꽃 한 송이가 피어나요',
      desc: `어르신들의 이야기를 들으며\n제주 4.3 사건의 대해 배워보세요\n동백꽃 한 송이가 완성되면 기업납서가 기부해드려요`,
    },
  ]

  const [current, setCurrent] = useState(0)

  let startX = 0

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 375,
        margin: '0 auto',
        minHeight: '100vh',
        backgroundColor: '#FAFAFA',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 상단 이미지 */}
      <div style={{ width: '100%', height: 421, overflow: 'hidden' }}>
        <img
          src="/images/onboarding_illustration.png"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* 슬라이드 영역 */}
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
        }}
        onTouchStart={(e) => (startX! = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const diff = startX - e.changedTouches[0].clientX

          if (diff > 50 && current < slides.length - 1) {
            setCurrent(current + 1)
          }
          if (diff < -50 && current > 0) {
            setCurrent(current - 1)
          }
        }}
      >
        <div
          style={{
            display: 'flex',
            width: `${slides.length * 100}%`,
            transform: `translateX(-${current * (100 / slides.length)}%)`,
            transition: 'transform 0.3s ease',
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              style={{
                width: `${100 / slides.length}%`,
                padding: '24px 20px 12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                flexShrink: 0,
              }}
            >
              <Text
                $css={{
                  fontWeight: 700,
                  fontSize: '24px',
                  lineHeight: '1.5',
                  letterSpacing: '-0.3px',
                  color: '#262626',
                  textAlign: 'center',
                  whiteSpace: 'pre-line',
                }}
              >
                {slide.title}
              </Text>

              <Text
                $css={{
                  fontWeight: 500,
                  fontSize: '16px',
                  lineHeight: '1.5',
                  letterSpacing: '-0.1px',
                  color: '#959595',
                  textAlign: 'center',
                  whiteSpace: 'pre-line',
                }}
              >
                {slide.desc}
              </Text>
            </div>
          ))}
        </div>
      </div>

      {/* 도트 */}
      <div
        style={{
          padding: '12px',
          display: 'flex',
          justifyContent: 'center',
          gap: '6px',
        }}
      >
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: current === i ? '16px' : '6px',
              height: '6px',
              borderRadius: '999px',
              background: current === i ? '#000' : '#D9D9D9',
              transition: '0.3s',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>

{/* CTA 영역 */}
<Box
  $css={{
    display: 'flex',
    width: '100%',
    maxWidth: '375px', // 반응형 대응

    height: '151px',
    padding: '16px 20px',

    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',

    flexShrink: 0,
  }}
>
  <Button
    size="xl"
    onClick={() => navigate('/map')}
    $css={{
      width: '100%',

      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 'var(--vapor-button-gap)',

      borderRadius: 'var(--vapor-size-borderRadius-300)',
      background: 'var(--vapor-color-hondi-400)',

      color: 'white',
    }}
  >
    시작하기
  </Button>
</Box>
    </div>
  )
}