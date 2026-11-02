/* --------------------------------------------------------------------------
   Subscription pricing — centralized INR rates for the Fueleo demo.
   Maintenance figures are provisional suggestions. All rates are monthly INR
   amounts keyed by plan tier, goal, and duration. Prices are illustrated by
   deriving them here — nothing is charged or activated.
   -------------------------------------------------------------------------- */

import type { SubscriptionDurationId, SubscriptionPlanId } from './plans'
import type { GoalId } from './assessment'

export const MONTHLY_RATE_INR: Record<
  SubscriptionPlanId,
  Record<GoalId, Record<SubscriptionDurationId, number>>
> = {
  basic: {
    'muscle-gain': { '1': 22000, '3': 20000, '6': 18000, '12': 15000 },
    'weight-loss': { '1': 18000, '3': 16000, '6': 14000, '12': 12000 },
    maintenance: { '1': 20000, '3': 18000, '6': 16000, '12': 13000 },
  },
  premium: {
    'muscle-gain': { '1': 30000, '3': 27000, '6': 25000, '12': 22000 },
    'weight-loss': { '1': 24000, '3': 21000, '6': 18000, '12': 16000 },
    maintenance: { '1': 27000, '3': 24000, '6': 22000, '12': 19000 },
  },
}

const DURATION_MONTHS: Record<SubscriptionDurationId, number> = {
  '1': 1,
  '3': 3,
  '6': 6,
  '12': 12,
}

export type PriceEstimate = {
  plan: SubscriptionPlanId
  goal: GoalId
  duration: SubscriptionDurationId
  durationMonths: number
  monthlyRate: number
  total: number
  referenceTotal: number
  savings: number
  savingsPercent: number
}

/** Full subscription price estimate for a goal + tier + duration, or null when
 *  the selection is incomplete/unknown. */
export function getPriceEstimate(
  goal: GoalId | '',
  plan: SubscriptionPlanId | null,
  duration: SubscriptionDurationId | null,
): PriceEstimate | null {
  if (goal === '' || !plan || !duration) return null
  const monthlyRate = MONTHLY_RATE_INR[plan]?.[goal]?.[duration]
  if (typeof monthlyRate !== 'number') return null

  const durationMonths = DURATION_MONTHS[duration]
  const total = monthlyRate * durationMonths

  const oneMonthRate = MONTHLY_RATE_INR[plan]?.[goal]?.['1']
  if (typeof oneMonthRate !== 'number') return null
  const referenceTotal = oneMonthRate * durationMonths
  const savings = Math.max(referenceTotal - total, 0)
  const savingsPercent = referenceTotal > 0 ? (savings / referenceTotal) * 100 : 0

  return {
    plan,
    goal,
    duration,
    durationMonths,
    monthlyRate,
    total,
    referenceTotal,
    savings,
    savingsPercent,
  }
}

/** Duration with the highest percentage saving for a goal + tier.
 *  One-month is excluded (its saving is zero by definition). */
export function getBestValueDuration(
  goal: GoalId | '',
  plan: SubscriptionPlanId | null,
): SubscriptionDurationId | null {
  if (goal === '' || !plan) return null
  const candidates: SubscriptionDurationId[] = ['3', '6', '12']
  let best: SubscriptionDurationId | null = null
  let bestPercent = -1
  for (const duration of candidates) {
    const estimate = getPriceEstimate(goal, plan, duration)
    if (estimate && estimate.savingsPercent > bestPercent) {
      bestPercent = estimate.savingsPercent
      best = duration
    }
  }
  return best
}

const inrFormatter = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 })

/** Format a whole-rupee amount with Indian digit grouping, e.g. ₹1,08,000. */
export function formatINR(amount: number): string {
  return `₹${inrFormatter.format(amount)}`
}