import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useTheme } from './theme'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { LandingPage } from './pages/LandingPage'
import { HowItWorksPage } from './pages/HowItWorksPage'
import { AssessmentPage } from './pages/AssessmentPage'
import { PlanPage } from './pages/PlanPage'
import { SubscriptionPage } from './pages/SubscriptionPage'
import { DashboardPage } from './pages/DashboardPage'
import { SessionContext, type SessionValues, type SubscriptionSelection } from './session'
import type { AssessmentDraft } from './data/assessment'
import './styles/base.css'

/* In-memory session (assessment + subscription). Refreshing loses it — pages
   handle the missing-data case with intentional empty states. */
function SessionProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<AssessmentDraft | null>(null)
  const [subscription, setSubscription] = useState<SubscriptionSelection | null>(null)
  const value = useMemo<SessionValues>(
    () => ({ draft, subscription, setAssessment: setDraft, setSubscription }),
    [draft, subscription],
  )
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}

function SiteShell() {
  const { theme, toggleTheme } = useTheme()
  const { pathname, hash } = useLocation()

  // Scroll to the anchor target after navigation; otherwise back to the top.
  // CSS scroll-behavior (and the reduced-motion override) in index.css apply.
  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        target.scrollIntoView()
        return
      }
    }
    window.scrollTo({ top: 0, left: 0 })
  }, [pathname, hash])

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main id="main">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/plan" element={<PlanPage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <SessionProvider>
        <SiteShell />
      </SessionProvider>
    </BrowserRouter>
  )
}

export default App