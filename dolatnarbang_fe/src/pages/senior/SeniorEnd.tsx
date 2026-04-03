import { useNavigate } from 'react-router-dom'
import { Box, Text, Button, VStack } from '@vapor-ui/core'
import flowerImg from '../../assets/senior_end_flower.svg'

export default function SeniorEnd() {
  const navigate = useNavigate()
  const contributorName = '김정식'
  const storyTitle = '어린 시절 너븐숭이에서 군인들을\n보고 숨으려고 노력했던 경험'

  return (
    <Box
      $css={{
        maxWidth: '375px',
        margin: '0 auto',
        minHeight: '100vh',
        backgroundColor: '#FAFAFA',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 꽃 이미지 */}
      <Box
        $css={{
          padding: '88px 19px 0',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <img
          src={flowerImg}
          alt="동백꽃"
          style={{ width: '100%', maxWidth: '338px', height: 'auto', objectFit: 'contain' }}
        />
      </Box>

      {/* 메인 감사 문구 */}
      <VStack
        $css={{
          gap: '4px',
          padding: '8px 20px',
          marginTop: '40px',
        }}
      >
        <Text
          $css={{
            fontFamily: 'Pretendard',
            fontWeight: 700,
            fontSize: '28px',
            lineHeight: '1.2857',
            letterSpacing: '-0.3px',
            color: '#262626',
            textAlign: 'center',
            whiteSpace: 'pre-line',
          }}
        >
          {'말하기 어려운 경험을\n공유해주셔 감사드립니다'}
        </Text>
      </VStack>

      {/* 서브 문구 */}
      <Box
        $css={{
          padding: '8px 20px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Text
          $css={{
            fontFamily: 'Pretendard',
            fontWeight: 500,
            fontSize: '18px',
            lineHeight: '1.4444',
            color: '#959595',
            textAlign: 'center',
            whiteSpace: 'pre-line',
          }}
        >
          {'말씀해 주신 이야기를 소중히 담아, \n많은 사람들에게 전하겠습니다'}
        </Text>
      </Box>

      {/* 이야기 카드 */}
      {(contributorName || storyTitle) && (
        <Box
          $css={{
            margin: '60px 41px 0',
            backgroundColor: '#EFEFEF',
            borderRadius: '8px',
            padding: '8px 16px',
            minHeight: '114px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          {contributorName && (
            <Text
              $css={{
                fontFamily: 'Pretendard',
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '1.625',
                color: '#959595',
              }}
            >
              {contributorName}님의 이야기
            </Text>
          )}
          {storyTitle && (
            <Text
              $css={{
                fontFamily: 'Pretendard',
                fontWeight: 600,
                fontSize: '18px',
                lineHeight: '1.4444',
                color: '#4C4C4C',
                whiteSpace: 'pre-line',
              }}
            >
              {storyTitle}
            </Text>
          )}
        </Box>
      )}

      {/* 다음 버튼 */}
      <Box
        $css={{
          position: 'absolute',
          bottom: '0',
          left: '22px',
          right: '22px',
          paddingBottom: '40px',
        }}
      >
        <Button
          colorPalette="primary"
          variant="fill"
          size="xl"
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
          onClick={() => navigate('/')}
        >
          다음
        </Button>
      </Box>
    </Box>
  )
}
