import { useNavigationStore } from './stores/navigationStore'
import LoadingPage from './pages/LoadingPage'
import OnboardingPage from './pages/OnboardingPage'
import MapPage from './pages/MapPage'
import PlaceDetailPage from './components/PlaceDetailPage'
import { places } from './data/places'

export default function App() {
  const { page, selectedPlaceId, goTo } = useNavigationStore()

  if (page === 'loading') return <LoadingPage />
  if (page === 'onboarding') return <OnboardingPage />
  if (page === 'map') return <MapPage />

  const placeIndex = places.findIndex((p) => p.id === selectedPlaceId)
  const currentIndex = placeIndex === -1 ? 0 : placeIndex

  return (
    <PlaceDetailPage
      place={places[currentIndex]}
      currentIndex={currentIndex}
      total={places.length}
      onBack={() => goTo('map')}
      onPrev={() => goTo('detail', places[currentIndex - 1]?.id)}
      onNext={() => goTo('detail', places[currentIndex + 1]?.id)}
    />
  )
}
