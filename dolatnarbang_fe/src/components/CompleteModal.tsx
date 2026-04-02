import { Dialog, Button, Text, VStack } from '@vapor-ui/core'

const ORDINAL = ['첫', '두', '세', '네', '다섯'] as const

interface CompleteModalProps {
  open: boolean
  onClose: () => void
  petalOrder: number // 1~5
  siteName: string
  elderName: string
  storyTitle?: string
  isLast?: boolean
}

export default function CompleteModal({
  open,
  onClose,
  petalOrder,
  siteName,
  elderName,
  isLast = false,
}: CompleteModalProps) {
  const subtitle = [siteName, elderName].filter(Boolean).join(' · ')
  const ordinalLabel = ORDINAL[petalOrder - 1] ?? String(petalOrder)

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose()
      }}
      modal
    >
      <Dialog.Popup
        initialFocus={false}
        $css={{
          display: 'flex',
          width: '255px',
          padding: '$200',
          paddingTop: '20px',
          paddingBottom: '20px',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '$200',
        }}
      >
        <Dialog.Body $css={{ padding: 0 }}>
          <VStack
            $css={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '$200',
              alignSelf: 'stretch',
            }}
          >
            <img
              src={`/images/petal${petalOrder}.png`}
              alt={`꽃잎 ${petalOrder}`}
              style={{ width: '59px', height: '59px', objectFit: 'contain' }}
            />

            <VStack
              $css={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                alignSelf: 'stretch',
              }}
            >
              <Text typography="heading4">{ordinalLabel}번째 꽃잎을 획득했어요</Text>
              <Text typography="body2" foreground="hint-100">
                {subtitle}
              </Text>
            </VStack>
          </VStack>
        </Dialog.Body>

        <Dialog.Footer $css={{ padding: 0 }}>
          <Dialog.Close
            render={
              <Button
                variant="ghost"
                $css={{
                  display: 'flex',
                  height: '29px',
                  padding: '0 var(--vapor-size-space-100)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 'var(--vapor-button-gap)',
                  flexShrink: 0,
                  alignSelf: 'stretch',
                  width: '100%',
                  borderRadius: 'var(--vapor-size-borderRadius-300)',
                  background: isLast
                    ? 'var(--vapor-color-hondi-100)'
                    : 'var(--vapor-color-gray-100)',
                  color: isLast ? 'var(--vapor-color-hondi-400)' : 'var(--vapor-secondary)',
                  fontFamily: 'var(--vapor-typography-fontFamily-sans)',
                  fontSize: 'var(--vapor-typography-fontSize-050)',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: 'var(--vapor-typography-lineHeight-075)',
                  letterSpacing: 'var(--vapor-typography-letterSpacing-100)',
                }}
                onClick={onClose}
              >
                {isLast ? '꽃 완성 보기' : '확인'}
              </Button>
            }
          />
        </Dialog.Footer>
      </Dialog.Popup>
    </Dialog.Root>
  )
}