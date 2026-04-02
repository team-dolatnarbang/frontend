import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import { Box, Button, Text, TextInput, Textarea, VStack, HStack } from '@vapor-ui/core'
import type { CreateTributeResponse } from '../../types/tribute'
import { createTribute } from '../../api/user'

export default function TributePage() {
  const [nickname, setNickname] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<CreateTributeResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!nickname.trim()) {
      setError('닉네임을 입력해주세요.')
      return
    }
    if (!message.trim()) {
      setError('내용을 입력해주세요.')
      return
    }

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const data = await createTribute({
        nickname: nickname.trim(),
        message: message.trim(),
        idempotencyKey: uuidv4(),
      })
      setResult(data)
      setNickname('')
      setMessage('')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 403) {
          setError('아직 모든 핑을 완료하지 않았습니다. 핑을 완료한 후 다시 시도해주세요.')
        } else {
          setError(err.response?.data?.message ?? '오류가 발생했습니다. 다시 시도해주세요.')
        }
      } else {
        setError('오류가 발생했습니다. 다시 시도해주세요.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box $css={{ maxWidth: '360px', margin: '0 auto', padding: '$400' }}>
      <VStack $css={{ gap: '$400', alignItems: 'center' }}>
        <Text typography="heading5" $css={{ textAlign: 'center' }}>
          꽃 하나당 5 원의 기부금은 4.3 사건의 유가족을 위해 사용될 예정입니다.
        </Text>

        <Box
          $css={{
            width: '100%',
            border: '1px solid var(--vapor-color-border-normal)',
            borderRadius: '$200',
            padding: '$300',
          }}
        >
          <VStack $css={{ gap: '$200' }}>
            <Text typography="body2">내기억남기기</Text>

            <HStack $css={{ gap: '$150', alignItems: 'center' }}>
              <Text typography="body3" $css={{ minWidth: '48px' }}>
                닉네임
              </Text>
              <TextInput
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                disabled={isLoading}
              />
            </HStack>

            <HStack $css={{ gap: '$150', alignItems: 'flex-start' }}>
              <Text typography="body3" $css={{ minWidth: '48px', paddingTop: '$100' }}>
                내용
              </Text>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isLoading}
                $css={{ minHeight: '100px', flex: 1 }}
              />
            </HStack>

            {error && (
              <Text typography="body3" foreground="danger-100">
                {error}
              </Text>
            )}

            {result && (
              <Box
                $css={{
                  padding: '$200',
                  background: 'var(--vapor-color-background-success)',
                  borderRadius: '$200',
                }}
              >
                <VStack $css={{ gap: '$050' }}>
                  <Text typography="body3" foreground="success-200">
                    헌화가 완료되었습니다 🌺
                  </Text>
                  <Text typography="body4" foreground="hint-100">
                    꽃잎 {result.camelliaCount}개 · 적립금{' '}
                    {result.pledgedAmountWon.toLocaleString()}원
                  </Text>
                </VStack>
              </Box>
            )}
          </VStack>
        </Box>

        <Box $css={{ alignSelf: 'flex-end' }}>
          <Button colorPalette="warning" variant="fill" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? '저장 중...' : '기록'}
          </Button>
        </Box>
      </VStack>
    </Box>
  )
}
