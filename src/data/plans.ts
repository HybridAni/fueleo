/* --------------------------------------------------------------------------
   Subscription content for the plan page. No prices are defined.
   -------------------------------------------------------------------------- */

export type SubscriptionDuration = {
  months: string
  note: string
}

export const SUBSCRIPTION_DURATIONS: SubscriptionDuration[] = [
  { months: '1 month', note: 'Try the routine without a long commitment' },
  { months: '3 months', note: 'Enough time to build a consistent habit' },
  { months: '6 months', note: 'Carry a goal through a full season' },
  { months: '12 months', note: 'A full year of meals that match your life' },
]

export type PlanComparisonRow = {
  feature: string
  basic: string
  premium: string
}

export const PLAN_COMPARISON: PlanComparisonRow[] = [
  { feature: 'Structured meals & recommended portions', basic: 'Included', premium: 'Included' },
  { feature: 'Menu built around your diet & restrictions', basic: 'Included', premium: 'Included' },
  { feature: 'Adjust portion sizes meal by meal', basic: 'Not available', premium: 'Available' },
  {
    feature: 'Change the number or selection of meal slots',
    basic: 'Fixed at signup',
    premium: 'Anytime',
  },
  {
    feature: 'Super Flexibility',
    basic: '—',
    premium: 'Portions and slots follow your appetite',
  },
]