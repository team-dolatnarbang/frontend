import { useState, useRef, useEffect } from 'react'
import { Box, HStack, Text } from '@vapor-ui/core'

interface AudioPlayerProps {
  src: string
}

export default function AudioPlayer({ src }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTimeUpdate = () => setCurrentTime(audio.currentTime)
    const onLoadedMetadata = () => setDuration(audio.duration)
    const onEnded = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
      audio.removeEventListener('ended', onEnded)
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying((prev) => !prev)
  }

  const skipBackward = () => {
    if (!audioRef.current) return
    audioRef.current.currentTime = 0
  }

  const skipForward = () => {
    if (!audioRef.current) return
    audioRef.current.currentTime = duration
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value)
    if (!audioRef.current) return
    audioRef.current.currentTime = time
    setCurrentTime(time)
  }

  const formatTime = (sec: number) => {
    if (isNaN(sec)) return '00:00'
    const m = Math.floor(sec / 60)
    const s = Math.floor(sec % 60)
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <Box $css={{ width: '100%', padding: '$300', borderRadius: '$300' }}>
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* 프로그레스 바 */}
      <Box $css={{ position: 'relative', marginBottom: '$100' }}>
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={currentTime}
          onChange={handleSeek}
          style={{
            width: '100%',
            height: '4px',
            appearance: 'none',
            borderRadius: '2px',
            outline: 'none',
            cursor: 'pointer',
            background: `linear-gradient(to right, var(--vapor-color-hondi-400) ${progress}%, #e5e7eb ${progress}%)`,
          }}
        />
        <style>{`
          input[type='range']::-webkit-slider-thumb {
            appearance: none;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: var(--vapor-color-hondi-400);
            cursor: pointer;
          }
          input[type='range']::-moz-range-thumb {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: var(--vapor-color-hondi-400);
            cursor: pointer;
            border: none;
          }
        `}</style>
      </Box>

      {/* 시간 표시 */}
      <HStack $css={{ justifyContent: 'space-between', marginBottom: '$300' }}>
        <Text typography="body4" foreground="hint-100">
          {formatTime(currentTime)}
        </Text>
        <Text typography="body4" foreground="hint-100">
          {formatTime(duration)}
        </Text>
      </HStack>

      {/* 컨트롤 버튼 */}
      <HStack $css={{ justifyContent: 'center', alignItems: 'center', gap: '$500' }}>
        {/* 처음으로 */}
        <button
          onClick={skipBackward}
          aria-label="처음으로"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 6v12M18 6L9 12l9 6V6z"
              stroke="#9ca3af"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* 재생/일시정지 */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? '일시정지' : '재생'}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'var(--vapor-color-hondi-400)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        >
          {isPlaying ? (
            /* 일시정지 아이콘 */
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            /* 재생 아이콘 */
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M8 5.14v14l11-7-11-7z" />
            </svg>
          )}
        </button>

        {/* 끝으로 */}
        <button
          onClick={skipForward}
          aria-label="끝으로"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6v12M6 6l9 6-9 6V6z"
              stroke="#9ca3af"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </HStack>
    </Box>
  )
}
