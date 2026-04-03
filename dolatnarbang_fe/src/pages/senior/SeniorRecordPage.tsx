import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Text, VStack } from '@vapor-ui/core';
import { uploadContributionAudio } from '../../api/senior';

const MAX_DURATION_SEC = 120;

type RecordState = 'idle' | 'recording' | 'uploading' | 'done';

interface LocationState {
  contributorName?: string;
  siteId?: string;
  siteName?: string;
}

export default function SeniorRecordPage() {
  const location = useLocation();
  const {
    contributorName = '',
    siteId = '',
    siteName = '',
  } = (location.state as LocationState) ?? {};

  const [recordState, setRecordState] = useState<RecordState>('idle');
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioBlobRef = useRef<Blob | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const submit = useCallback(
    async (blob: Blob, durationSec: number) => {
      setRecordState('uploading');
      setError(null);
      try {
        const audioFile = new File([blob], 'recording.webm', { type: blob.type });
        await uploadContributionAudio({
          contributorName,
          siteId,
          audio: audioFile,
          durationSec,
        });
        setRecordState('done');
      } catch {
        setError('업로드에 실패했습니다. 잠시 후 다시 시도해 주세요.');
        setRecordState('idle');
      }
    },
    [contributorName, siteId]
  );

  const startRecording = useCallback(async () => {
    try {
      setError(null);
      setElapsed(0);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        audioBlobRef.current = blob;
        // 멈추는 시점의 elapsed는 onstop 호출 전 timerRef에서 이미 정리됨
        // elapsed state를 직접 읽기 어려우므로 ref로 전달
        submit(blob, elapsedRef.current);
      };

      mediaRecorder.start();
      setRecordState('recording');

      let elapsedCount = 0;
      timerRef.current = setInterval(() => {
        elapsedCount += 1;
        elapsedRef.current = elapsedCount;
        setElapsed(elapsedCount);
        if (elapsedCount >= MAX_DURATION_SEC) {
          clearInterval(timerRef.current!);
          timerRef.current = null;
          mediaRecorderRef.current?.stop();
        }
      }, 1000);
    } catch {
      setError('마이크 접근 권한이 필요합니다. 브라우저 설정을 확인해 주세요.');
    }
  }, [submit]);

  const elapsedRef = useRef(0);

  const stopRecording = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    mediaRecorderRef.current?.stop();
  }, []);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const isRecording = recordState === 'recording';
  const isUploading = recordState === 'uploading';

  if (recordState === 'done') {
    return (
      <Box
        $css={{
          maxWidth: '480px',
          margin: '0 auto',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '$400',
        }}
      >
        <VStack $css={{ gap: '$200', alignItems: 'center', textAlign: 'center' }}>
          <Text typography="heading3">소중한 이야기를{'\n'}감사합니다</Text>
          <Text typography="body1" foreground="hint-100">
            녹음이 성공적으로 전송되었습니다.
          </Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box
      $css={{
        maxWidth: '480px',
        margin: '0 auto',
        minHeight: '100vh',
        padding: '$400',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <VStack $css={{ flex: 1, gap: '$300' }}>
        {/* 헤더 텍스트 */}
        <VStack $css={{ gap: '$100', marginTop: '$400' }}>
          <Text typography="heading3">
            {contributorName}님만 가지고있는
            <br />
            <Text
              typography="heading3"
              $css={{ color: 'var(--vapor-color-hondi-400)', display: 'inline' }}
            >
              {siteName || '이 장소'}
            </Text>{' '}
            이야기를 들려주세요
          </Text>
          {!isRecording && !isUploading && (
            <Text typography="body2" foreground="hint-100">
              준비가 되었다면 말하기 버튼을 눌러주세요
            </Text>
          )}
        </VStack>

        {/* 타이머 */}
        {isRecording && (
          <Text
            typography="heading2"
            $css={{
              color: 'var(--vapor-color-hondi-400)',
              fontVariantNumeric: 'tabular-nums',
              textAlign: 'center',
              marginTop: 'auto',
            }}
          >
            {formatTime(elapsed)}
          </Text>
        )}

        {/* 에러 */}
        {error && (
          <Text typography="body2" foreground="danger-100">
            {error}
          </Text>
        )}
      </VStack>

      {/* 하단 버튼 영역 */}
      <Box $css={{ display: 'flex', justifyContent: 'center', paddingBottom: '$700' }}>
        <button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isUploading}
          aria-label={isRecording ? '멈추기' : '말하기'}
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            backgroundColor: isRecording
              ? '#3d3d3d'
              : isUploading
                ? '#d1d5db'
                : 'var(--vapor-color-hondi-400)',
            border: 'none',
            cursor: isUploading ? 'not-allowed' : 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            transition: 'background-color 0.15s',
            boxShadow: isRecording ? 'none' : '0 4px 16px rgba(0,0,0,0.15)',
          }}
        >
          <span
            style={{
              color: '#fff',
              fontSize: '18px',
              fontWeight: 600,
              fontFamily: 'var(--vapor-typography-fontFamily-sans)',
            }}
          >
            {isUploading ? '전송 중' : isRecording ? '멈추기' : '말하기'}
          </span>
        </button>
      </Box>
    </Box>
  );
}

