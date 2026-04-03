import { useState } from 'react';
import { Box, Button, Text, VStack } from '@vapor-ui/core';
import StepBar from '../../components/StepBar';

interface Props {
  totalSteps: number;
  currentStep: number;
  defaultValue: string;
  onNext: (name: string) => void;
}

export default function SeniorStep1Name({ totalSteps, currentStep, defaultValue, onNext }: Props) {
  const [name, setName] = useState(defaultValue);

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
            안녕하세요
            <br />
            <Text
              typography="heading3"
              $css={{ color: 'var(--vapor-color-hondi-400)', display: 'inline' }}
            >
              이름
            </Text>
            이 어떻게 되시나요?
          </Text>

          <Box $css={{ marginTop: '81px' }}>
            <input
              type="text"
              placeholder="성함을 입력해 주세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
          colorPalette="warning"
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
          disabled={!name.trim()}
          onClick={() => onNext(name.trim())}
        >
          다음
        </Button>
      </VStack>
    </Box>
  );
}
