import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import RootPage from './pages/user/RootPage'
import OnboardingPage from './pages/user/OnboardingPage'
import MapPage from './pages/user/MapPage'
import MapDetailPage from './pages/user/MapDetailPage'
import MapListenPage from './pages/user/MapListenPage'
import CompletePage from './pages/user/CompletePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/map/:siteId" element={<MapDetailPage />} />
        <Route path="/map/:siteId/listen" element={<MapListenPage />} />
        <Route path="/complete" element={<CompletePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