// import { useState, useRef, useEffect, useCallback } from 'react'
// import { useLocation } from 'react-router-dom'
// import { Button, Text, VStack } from '@vapor-ui/core'
// import { uploadContributionAudio } from '../../api/senior'

// const MAX_DURATION_SEC = 120

// type RecordState = 'idle' | 'recording' | 'recorded' | 'uploading' | 'done'

// interface LocationState {
//   contributorName?: string
//   siteId?: string
// }

// export default function SeniorRecordPage() {
//   const location = useLocation()
//   const { contributorName: initialName = '', siteId = '' } = (location.state as LocationState) ?? {}

//   const [recordState, setRecordState] = useState<RecordState>('idle')
//   const [elapsed, setElapsed] = useState(0)
//   const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
//   const [audioUrl, setAudioUrl] = useState<string | null>(null)
//   const [error, setError] = useState<string | null>(null)

//   const mediaRecorderRef = useRef<MediaRecorder | null>(null)
//   const chunksRef = useRef<Blob[]>([])
//   const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
//   const sessionIdRef = useRef<string>(crypto.randomUUID())

//   const audioUrlRef = useRef<string | null>(null)

//   useEffect(() => {
//     return () => {
//       if (timerRef.current) clearInterval(timerRef.current)
//       if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current)
//     }
//   }, [])

//   const startRecording = useCallback(async () => {
//     try {
//       setError(null)
//       setAudioBlob(null)
//       if (audioUrlRef.current) {
//         URL.revokeObjectURL(audioUrlRef.current)
//         audioUrlRef.current = null
//       }
//       setAudioUrl(null)
//       setElapsed(0)

//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
//       const mediaRecorder = new MediaRecorder(stream)
//       mediaRecorderRef.current = mediaRecorder
//       chunksRef.current = []

//       mediaRecorder.ondataavailable = (e) => {
//         if (e.data.size > 0) chunksRef.current.push(e.data)
//       }

//       mediaRecorder.onstop = () => {
//         stream.getTracks().forEach((t) => t.stop())
//         const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
//         const url = URL.createObjectURL(blob)
//         audioUrlRef.current = url
//         setAudioBlob(blob)
//         setAudioUrl(url)
//         setRecordState('recorded')
//       }

//       mediaRecorder.start()
//       setRecordState('recording')

//       let elapsedCount = 0
//       timerRef.current = setInterval(() => {
//         elapsedCount += 1
//         setElapsed(elapsedCount)
//         if (elapsedCount >= MAX_DURATION_SEC) {
//           clearInterval(timerRef.current!)
//           timerRef.current = null
//           mediaRecorderRef.current?.stop()
//         }
//       }, 1000)
//     } catch {
//       setError('마이크 접근 권한이 필요합니다. 브라우저 설정을 확인해 주세요.')
//     }
//   }, [])

//   const stopRecording = useCallback(() => {
//     if (timerRef.current) {
//       clearInterval(timerRef.current)
//       timerRef.current = null
//     }
//     mediaRecorderRef.current?.stop()
//   }, [])

//   const handleSubmit = async () => {
//     if (!audioBlob) {
//       setError('녹음을 먼저 완료해 주세요.')
//       return
//     }
//     setRecordState('uploading')
//     setError(null)

//     try {
//       const audioFile = new File([audioBlob], 'recording.webm', { type: audioBlob.type })
//       await uploadContributionAudio(
//         { contributorName: initialName, siteId, audio: audioFile, durationSec: elapsed },
//         sessionIdRef.current
//       )
//       setRecordState('done')
//     } catch {
//       setError('업로드에 실패했습니다. 잠시 후 다시 시도해 주세요.')
//       setRecordState('recorded')
//     }
//   }

//   const formatTime = (sec: number) => {
//     const m = Math.floor(sec / 60)
//     const s = sec % 60
//     return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
//   }

//   if (recordState === 'done') {
//     return (
//       <div className="min-h-screen flex justify-center" style={{ backgroundColor: '#FAFAFA' }}>
//         <VStack
//           $css={{
//             width: '100%',
//             maxWidth: { sm: '448px', md: '576px', lg: '672px' },
//             minHeight: '100vh',
//             padding: '$400',
//             justifyContent: 'center',
//             alignItems: 'center',
//             gap: '$400',
//           }}
//         >
//           <Text
//             typography="heading3"
//             $css={{ color: 'var(--vapor-color-gray-900)', textAlign: 'center' }}
//           >
//             소중한 이야기를{'\n'}감사합니다
//           </Text>
//           <Text
//             typography="body1"
//             $css={{ color: 'var(--vapor-color-gray-600)', textAlign: 'center' }}
//           >
//             녹음이 성공적으로 전송되었습니다.
//           </Text>
//         </VStack>
//       </div>
//     )
//   }

