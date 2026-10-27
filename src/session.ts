/* --------------------------------------------------------------------------
   In-memory demo session: carries the assessment draft and the chosen
   subscription between routes. Nothing here is persisted to storage or a
   server — refresh the page and it is gone (pages handle that with empty
   states).
   -------------------------------------------------------------------------- */

import { createContext, useContext } from 'react'
import type { AssessmentDraft } from './data/assessment'
import type { SubscriptionDurationId, SubscriptionPlanId } from './data/plans'

export type SubscriptionSelection = {
  plan: SubscriptionPlanId
  duration: SubscriptionDurationId
}

export type SessionValues = {
  draft: AssessmentDraft | null
  subscription: SubscriptionSelection | null
  setAssessment: (draft: AssessmentDraft) => void
  setSubscription: (selection: SubscriptionSelection | null) => void
}

export const SessionContext = createContext<SessionValues | null>(null)

export function useSession(): SessionValues {
  const value = useContext(SessionContext)
  if (!value) {
    throw new Error('useSession must be used within a SessionProvider')
  }
  return value
}