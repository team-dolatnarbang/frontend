import { useState } from 'react'
import { Box, Button, Text, VStack } from '@vapor-ui/core'
import StepBar from '../../components/StepBar'

interface Site {
  id: string
  name: string
}

const SITES: Site[] = [
  { id: '1', name: '관덕정' },
  { id: '2', name: '주정 공장' },
  { id: '3', name: '너븐 숭이' },
  { id: '4', name: '수악\n주둔소' },
  { id: '5', name: '고산\n국민학교' },
  { id: '6', name: '기타' },
]

interface Props {
  totalSteps: number
  currentStep: number
  defaultValue: string
  onBack: () => void
  onNext: (siteId: string) => void
}

export default function SeniorStep3Site({
  totalSteps,
  currentStep,
  defaultValue,
  onBack,
  onNext,
}: Props) {
  const [selectedId, setSelectedId] = useState(defaultValue)

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

        <VStack $css={{ gap: '$300', flex: 1 }}>
          <Text typography="heading3">
            어느{' '}
            <Text
              typography="heading3"
              $css={{ color: 'var(--vapor-color-hondi-400)', display: 'inline' }}
            >
              장소
            </Text>
            에서의
            <br />
            이야기를 들려주실 건가요?
          </Text>

          {/* 3열 그리드 */}
          <Box
            $css={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '$200',
              marginTop: '81px',
            }}
          >
            {SITES.map((site) => {
              const isSelected = selectedId === site.id
              return (
                <button
                  key={site.id}
                  onClick={() => setSelectedId(site.id)}
                  style={{
                    padding: '20px 8px',
                    borderRadius: '12px',
                    border: '1px solid',
                    borderColor: isSelected ? 'var(--vapor-color-hondi-400)' : '#e5e7eb',
                    backgroundColor: isSelected ? 'var(--vapor-color-hondi-100)' : '#f9fafb',
                    color: 'var(--vapor-color-foreground-normal-200)',
                    cursor: 'pointer',
                    fontSize: '15px',
                    fontWeight: isSelected ? 600 : 400,
                    whiteSpace: 'pre-line',
                    textAlign: 'center',
                    lineHeight: '1.4',
                    height: '126px',
                  }}
                >
                  {site.name}
                </button>
              )
            })}
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
          disabled={!selectedId}
          onClick={() => onNext(selectedId)}
        >
          다음
        </Button>
      </VStack>
    </Box>
  )
}
