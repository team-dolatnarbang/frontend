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
    <VStack $css={{ backgroundColor: '#FAFAFA', minHeight: '100vh' }}>
      <audio
        ref={audioRef}
        src={audioUrl || undefined}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime ?? 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
        onEnded={() => setIsPlaying(false)}
      />

      {/* 장소 뱃지 + 제목 + 부제목 */}
      <div className="px-5 pt-3 pb-2">
        <VStack $css={{ gap: '6px', alignItems: 'flex-start' }}>
          <Badge colorPalette={place.locationColor} shape="pill" size="sm">
            {place.location}
          </Badge>
          <Text typography="heading2" foreground="normal-100" $css={{ letterSpacing: '-0.3px' }}>
            {place.memory.title}
          </Text>
          <Text typography="body2" foreground="normal-200">
            {place.memory.narrator}의 기억
          </Text>
        </VStack>
      </div>

      {/* 이미지 영역 */}
      <div className="px-5 py-3">
        <Box
          $css={{
            width: '100%',
            height: '220px',
            backgroundColor: '#D9D9D9',
            borderRadius: '8px',
          }}
        />
      </div>

      {/* 오디오 플레이어 */}
      <div className="px-5">
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

      {/* 나레이션 - 실시간 자막 싱크 */}
      <div className="bg-amber-300 px-5 py-4">
        <VStack $css={{ gap: '8px', alignItems: 'flex-start' }}>
          <Text typography="body3" foreground="danger-100" $css={{ fontWeight: '700' }}>
            나레이션
          </Text>
          <VStack
            $css={{
              gap: '8px',
              backgroundColor: '#fff',
              borderRadius: '8px',
              width: '100%',
              padding: '16px 14px',
              overflowY: 'auto',
              maxHeight: '240px',
            }}
          >
            {place.narration.map((line, i) => {
              const isActive = i === activeLineIndex
              return (
                <div
                  key={i}
                  ref={isActive ? activeLineRef : null}
                  style={{ transition: 'opacity 0.3s' }}
                >
                  {isActive ? (
                    <Box
                      $css={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '2px 6px',
                        backgroundColor: '#FFE063',
                        borderRadius: '4px',
                      }}
                    >
                      <Text
                        typography="body1"
                        foreground="normal-100"
                        $css={{ fontWeight: '700', letterSpacing: '-0.1px' }}
                      >
                        {line.text}
                      </Text>
                    </Box>
                  ) : (
                    <Text
                      typography="body2"
                      $css={{
                        letterSpacing: '-0.1px',
                        opacity: i < activeLineIndex ? '0.35' : '0.5',
                        color: '#3B3B3B',
                      }}
                    >
                      {line.text}
                    </Text>
                  )}
                </div>
              )
            })}
            <div className="flex justify-end mt-1">
              <Text
                typography="body3"
                foreground="danger-100"
                $css={{ cursor: 'pointer', fontWeight: '600' }}
              >
                전체 보기
              </Text>
            </div>
          </VStack>
        </VStack>
      </div>

      {/* 사건 기록 */}
      <div className="bg-amber-300 px-5 py-4">
        <VStack $css={{ gap: '8px', alignItems: 'flex-start' }}>
          <Text typography="body3" foreground="danger-100" $css={{ fontWeight: '700' }}>
            사건 기록
          </Text>
          <VStack
            $css={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              width: '100%',
              padding: '16px 14px',
              gap: '6px',
              alignItems: 'flex-start',
            }}
          >
            <Text typography="heading5" foreground="normal-100">
              {place.name}
            </Text>
            <Text typography="body3" foreground="normal-200">
              {place.eventDate}
            </Text>
            <Text
              typography="body2"
              foreground="normal-100"
              $css={{ whiteSpace: 'pre-line', letterSpacing: '-0.1px' }}
            >
              {place.record}
            </Text>
            <div className="flex justify-end w-full mt-1">
              <Text
                typography="body3"
                foreground="danger-100"
                $css={{ cursor: 'pointer', fontWeight: '600' }}
              >
                더보기
              </Text>
            </div>
          </VStack>
        </VStack>
      </div>

      {/* 현장 살펴보기 */}
      <div className="bg-amber-300 px-5 py-4">
        <VStack $css={{ gap: '8px', alignItems: 'flex-start' }}>
          <Text typography="body3" foreground="danger-100" $css={{ fontWeight: '700' }}>
            현장 살펴보기
          </Text>
          <HStack $css={{ gap: '8px', width: '100%' }}>
            {['', '', ''].map((_, i) => (
              <VStack key={i} $css={{ gap: '4px', alignItems: 'flex-start', flexShrink: '0' }}>
                <Box
                  $css={{
                    width: '98px',
                    height: '120px',
                    backgroundColor: '#D9D9D9',
                    borderRadius: '4px',
                  }}
                />
                <Text typography="body3" foreground="normal-200">
                  {i === 0 ? `1947년 ${place.name}` : '??????'}
                </Text>
              </VStack>
            ))}
          </HStack>
        </VStack>
      </div>

      {/* 하단 버튼 영역 */}
      <div className="px-5 py-4">
        <VStack $css={{ gap: '10px', alignItems: 'stretch' }}>
          <Text typography="body2" foreground="hint-100" $css={{ textAlign: 'center' }}>
            30 초 까지 들어야 활성화 돼요
          </Text>
          <Button
            size="xl"
            colorPalette="secondary"
            variant="fill"
            disabled={isLastPlace}
            onClick={() => nextPlace && navigate(`/map/${nextPlace.id}`)}
            style={{
              width: '100%',
              borderRadius: '8px',
              backgroundColor: '#E1E1E1',
              color: '#262626',
              opacity: isLastPlace ? 0.32 : 1,
            }}
          >
            다음 장소로
          </Button>
        </VStack>
      </div>
    </VStack>
  )
}
