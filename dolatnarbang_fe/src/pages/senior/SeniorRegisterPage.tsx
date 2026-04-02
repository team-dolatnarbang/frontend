import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Text, VStack } from '@vapor-ui/core'

const REGIONS = [
  '한경면',
  '한림읍',
  '애월읍',
  '제주시',
  '조천읍',
  '구좌읍',
  '대정읍',
  '안덕면',
  '서귀포시',
  '남원읍',
  '표선면',
  '성산읍',
] as const

type Region = (typeof REGIONS)[number]

interface Site {
  id: string
  name: string
  region: Region
}

const SITES: Site[] = [
  { id: '1', name: '관덕정', region: '제주시' },
  { id: '2', name: '주정공장(동척회사) 옛터', region: '제주시' },
  { id: '3', name: '너븐숭이 4.3 유적지', region: '조천읍' },
  { id: '4', name: '수악주둔소', region: '남원읍' },
  { id: '5', name: '고산국민학교', region: '한경면' },
]

export default function SeniorRegisterPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null)
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null)

  const filteredSites = selectedRegion ? SITES.filter((s) => s.region === selectedRegion) : []

  const handleRegionClick = (region: Region) => {
    if (selectedRegion === region) return
    setSelectedRegion(region)
    setSelectedSiteId(null)
  }

  const canProceed = name.trim().length > 0 && selectedRegion !== null && selectedSiteId !== null

  const handleNext = () => {
    if (!canProceed) return
    navigate('/senior/record', { state: { contributorName: name.trim(), siteId: selectedSiteId } })
  }

  return (
    <div style={{ padding: '24px', maxWidth: '480px', margin: '0 auto' }}>
      <VStack $css={{ gap: '$500' }}>
        <Text typography="heading3">이야기 등록</Text>

        {/* 이름 입력 */}
        <VStack $css={{ gap: '$200' }}>
          <Text typography="body1">이름</Text>
          <input
            type="text"
            placeholder="성함을 입력해 주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: '100%',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              padding: '12px 16px',
              fontSize: '16px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </VStack>

        {/* 지역 선택 */}
        <VStack $css={{ gap: '$200' }}>
          <Text typography="body1">지역 선택</Text>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {REGIONS.map((region) => (
              <button
                key={region}
                onClick={() => handleRegionClick(region)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: '1px solid',
                  borderColor: selectedRegion === region ? '#3b82f6' : '#d1d5db',
                  backgroundColor: selectedRegion === region ? '#eff6ff' : '#fff',
                  color: selectedRegion === region ? '#1d4ed8' : '#374151',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                {region}
              </button>
            ))}
          </div>
        </VStack>

        {/* 유적지 선택 */}
        {selectedRegion && (
          <VStack $css={{ gap: '$200' }}>
            <Text typography="body1">유적지 선택</Text>
            {filteredSites.length === 0 ? (
              <Text typography="body2" $css={{ color: 'var(--vapor-color-gray-500)' }}>
                해당 지역에 등록된 유적지가 없습니다.
              </Text>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {filteredSites.map((site) => (
                  <button
                    key={site.id}
                    onClick={() => setSelectedSiteId(site.id)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '20px',
                      border: '1px solid',
                      borderColor: selectedSiteId === site.id ? '#3b82f6' : '#d1d5db',
                      backgroundColor: selectedSiteId === site.id ? '#eff6ff' : '#fff',
                      color: selectedSiteId === site.id ? '#1d4ed8' : '#374151',
                      cursor: 'pointer',
                      fontSize: '14px',
                    }}
                  >
                    {site.name}
                  </button>
                ))}
              </div>
            )}
          </VStack>
        )}

        {/* 다음 버튼 */}
        <Button
          size="xl"
          colorPalette="primary"
          variant="fill"
          $css={{ width: '100%', marginTop: '$300' }}
          disabled={!canProceed}
          onClick={handleNext}
        >
          다음
        </Button>
      </VStack>
    </div>
  )
}
