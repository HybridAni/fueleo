/* --------------------------------------------------------------------------
   Subscription content for the plan/subscription flow. No prices are defined.
   -------------------------------------------------------------------------- */

export type SubscriptionPlanId = 'basic' | 'premium'
export type SubscriptionDurationId = '1' | '3' | '6' | '12'

export type SubscriptionPlan = {
  id: SubscriptionPlanId
  name: string
  tagline: string
  description: string
  features: string[]
}

export const PLANS: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    tagline: 'Everyday structure',
    description:
      'A structured weekly menu with recommended portions — the simple way to eat consistently.',
    features: [
      'Structured meals with recommended portions',
      'Menu built around your diet and restrictions',
      'Meal slots chosen at signup',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'Super Flexibility',
    description:
      'Everything in Basic, plus the freedom to adjust portion sizes and meal slots as your appetite and routine shift.',
    features: [
      'Adjust portion sizes meal by meal',
      'Change the number or selection of meal slots anytime',
      'Super Flexibility — portions and slots follow your appetite',
    ],
  },
]

export type SubscriptionDuration = {
  id: SubscriptionDurationId
  months: string
  note: string
}

export const SUBSCRIPTION_DURATIONS: SubscriptionDuration[] = [
  { id: '1', months: '1 month', note: 'Try the routine without a long commitment' },
  { id: '3', months: '3 months', note: 'Enough time to build a consistent habit' },
  { id: '6', months: '6 months', note: 'Carry a goal through a full season' },
  { id: '12', months: '12 months', note: 'A full year of meals that match your life' },
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