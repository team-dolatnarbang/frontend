import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Text, VStack, Button } from '@vapor-ui/core';
import type { TributeItem } from '../../types/tribute';

const MOCK_ITEMS: TributeItem[] = [
  {
    id: '1',
    siteName: '제주4·3평화공원',
    nickname: '돌맹이',
    message: '실제 경험담이라는 점이 너무 놀라웠어요 더 나은 삶을 살아가시길 바랍니다',
    camelliaCount: 3,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    siteName: '북촌 너븐숭이',
    nickname: '감귤',
    message: '어르신들의 생생한 이야기를 들을 수 있어서 좋았습니다',
    camelliaCount: 5,
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: '3',
    siteName: '다랑쉬오름',
    nickname: '혼다다다',
    message:
      '이야기를 들으며 제주 4.3 사건을 잘 모르고 있었다는 사실을 오늘 알게됐어요. 배울 수 있어서 좋았습니다',
    camelliaCount: 2,
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
  },
  {
    id: '4',
    siteName: '알뜨르 비행장',
    nickname: '캣츠',
    message: '이야기만 모아서 많이 듣고싶어요!',
    camelliaCount: 4,
    createdAt: new Date(Date.now() - 20 * 86400000).toISOString(),
  },
];

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return '오늘';
  if (diffDays < 7) return `${diffDays}일전`;

  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks < 5) return `${diffWeeks}주전`;

  return `${Math.floor(diffDays / 30)}달전`;
}

export default function TributeFeedPage() {
  const navigate = useNavigate();
  // const [items, setItems] = useState<TributeItem[]>([])
  const [items] = useState<TributeItem[]>(MOCK_ITEMS);
  const [page, setPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1)
  const [totalPages] = useState(1);

  return (
    <Box
      $css={{
        maxWidth: '375px',
        margin: '0 auto',
        minHeight: '80vh',
        position: 'relative',
      }}
    >
      {/* 뒤로가기 */}
      <Box
        $css={{
          height: '44px',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          marginTop: '30px',
        }}
        onClick={() => navigate(-1)}
      >
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <path
            d="M16.25 6.5L9.75 13L16.25 19.5"
            stroke="#262626"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Box>

      {/* 제목 */}
      <VStack $css={{ gap: '8px', padding: '16px 20px 24px' }}>
        <Text
          $css={{
            fontFamily: 'Pretendard',
            fontWeight: 700,
            fontSize: '24px',
            color: '#262626',
          }}
        >
          후기
        </Text>

        <Text
          $css={{
            fontFamily: 'Pretendard',
            fontWeight: 500,
            fontSize: '16px',
            color: '#767676',
            whiteSpace: 'pre-line',
          }}
        >
          {
            '어르신들의 이야기를 들으며 떠오른 생각, \n제주 4.3 에 대한 다양한 의견을 편하게 남겨주세요'
          }
        </Text>
      </VStack>

      {/* 리스트 */}
      <VStack $css={{ gap: '16px', padding: '12px 20px 100px' }}>
        {items.map((item) => (
          <Box
            key={item.id}
            $css={{
              backgroundColor: '#EFEFEF',
              borderRadius: '8px',
              padding: '18px 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            {/* 닉네임 + 시간 */}
            <Box
              $css={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Text
                $css={{
                  fontWeight: 700,
                  fontSize: '16px',
                  color: '#FA502D',
                }}
              >
                {item.nickname}
              </Text>

              <Text
                $css={{
                  fontSize: '12px',
                  color: '#A3A3A3',
                }}
              >
                {formatRelativeTime(item.createdAt)}
              </Text>
            </Box>

            {/* 후기 */}
            <Text
              $css={{
                fontSize: '14px',
                color: '#5D5D5D',
                lineHeight: '1.5714',

                display: '-webkit-box',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {item.message}
            </Text>
          </Box>
        ))}

        {/* 페이지네이션 (목업에서는 숨김됨) */}
        {totalPages > 1 && (
          <Box
            $css={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
            }}
          >
            <Button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
              이전
            </Button>

            <Text>
              {page} / {totalPages}
            </Text>

            <Button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
              다음
            </Button>
          </Box>
        )}
      </VStack>

      {/* FAB */}
      <Box
        $css={{
          position: 'fixed',
          bottom: '32px',
          right: '20px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#FA502D',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(250, 80, 45, 0.35)',
        }}
        onClick={() => navigate('/tribute')}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2" />
        </svg>
      </Box>
    </Box>
  );
}
