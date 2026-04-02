import { Badge, Box, Button, HStack, Text, VStack } from '@vapor-ui/core'
// import {
//   BackPageOutlineIcon,
//   ForwardPageOutlineIcon,
//   PauseOutlineIcon,
//   PlayOutlineIcon,
// } from '@vapor-ui/icons'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { places } from '../../data/places'
import AudioPlayer from '../../components/AudioPlayer'

// function formatTime(seconds: number): string {
//   const m = Math.floor(seconds / 60)
//   const s = Math.floor(seconds % 60)
//   return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
// }

// function getActiveIndex(narration: NarrationLine[], currentTime: number): number {
//   return narration.findIndex((line) => currentTime >= line.start && currentTime < line.end)
// }

export default function MapListenPage() {
  const { siteId } = useParams()
  const navigate = useNavigate()

  const audioRef = useRef<HTMLAudioElement>(null)
  // const activeLineRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  console.log(isPlaying, currentTime, duration)

  const place = places.find((p) => String(p.order) === siteId)

  // const activeLineIndex = place ? getActiveIndex(place.narration, currentTime) : -1

  useEffect(() => {
    if (!place) navigate('/map', { replace: true })
  }, [place, navigate])

  // useEffect(() => {
  //   if (activeLineIndex >= 0) {
  //     activeLineRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  //   }
  // }, [activeLineIndex])

  if (!place) return null

  const currentIndex = places.findIndex((p) => String(p.order) === siteId)
  const isLastPlace = currentIndex === places.length - 1
  const nextPlace = places[currentIndex + 1]

  const audioUrl = place.elderStory.audioUrl

  // const togglePlay = () => {
  //   const audio = audioRef.current
  //   if (!audio) return
  //   if (isPlaying) {
  //     audio.pause()
  //   } else {
  //     audio.play()
  //   }
  //   setIsPlaying(!isPlaying)
  // }

  // const handleBack = () => {
  //   if (!audioRef.current) return
  //   audioRef.current.currentTime = Math.max(0, currentTime - 10)
  // }

  // const handleForward = () => {
  //   if (!audioRef.current) return
  //   audioRef.current.currentTime = Math.min(duration, currentTime + 10)
  // }

  // const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
  //   if (!audioRef.current || duration === 0) return
  //   const rect = e.currentTarget.getBoundingClientRect()
  //   const ratio = (e.clientX - rect.left) / rect.width
  //   audioRef.current.currentTime = ratio * duration
  // }

  // const progress = duration > 0 ? (currentTime / duration) * 100 : 0

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
            {place.detailRegion}
          </Badge>
          <VStack className="gap-1">
            <Text typography="heading3">{place.title}</Text>
            <Text typography="heading6">{place.subTitle}</Text>
          </VStack>
        </VStack>

        {/* 이미지 영역 */}
        <div className="py-4">
          <Box className="w-55.25 h-60.25 bg-(--vapor-color-gray-100) rounded-sm" />
        </div>

        <AudioPlayer src={audioUrl || ''} />

        <VStack className="gap-6">
          {/* 나레이션 - 실시간 자막 싱크 */}
          <VStack className="rounded-lg bg-(--vapor-color-gray-100) py-4 px-4">
            <Text className="text-(--vapor-color-hondi-500) font-bold">나레이션</Text>
            <Text className="pt-4 text-(--vapor-color-gray-600)">{place.elderStory.Longtext}</Text>
          </VStack>

          {/* 사건 기록 */}
          <VStack className="rounded-lg bg-(--vapor-color-gray-100) py-4 px-4">
            <Text className="text-(--vapor-color-hondi-500) font-bold">사건 기록</Text>
            <HStack className="gap-2 items-center pt-4">
              <Text typography="heading4">{place.acInfoTitle}</Text>
              <Text typography="subtitle1" className="text-(--vapor-color-gray-400)">
                {place.acInfoDate}
              </Text>
            </HStack>
            <Text className="pt-2 text-(--vapor-color-gray-600)">{place.acInfoText}</Text>
          </VStack>

          {/* 현장 살펴보기 */}
          <VStack className="rounded-lg bg-(--vapor-color-gray-100) py-4 px-4">
            <Text className="text-(--vapor-color-hondi-500) font-bold">현장 살펴보기</Text>
            <HStack className="pt-4 gap-4">
              {place.acImageUrl.map((img, index) => (
                <Box
                  key={index}
                  className="w-22.5 h-33.25 rounded-sm overflow-hidden relative"
                  style={{
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              ))}
            </HStack>
          </VStack>
        </VStack>

        {/* 하단 버튼 영역 */}
        <Button
          onClick={
            () =>
              isLastPlace
                ? navigate('/complete', {
                    state: {
                      completedModal: {
                        petalOrder: place.order,
                        siteName: place.name,
                        elderName: place.contributorLabel,
                        storyTitle: place.title,
                        isLast: true,
                      },
                    },
                  })
                : nextPlace &&
                  navigate(`/map/${nextPlace.order}`, {
                    state: {
                      completedModal: {
                        petalOrder: place.order,
                        siteName: place.name,
                        elderName: place.contributorLabel,
                        storyTitle: place.title,
                        isLast: false,
                      },
                    },
                  }) //  다음 장소
          }
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
            fontSize: 'var(--vapor-typography-fontSize-100)',
            fontWeight: 400,
          }}
        >
          {isLastPlace ? '탐험 완료' : '다음 장소로'}
        </Button>
      </VStack>
    </VStack>
  )
}
