import { useState } from 'react';
import { Box, Button, Checkbox, HStack, Text, VStack } from '@vapor-ui/core';
import StepBar from '../../components/StepBar';

interface ConsentItem {
  id: string;
  label: string;
  description: string;
  required: boolean;
}

const CONSENTS: ConsentItem[] = [
  {
    id: 'privacy',
    label: '개인정보 수집 및 이용 동의',
    description: '이름과 목소리 데이터를 앱 운영에 사용합니다',
    required: true,
  },
  {
    id: 'voice',
    label: '음성 콘텐츠 제작 및 활용 동의',
    description: '녹음된 목소리를 재구성하여 콘텐츠에 사용합니다',
    required: true,
  },
  {
    id: 'marketing',
    label: '홍보 및 마케팅 활용 동의',
    description: '데이터를 통해 추가 콘텐츠를 제작하는데 사용합니다',
    required: false,
  },
];

interface Props {
  totalSteps: number;
  currentStep: number;
  onBack: () => void;
  onComplete: () => void;
}

export default function SeniorStep4Consent({ totalSteps, currentStep, onBack, onComplete }: Props) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const allChecked = CONSENTS.every((c) => checked[c.id]);
  const someChecked = CONSENTS.some((c) => checked[c.id]);
  const requiredChecked = CONSENTS.filter((c) => c.required).every((c) => checked[c.id]);

  const toggleAll = () => {
    if (allChecked) {
      setChecked({});
    } else {
      setChecked(Object.fromEntries(CONSENTS.map((c) => [c.id, true])));
    }
  };

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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

        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            alignSelf: 'flex-start',
          }}
        />

        <VStack $css={{ gap: '$300', flex: 1 }}>
          <VStack $css={{ gap: '$100' }}>
            <Text typography="heading3">목소리 활용 동의</Text>
            <Text typography="body2" foreground="hint-100">
              기억남서 서비스를 이용하기 위하여
              <br />
              약관 동의가 필요합니다
            </Text>
          </VStack>

          <VStack $css={{ gap: '$200', marginTop: '$200' }}>
            {/* 모두 동의 */}
            <Text
              render={<label />}
              typography="body1"
              $css={{
                display: 'flex',
                alignItems: 'center',
                gap: '$150',
                padding: '$300',
                borderRadius: '$300',
                border: '1px solid var(--vapor-color-border-normal)',
                backgroundColor: 'var(--vapor-color-background-normal)',
                cursor: 'pointer',
              }}
            >
              <Checkbox.Root
                size="lg"
                checked={allChecked}
                indeterminate={!allChecked && someChecked}
                onCheckedChange={toggleAll}
              />
              모두 동의합니다
            </Text>

            {/* 개별 항목 */}
            {CONSENTS.map((item) => (
              <Text
                key={item.id}
                render={<label />}
                typography="body2"
                $css={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '$150',
                  padding: '$100 $200',
                  cursor: 'pointer',
                }}
              >
                <Checkbox.Root
                  size="lg"
                  checked={!!checked[item.id]}
                  onCheckedChange={() => toggle(item.id)}
                  $css={{ marginTop: '2px', flexShrink: 0 }}
                />
                <VStack $css={{ gap: '2px' }}>
                  <HStack $css={{ gap: '$050', alignItems: 'center' }}>
                    <Text typography="body2">{item.label}</Text>
                    {item.required && (
                      <Text typography="body2" $css={{ color: 'var(--vapor-color-hondi-400)' }}>
                        (필수)
                      </Text>
                    )}
                  </HStack>
                  <Text typography="body3" foreground="hint-100">
                    {item.description}
                  </Text>
                </VStack>
              </Text>
            ))}
          </VStack>
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
          disabled={!requiredChecked}
          onClick={onComplete}
        >
          완료
        </Button>
      </VStack>
    </Box>
  );
}
