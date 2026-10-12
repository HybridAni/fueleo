/* --------------------------------------------------------------------------
   Nutrition assessment — types, options, and validation helpers.
   Frontend prototype only: answers are never persisted or sent anywhere.
   -------------------------------------------------------------------------- */

export type GoalId = 'weight-loss' | 'muscle-gain' | 'maintenance'
export type ActivityId = 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active'
export type DietId = 'vegetarian' | 'eggetarian' | 'non-vegetarian'
export type RestrictionId =
  | 'dairy'
  | 'gluten'
  | 'nuts'
  | 'peanuts'
  | 'soy'
  | 'shellfish'
  | 'other'
export type MealSlotId = 'breakfast' | 'brunch' | 'lunch' | 'snacks' | 'dinner' | 'late-night'

export type AssessmentDraft = {
  age: string
  heightCm: string
  currentWeightKg: string
  activityLevel: ActivityId | ''
  targetWeightKg: string
  goal: GoalId | ''
  dietPreference: DietId | ''
  restrictions: RestrictionId[]
  otherRestrictions: string
  mealSlots: MealSlotId[]
}

export const EMPTY_DRAFT: AssessmentDraft = {
  age: '',
  heightCm: '',
  currentWeightKg: '',
  activityLevel: '',
  targetWeightKg: '',
  goal: '',
  dietPreference: '',
  restrictions: [],
  otherRestrictions: '',
  mealSlots: [],
}

export const STEP_TITLES = [
  'About you',
  'Your goal',
  'Food preferences',
  'Meal schedule',
  'Review',
] as const

export const ACTIVITY_LEVELS: { id: ActivityId; label: string; hint: string }[] = [
  { id: 'sedentary', label: 'Mostly sitting', hint: 'Desk work, little walking or exercise' },
  { id: 'light', label: 'Lightly active', hint: 'Short walks most days, light activity' },
  { id: 'moderate', label: 'Moderately active', hint: 'Regular exercise 3–4 days a week' },
  { id: 'active', label: 'Active', hint: 'Exercise most days, physical job or sport' },
  { id: 'very-active', label: 'Very active', hint: 'Daily intense training or heavy physical work' },
]

export const GOALS: { id: GoalId; label: string; description: string }[] = [
  {
    id: 'weight-loss',
    label: 'Weight loss',
    description: 'A gradual, sustainable calorie deficit built around foods you already enjoy.',
  },
  {
    id: 'muscle-gain',
    label: 'Muscle gain',
    description: 'Higher protein and portions sized to support training and recovery.',
  },
  {
    id: 'maintenance',
    label: 'Weight maintenance',
    description: 'A steady plan matched to your current energy needs.',
  },
]

export const DIET_PREFERENCES: { id: DietId; label: string; hint: string }[] = [
  { id: 'vegetarian', label: 'Vegetarian', hint: 'No meat, poultry, fish, or eggs' },
  { id: 'eggetarian', label: 'Eggetarian', hint: 'Vegetarian plus eggs' },
  { id: 'non-vegetarian', label: 'Non-vegetarian', hint: 'Includes meat, poultry, or fish' },
]

export const RESTRICTIONS: { id: RestrictionId; label: string }[] = [
  { id: 'dairy', label: 'Dairy' },
  { id: 'gluten', label: 'Gluten' },
  { id: 'nuts', label: 'Tree nuts' },
  { id: 'peanuts', label: 'Peanuts' },
  { id: 'soy', label: 'Soy' },
  { id: 'shellfish', label: 'Shellfish' },
]

export const MEAL_SLOTS: { id: MealSlotId; label: string; optional: boolean }[] = [
  { id: 'breakfast', label: 'Breakfast', optional: false },
  { id: 'brunch', label: 'Brunch', optional: false },
  { id: 'lunch', label: 'Lunch', optional: false },
  { id: 'snacks', label: 'Snacks', optional: false },
  { id: 'dinner', label: 'Dinner', optional: false },
  { id: 'late-night', label: 'Late-night snack', optional: true },
]

export type StepField =
  | 'age'
  | 'heightCm'
  | 'currentWeightKg'
  | 'activityLevel'
  | 'targetWeightKg'
  | 'goal'
  | 'dietPreference'
  | 'otherRestrictions'
  | 'mealSlots'

export type StepErrors = Partial<Record<StepField, string>>

const inRange = (value: string, min: number, max: number): boolean => {
  const parsed = Number(value)
  return value.trim() !== '' && Number.isFinite(parsed) && parsed >= min && parsed <= max
}

export function validateStep(step: number, draft: AssessmentDraft): StepErrors {
  const errors: StepErrors = {}

  if (step === 0) {
    if (draft.age.trim() === '') errors.age = 'Please enter your age.'
    else if (!inRange(draft.age, 14, 100)) errors.age = 'Enter an age between 14 and 100.'
    if (draft.heightCm.trim() === '') errors.heightCm = 'Please enter your height.'
    else if (!inRange(draft.heightCm, 100, 250))
      errors.heightCm = 'Enter a height between 100 and 250 cm.'
    if (draft.currentWeightKg.trim() === '') errors.currentWeightKg = 'Please enter your current weight.'
    else if (!inRange(draft.currentWeightKg, 30, 300))
      errors.currentWeightKg = 'Enter a weight between 30 and 300 kg.'
    if (draft.activityLevel === '') errors.activityLevel = 'Pick the option closest to your typical week.'
    if (draft.targetWeightKg.trim() !== '' && !inRange(draft.targetWeightKg, 30, 300)) {
      errors.targetWeightKg = 'Target weight must be between 30 and 300 kg.'
    }
  }

  if (step === 1) {
    if (draft.goal === '') errors.goal = 'Choose the goal you want the plan to work toward.'
  }

  if (step === 2) {
    if (draft.dietPreference === '') errors.dietPreference = 'Choose a diet preference.'
    if (draft.restrictions.includes('other') && draft.otherRestrictions.trim() === '') {
      errors.otherRestrictions = 'Describe your other restrictions below.'
    }
  }

  if (step === 3 && draft.mealSlots.length === 0) {
    errors.mealSlots = 'Choose at least one meal slot.'
  }

  return errors
}