import { Button, Text, VStack } from '@vapor-ui/core'
import { useNavigationStore } from '../stores/navigationStore'

export default function OnboardingPage() {
  const goTo = useNavigationStore((s) => s.goTo)

  return (
    <div className="min-h-screen flex justify-center" style={{ backgroundColor: '#FAFAFA' }}>
      <VStack
        $css={{
          width: '100%',
          maxWidth: { sm: '448px', md: '576px', lg: '672px' },
          minHeight: '100vh',
          padding: '$400',
          paddingTop: '$700',
        }}
      >
        {/* 서비스 소개 */}
        <VStack $css={{ alignItems: 'center', gap: '$300' }}>
          <Text
            typography="heading3"
            $css={{ color: 'var(--vapor-color-gray-900)', textAlign: 'center' }}
          >
            서비스명은
          </Text>
          <Text
            typography="heading4"
            $css={{ color: 'var(--vapor-color-gray-800)', textAlign: 'center', lineHeight: '1.6' }}
          >
            제주 4.3 사건의 피해자들을 기억하고{'\n'}추모하는 아카이브 공간입니다
          </Text>
        </VStack>

        {/* 이미지 플레이스홀더 */}
        <div
          style={{
            marginTop: '2rem',
            width: '100%',
            aspectRatio: '4/3',
            maxHeight: '220px',
            backgroundColor: '#D9D9D9',
            borderRadius: '12px',
          }}
        />

        {/* 안내 문구 */}
        <Text
          typography="subtitle1"
          $css={{
            color: 'var(--vapor-color-gray-600)',
            textAlign: 'center',
            marginTop: '$500',
            lineHeight: '1.7',
          }}
        >
          꽃은 건너뛰면 피지 않습니다{'\n'}다 듣지 못했다면 언제든 이어서 들을 수 있습니다.
        </Text>

        {/* CTA 버튼 */}
        <div style={{ marginTop: 'auto', paddingTop: '2rem', paddingBottom: '2rem' }}>
          <Button
            size="xl"
            colorPalette="primary"
            variant="fill"
            $css={{ width: '100%' }}
            onClick={() => goTo('map')}
          >
            시작하기
          </Button>
        </div>
      </VStack>
    </div>
  )
}
