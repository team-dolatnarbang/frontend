import { HStack, Box } from '@vapor-ui/core';

interface StepBarProps {
  total: number;
  current: number;
}

export default function StepBar({ total, current }: StepBarProps) {
  return (
    <HStack $css={{ gap: '$100', width: '100%' }}>
      {Array.from({ length: total }).map((_, i) => (
        <Box
          key={i}
          $css={{
            flex: 1,
            height: '8px',
            borderRadius: '$100',
            background:
              i < current ? 'var(--vapor-color-hondi-200)' : 'var(--vapor-color-gray-200)',
          }}
        />
      ))}
    </HStack>
  );
}
