import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Box, Button, Text, TextInput, Textarea, VStack } from '@vapor-ui/core';
import { createTribute } from '../../api/user';
import { useNavigate } from 'react-router-dom';

const MAX_MESSAGE_LENGTH = 300;

export default function TributePage() {
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!nickname.trim()) {
      setError('닉네임을 입력해주세요.');
      return;
    }
    if (!message.trim()) {
      setError('내용을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await createTribute({
        nickname: nickname.trim(),
        message: message.trim(),
        idempotencyKey: uuidv4(),
      });
      navigate('/tribute/feed');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 403) {
          setError('아직 모든 핑을 완료하지 않았습니다. 핑을 완료한 후 다시 시도해주세요.');
        } else {
          setError(err.response?.data?.message ?? '오류가 발생했습니다. 다시 시도해주세요.');
        }
      } else {
        setError('오류가 발생했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      $css={{
        maxWidth: '480px',
        margin: '0 auto',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <VStack $css={{ flex: 1, gap: '$400', padding: '$400', paddingTop: '$200' }}>
        {/* 헤더 */}
        <VStack $css={{ gap: '$100' }}>
          <Text typography="heading3" className="mt-14">
            후기
          </Text>
          <Text typography="body2" foreground="hint-100">
            어르신들의 이야기를 들으며 떠오른 생각,
            <br />
            제주 4.3 에 대한 다양한 의견을 편하게 남겨주세요
          </Text>
        </VStack>

        {/* 닉네임 */}
        <VStack $css={{ gap: '$150' }}>
          <Text typography="body1">닉네임</Text>
          <TextInput
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 작성주세요"
            disabled={isLoading}
          />
        </VStack>

        {/* 내용 */}
        <VStack $css={{ gap: '$150' }}>
          <Text typography="body1">내용</Text>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, MAX_MESSAGE_LENGTH))}
            placeholder="자유롭게 작성해주세요."
            disabled={isLoading}
            $css={{ minHeight: '160px' }}
          />
          <Text typography="body4" foreground="hint-100" $css={{ textAlign: 'right' }}>
            {String(message.length).padStart(2, '0')}/{MAX_MESSAGE_LENGTH}
          </Text>
        </VStack>

        {error && (
          <Text typography="body3" foreground="danger-100">
            {error}
          </Text>
        )}
      </VStack>

      {/* 하단 버튼 */}
      <Box $css={{ padding: '$400', paddingTop: '$200' }}>
        <Button
          size="xl"
          variant="fill"
          $css={{
            width: '100%',
            borderRadius: '8px',
            background: 'var(--vapor-color-hondi-400)',
            color: 'white',
          }}
          disabled={isLoading || !nickname.trim() || !message.trim()}
          onClick={handleSubmit}
        >
          {isLoading ? '저장 중...' : '작성 완료'}
        </Button>
      </Box>
    </Box>
  );
}
