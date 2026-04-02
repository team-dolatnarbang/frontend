import { useState } from 'react'
import { Box, Button, Text, VStack } from '@vapor-ui/core'
import StepBar from '../../components/StepBar'

interface Props {
  totalSteps: number
  currentStep: number
  defaultValue: string
  onBack: () => void
  onNext: (phone: string) => void
}

export default function SeniorStep2Phone({
  totalSteps,
  currentStep,
  defaultValue,
  onBack,
  onNext,
}: Props) {
  const [phone, setPhone] = useState(defaultValue)

  return (
    <Box
      $css={{
        maxWidth: '480px',
        margin: '0 auto',
        padding: '$400',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <VStack $css={{ gap: '$400', flex: 1 }}>
        <StepBar total={totalSteps} current={currentStep} />

        <VStack $css={{ gap: '$100', flex: 1 }}>
          <Text typography="heading3">
            <Text
              typography="heading3"
              $css={{ color: 'var(--vapor-color-hondi-400)', display: 'inline' }}
            >
              전화 번호
            </Text>
            를<br />
            입력해주세요
          </Text>

          <Box $css={{ marginTop: '81px' }}>
            <input
              type="tel"
              placeholder="010-0000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{
                width: '100%',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '20px 16px',
                fontSize: '18px',
                textAlign: 'center',
                outline: 'none',
                boxSizing: 'border-box',
                backgroundColor: '#f9fafb',
              }}
            />
          </Box>
        </VStack>

        <Button
          size="xl"
          variant="fill"
          $css={{
            width: '100%',
            height: '57px',
            padding: '0 var(--vapor-size-space-200)',

            justifyContent: 'center',
            alignItems: 'center',
            gap: 'var(--vapor-button-gap)',

            borderRadius: 'var(--vapor-size-borderRadius-300)',
            background: 'var(--vapor-color-hondi-400)',

            boxSizing: 'border-box',

            color: 'white',
          }}
          disabled={!phone.trim()}
          onClick={() => onNext(phone.trim())}
        >
          다음
        </Button>
      </VStack>
    </Box>
  )
}
