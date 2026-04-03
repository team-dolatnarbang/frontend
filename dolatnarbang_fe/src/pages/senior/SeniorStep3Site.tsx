import { useState } from 'react';
import { Box, Button, Text, VStack } from '@vapor-ui/core';
import StepBar from '../../components/StepBar';
import { useSites } from '../../hooks/useSites';

interface Props {
  totalSteps: number;
  currentStep: number;
  defaultValue: string;
  onNext: (siteId: string, siteName: string) => void;
}

export default function SeniorStep3Site({ totalSteps, currentStep, defaultValue, onNext }: Props) {
  const [selectedId, setSelectedId] = useState(defaultValue);
  const { data, isLoading, isError } = useSites();
  const sites = data?.sites ?? [];

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
            {isLoading && (
              <Text typography="body1" $css={{ gridColumn: '1 / -1' }}>
                장소 목록을 불러오는 중…
              </Text>
            )}
            {isError && (
              <Text typography="body1" $css={{ gridColumn: '1 / -1', color: '#b91c1c' }}>
                장소 목록을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
              </Text>
            )}
            {!isLoading &&
              !isError &&
              sites.map((site) => {
                const isSelected = selectedId === site.id;
                return (
                  <button
                    key={site.id}
                    type="button"
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
                );
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
          disabled={!selectedId || isLoading || isError || sites.length === 0}
          onClick={() => {
            const site = sites.find((s) => s.id === selectedId);
            if (site) onNext(site.id, site.name);
          }}
        >
          다음
        </Button>
      </VStack>
    </Box>
  );
}
