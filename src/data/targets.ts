/* --------------------------------------------------------------------------
   Target estimation for the demo plan page.
   Transparent, deliberately simple method — clearly illustrative, never a
   medical prescription. Output is clamped to conservative guardrails.
   -------------------------------------------------------------------------- */

import type { ActivityId, AssessmentDraft, GoalId } from './assessment'

export const ACTIVITY_FACTOR: Record<ActivityId, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  'very-active': 1.9,
}

export const GOAL_ADJUSTMENT: Record<GoalId, number> = {
  'weight-loss': -400,
  'muscle-gain': 300,
  maintenance: 0,
}

/** Protein grams per kg of body weight, by goal. */
export const PROTEIN_PER_KG: Record<GoalId, number> = {
  'weight-loss': 1.8,
  'muscle-gain': 2,
  maintenance: 1.6,
}

export type TargetEstimate = {
  calories: number
  proteinGrams: number
  carbsGrams: number
  fatGrams: number
  proteinPct: number
  carbsPct: number
  fatPct: number
  weightBasisKg: number
  clampedToRange: boolean
  methodNote: string
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

export function estimateTargets(draft: AssessmentDraft): TargetEstimate | null {
  const age = Number(draft.age)
  const heightCm = Number(draft.heightCm)
  const currentWeightKg = Number(draft.currentWeightKg)
  const targetWeightKg = Number(draft.targetWeightKg)

  if (!draft.goal || !draft.activityLevel) return null
  const numbersValid = [age, heightCm, currentWeightKg, targetWeightKg].every(
    (value) => Number.isFinite(value) && value > 0,
  )
  if (!numbersValid) return null

  // Documented body-weight basis: two-thirds current weight, one-third target
  // weight. Conservative by design — energy needs and protein respond to the
  // destination weight without jumping straight to it, and never rely on the
  // target alone. Both validated weights are between 30 and 300 kg, so the
  // blend stays safely within the same range.
  const blendWeightKg = (2 * currentWeightKg + targetWeightKg) / 3

  // Mifflin-St Jeor with a neutral constant (average of the male/female variants),
  // adjusted by activity and then by goal.
  const bmr = 10 * blendWeightKg + 6.25 * heightCm - 5 * age - 78
  const maintenance = bmr * ACTIVITY_FACTOR[draft.activityLevel]
  const rawCalories = maintenance + GOAL_ADJUSTMENT[draft.goal]

  const minCalories = 1200
  const maxCalories = 3500
  const clampedToRange = rawCalories < minCalories || rawCalories > maxCalories
  const calories = Math.round(clamp(rawCalories, minCalories, maxCalories) / 10) * 10

  const proteinGrams = Math.round(clamp(blendWeightKg * PROTEIN_PER_KG[draft.goal], 60, 220))
  const fatGrams = Math.round(clamp((calories * 0.25) / 9, 30, 120))
  const carbsGrams = Math.round(Math.max((calories - proteinGrams * 4 - fatGrams * 9) / 4, 0))

  const proteinCal = proteinGrams * 4
  const fatCal = fatGrams * 9
  const carbsCal = Math.max(calories - proteinCal - fatCal, 0)
  const totalCal = proteinCal + fatCal + carbsCal

  const proteinPct = Math.round((proteinCal / totalCal) * 100)
  const fatPct = Math.round((fatCal / totalCal) * 100)
  const carbsPct = 100 - proteinPct - fatPct

  const adjustment = GOAL_ADJUSTMENT[draft.goal]
  const weightBasisKg = Math.round(blendWeightKg * 10) / 10
  const methodNote = [
    'Mifflin-St Jeor (neutral constant)',
    `weight basis ${weightBasisKg} kg (current ${currentWeightKg} kg + target ${targetWeightKg} kg)`,
    'activity factor ' + ACTIVITY_FACTOR[draft.activityLevel],
    `goal adjustment ${adjustment >= 0 ? '+' : ''}${adjustment} kcal`,
    clampedToRange ? `clamped to ${minCalories}–${maxCalories} kcal` : 'within normal bounds',
  ].join(' · ')

  return {
    calories,
    proteinGrams,
    carbsGrams,
    fatGrams,
    proteinPct,
    carbsPct,
    fatPct,
    weightBasisKg,
    clampedToRange,
    methodNote,
  }
}