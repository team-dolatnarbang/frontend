import { Badge, Box, Button, HStack, IconButton, Text, VStack } from '@vapor-ui/core'
import {
  BackPageOutlineIcon,
  ForwardPageOutlineIcon,
  PauseOutlineIcon,
  PlayOutlineIcon,
} from '@vapor-ui/icons'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { places, type NarrationLine } from '../../data/places'

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function getActiveIndex(narration: NarrationLine[], currentTime: number): number {
  return narration.findIndex((line) => currentTime >= line.start && currentTime < line.end)
}

export default function MapListenPage() {
  const { siteId } = useParams()
  const navigate = useNavigate()

  const audioRef = useRef<HTMLAudioElement>(null)
  const activeLineRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const place = places.find((p) => String(p.id) === siteId)

  const activeLineIndex = place ? getActiveIndex(place.narration, currentTime) : -1

  useEffect(() => {
    if (!place) navigate('/map', { replace: true })
  }, [place, navigate])

  useEffect(() => {
    if (activeLineIndex >= 0) {
      activeLineRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [activeLineIndex])

  if (!place) return null

  const currentIndex = places.findIndex((p) => String(p.id) === siteId)
  const isLastPlace = currentIndex === places.length - 1
  const nextPlace = places[currentIndex + 1]

  const audioUrl = place.audioUrl

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleBack = () => {
    if (!audioRef.current) return
    audioRef.current.currentTime = Math.max(0, currentTime - 10)
  }

  const handleForward = () => {
    if (!audioRef.current) return
    audioRef.current.currentTime = Math.min(duration, currentTime + 10)
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || duration === 0) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    audioRef.current.currentTime = ratio * duration
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <VStack className="flex items-center w-full">
      <VStack className="pt-5 w-83.75 items-center">
        <audio
          ref={audioRef}
          src={audioUrl || undefined}
          onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime ?? 0)}
          onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
          onEnded={() => setIsPlaying(false)}
        />

        {/* 장소 뱃지 + 제목 + 부제목 */}
        <VStack className="gap-2 items-start mt-4.5">
          <Badge
            shape="pill"
            className="px-1.75 py-0.5 outline-1 outline-(--vapor-color-green-400) bg-(--vapor-color-green-050) text-(--vapor-color-green-700)"
          >
            {place.location}
          </Badge>
          <VStack className="gap-1">
            <Text typography="heading3">{place.memory.title}</Text>
            <Text typography="heading6">{place.memory.narrator}의 기억</Text>
          </VStack>
        </VStack>

        {/* 이미지 영역 */}
        <div className="py-4">
          <Box className="w-55.25 h-60.25 bg-(--vapor-color-gray-100) rounded-sm" />
        </div>

        {/* 오디오 플레이어 ---- 수정 필요*/}
        <div className="px-5 ">
          {/* 진행 바 */}
          <div className="flex items-center gap-2 py-1">
            <Text
              $css={{
                fontFamily: 'Oxygen, sans-serif',
                fontSize: '12px',
                color: '#480000',
                flexShrink: '0',
              }}
            >
              {formatTime(currentTime)}
            </Text>
            <div
              onClick={handleSeek}
              style={{
                flex: 1,
                height: '4px',
                backgroundColor: '#D9D9D9',
                borderRadius: '2px',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: '100%',
                  backgroundColor: '#E50048',
                  borderRadius: '2px',
                  transition: 'width 0.1s linear',
                }}
              />
            </div>
            <Text
              $css={{
                fontFamily: 'Oxygen, sans-serif',
                fontSize: '12px',
                color: '#480000',
                flexShrink: '0',
              }}
            >
              {formatTime(duration)}
            </Text>
          </div>

          {/* 컨트롤 버튼 */}
          <div className="flex items-center justify-center w-full gap-5 py-4">
            <IconButton
              variant="ghost"
              colorPalette="secondary"
              shape="circle"
              onClick={handleBack}
              $css={{ width: '40px', height: '40px' }}
            >
              <BackPageOutlineIcon />
            </IconButton>
            <IconButton
              variant="fill"
              colorPalette="danger"
              shape="circle"
              onClick={togglePlay}
              $css={{ width: '64px', height: '64px' }}
            >
              {isPlaying ? <PauseOutlineIcon /> : <PlayOutlineIcon />}
            </IconButton>
            <IconButton
              variant="ghost"
              colorPalette="secondary"
              shape="circle"
              onClick={handleForward}
              $css={{ width: '40px', height: '40px' }}
            >
              <ForwardPageOutlineIcon />
            </IconButton>
          </div>
        </div>

        <VStack className="gap-6">
          {/* 나레이션 - 실시간 자막 싱크 */}
          <VStack className="rounded-lg bg-(--vapor-color-gray-100) py-4 px-4">
            <Text className="text-(--vapor-color-hondi-500) font-bold">나레이션</Text>
            <Text className="pt-4 text-(--vapor-color-gray-600)">
              나 그때 열 살이었어. 관덕정 앞에 사람이 엄청 모였거든. 3·1절이니까. 근데 갑자기 말이
              달려오는 거야. 크고 무서운 말. 사람들이 막 피하고 난리가 났지. 그러다 탕, 소리가 났어
              사람들이 쓰러지는 거 봤어. 내 옆에 있던 아줌마가 나를 확 안고 엎드렸거든.
            </Text>
          </VStack>

          {/* 사건 기록 */}
          <VStack className="rounded-lg bg-(--vapor-color-gray-100) py-4 px-4">
            <Text className="text-(--vapor-color-hondi-500) font-bold">사건 기록</Text>
            <HStack className="gap-2 items-center pt-4">
              <Text typography="heading4">관덕정</Text>
              <Text typography="subtitle1" className="text-(--vapor-color-gray-400)">
                1947.03.31
              </Text>
            </HStack>
            <Text className="pt-2 text-(--vapor-color-gray-600)">
              1947년 3·1절, 기마경찰의 말발굽에 어린이가 치였다. 경찰의 발포로 주민 6명이 숨졌고,
              그것이 4·3의 도화선이 되었습니. 이후 이곳은 무장대 사령관 이덕구의 시신이 효수된
              장소로 역사에 남았습니다.
            </Text>
          </VStack>

          {/* 현장 살펴보기 */}
          <VStack className="rounded-lg bg-(--vapor-color-gray-100) py-4 px-4">
            <Text className="text-(--vapor-color-hondi-500) font-bold">현장 살펴보기</Text>
            <HStack className="pt-4 gap-4">
              <Box className="w-22.5 h-33.25 bg-(--vapor-color-gray-300) rounded-sm" />
              <Box className="w-22.5 h-33.25 bg-(--vapor-color-gray-300) rounded-sm" />
              <Box className="w-22.5 h-33.25 bg-(--vapor-color-gray-300) rounded-sm" />
            </HStack>
          </VStack>
        </VStack>

        {/* 하단 버튼 영역 */}
        <Button
        onClick={() => navigate(`/map/${siteId}/end`)}
          $css={{
            display: 'flex',
            height: 'var(--vapor-size-dimension-600)',
            padding: '0 var(--vapor-size-space-300)',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 'var(--vapor-button-gap)',
            alignSelf: 'stretch',
            marginTop: '32px',
            color: 'white',
            fontFamily: 'var(--vapor-typography-fontFamily-sans)',
            fontSize: 'var(--vapor-typography-fontSize-100)',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'var(--vapor-typography-lineHeight-100)',
            letterSpacing: 'var(--vapor-typography-letterSpacing-100)',
          }}
        >
          다음 장소로
        </Button>
      </VStack>
    </VStack>
  )
}
