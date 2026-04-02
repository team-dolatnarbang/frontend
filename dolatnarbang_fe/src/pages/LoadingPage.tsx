import { useEffect } from 'react'
import { Text, VStack } from '@vapor-ui/core'
import { useNavigationStore } from '../stores/navigationStore'

export default function LoadingPage() {
  const goTo = useNavigationStore((s) => s.goTo)

  useEffect(() => {
    const timer = setTimeout(() => goTo('onboarding'), 2000)
    return () => clearTimeout(timer)
  }, [goTo])

  return (
    <div className="min-h-screen flex justify-center" style={{ backgroundColor: '#D0E3FF' }}>
      <VStack
        $css={{
          width: '100%',
          maxWidth: { sm: '448px', md: '576px', lg: '672px' },
          minHeight: '100vh',
          justifyContent: 'space-between',
          padding: '$400',
        }}
      >
        {/* 중앙 서비스명 */}
        <VStack $css={{ flex: '1', justifyContent: 'center', alignItems: 'center' }}>
          <Text
            // as="h1"
            typography="display3"
            $css={{ color: 'var(--vapor-color-gray-900)', textAlign: 'center' }}
          >
            서비스명
          </Text>
        </VStack>

        {/* 하단 누적 기부 현황 */}
        <Text
          typography="heading5"
          $css={{
            color: 'var(--vapor-color-gray-800)',
            textAlign: 'center',
            paddingBottom: '$600',
          }}
        >
          지금까지 기부된 꽃 수 10,235원
        </Text>
      </VStack>
    </div>
  )
}
