import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import AppLayout from './layouts/AppLayout.jsx'
import LandingPage from './pages/LandingPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import AnalysisPage from './pages/AnalysisPage.jsx'
import GraphPage from './pages/GraphPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import { api } from './services/api.js'

const ProtectedRoute = () => {
  return api.isAuthenticated() ? <AppLayout /> : <Navigate to="/login" replace />
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/graph" element={<GraphPage />} />
      </Route>
      {/* Catch-all redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
