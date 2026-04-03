import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import RootPage from './pages/user/RootPage'
import OnboardingPage from './pages/user/OnboardingPage'
import MapPage from './pages/user/MapPage'
import MapDetailPage from './pages/user/MapDetailPage'
import MapListenPage from './pages/user/MapListenPage'
// import MapDetailPageEnd from './pages/user/MapDetailPageEnd'
import CompletePage from './pages/user/CompletePage'
import SeniorRecordPage from './pages/senior/SeniorRecordPage'
import SeniorRegisterPage from './pages/senior/SeniorRegisterPage'
import SeniorEnd from './pages/senior/SeniorEnd'
import TributePage from './pages/user/TributePage'
import TributeFeedPage from './pages/user/TributeFeedPage'
import SeniorPage from './pages/senior/SeniorPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/map/:siteId" element={<MapDetailPage />} />
        <Route path="/map/:siteId/listen" element={<MapListenPage />} />
        {/* <Route path="/map/:siteId/end" element={<MapDetailPageEnd />} /> */}
        <Route path="/complete" element={<CompletePage />} />
        <Route path="/tribute" element={<TributePage />} />
        <Route path="/tribute/feed" element={<TributeFeedPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/senior/register" element={<SeniorRegisterPage />} />
        <Route path="/senior/record" element={<SeniorRecordPage />} />
        <Route path="/senior/end" element={<SeniorEnd />} />
        <Route path="/seniorpage" element={<SeniorPage />} />
      </Routes>
    </BrowserRouter>
  )
}