//   const isRecording = recordState === 'recording'
//   const canSubmit = !!audioBlob && recordState !== 'uploading'

//   return (
//     <div className="min-h-screen flex justify-center" style={{ backgroundColor: '#FAFAFA' }}>
//       <VStack
//         $css={{
//           width: '100%',
//           maxWidth: { sm: '448px', md: '576px', lg: '672px' },
//           minHeight: '100vh',
//           padding: '$400',
//           paddingTop: '$700',
//           gap: '$500',
//         }}
//       >
//         {/* 헤더 */}
//         <VStack $css={{ gap: '$100' }}>
//           <Text typography="heading3" $css={{ color: 'var(--vapor-color-gray-900)' }}>
//             이야기를 녹음해 주세요
//           </Text>
//           <Text typography="body2" $css={{ color: 'var(--vapor-color-gray-500)' }}>
//             최대 2분까지 녹음할 수 있습니다.
//           </Text>
//         </VStack>

//         {/* 녹음 영역 */}
//         <VStack
//           $css={{ alignItems: 'center', gap: '$400', paddingTop: '$500', paddingBottom: '$500' }}
//         >
//           {/* 타이머 */}
//           <Text
//             typography="display2"
//             $css={{
//               fontVariantNumeric: 'tabular-nums',
//               color: isRecording
//                 ? 'var(--vapor-color-red-500, #ef4444)'
//                 : 'var(--vapor-color-gray-900)',
//               minWidth: '120px',
//               textAlign: 'center',
//             }}
//           >
//             {formatTime(elapsed)}
//           </Text>

//           {/* 남은 시간 표시 (녹음 중) */}
//           {isRecording && (
//             <Text $css={{ color: 'var(--vapor-color-gray-500)' }}>
//               남은 시간: {formatTime(MAX_DURATION_SEC - elapsed)}
//             </Text>
//           )}

//           {/* 녹음 버튼 */}
//           <button
//             onClick={isRecording ? stopRecording : startRecording}
//             disabled={recordState === 'uploading'}
//             aria-label={isRecording ? '녹음 정지' : '녹음 시작'}
//             style={{
//               width: '80px',
//               height: '80px',
//               borderRadius: '50%',
//               backgroundColor: recordState === 'uploading' ? '#d1d5db' : '#ef4444',
//               border: 'none',
//               cursor: recordState === 'uploading' ? 'not-allowed' : 'pointer',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               boxShadow: '0 4px 12px rgba(239,68,68,0.4)',
//               transition: 'background-color 0.15s',
//             }}
//           >
//             {isRecording ? (
//               /* 정지 아이콘 (사각형) */
//               <div
//                 style={{
//                   width: '24px',
//                   height: '24px',
//                   borderRadius: '4px',
//                   backgroundColor: '#fff',
//                 }}
//               />
//             ) : (
//               /* 녹음 아이콘 (원) */
//               <div
//                 style={{
//                   width: '28px',
//                   height: '28px',
//                   borderRadius: '50%',
//                   backgroundColor: '#fff',
//                 }}
//               />
//             )}
//           </button>

//           {/* 버튼 안내 텍스트 */}
//           <Text
//             typography="body1"
//             $css={{ color: 'var(--vapor-color-gray-500)', textAlign: 'center' }}
//           >
//             {recordState === 'idle' && '버튼을 눌러 녹음을 시작하세요'}
//             {recordState === 'recording' && '녹음 중입니다. 버튼을 눌러 정지하세요'}
//             {recordState === 'recorded' && '다시 녹음하려면 버튼을 누르세요'}
//             {recordState === 'uploading' && '업로드 중입니다...'}
//           </Text>
//         </VStack>

//         {/* 미리 듣기 */}
//         {audioUrl && recordState !== 'uploading' && (
//           <VStack $css={{ gap: '$200' }}>
//             <Text typography="body1" $css={{ color: 'var(--vapor-color-gray-800)' }}>
//               녹음 확인
//             </Text>
//             <audio controls src={audioUrl} style={{ width: '100%' }} />
//           </VStack>
//         )}

//         {/* 에러 메시지 */}
//         {error && (
//           <Text typography="body2" $css={{ color: 'var(--vapor-color-red-500, #ef4444)' }}>
//             {error}
//           </Text>
//         )}

//         {/* 제출 버튼 */}
//         <div style={{ marginTop: 'auto', paddingBottom: '2rem' }}>
//           <Button
//             size="xl"
//             colorPalette="primary"
//             variant="fill"
//             $css={{ width: '100%' }}
//             disabled={!canSubmit}
//             onClick={handleSubmit}
//           >
//             {recordState === 'uploading' ? '업로드 중...' : '이야기 전송하기'}
//           </Button>
//         </div>
//       </VStack>
//     </div>
//   )
// }
