/* --------------------------------------------------------------------------
   Small curated demo meal catalog + conservative filtering for the plan page.
   Meals are tagged with known intersections. A missing tag never means a meal
   is allergy-safe; custom ("other") restrictions cannot be verified and block
   every suggestion.
   -------------------------------------------------------------------------- */

import { IMAGES } from './meals'
import type { AssessmentDraft, DietId, MealSlotId, RestrictionId } from './assessment'

export type MealDiet = 'vegetarian' | 'eggetarian' | 'non-vegetarian'

export type MealItem = {
  id: string
  name: string
  description: string
  img?: string
  alt?: string
  slots: MealSlotId[]
  diet: MealDiet
  contains: RestrictionId[]
  portion: string
  kcal: number
  proteinGrams: number
  carbsGrams: number
  fatGrams: number
}

export const DEMO_MEALS: MealItem[] = [
  {
    id: 'paneer-basmati',
    name: 'Paneer & basmati bowl',
    description: 'Roasted paneer in a light tomato masala over basmati, with sautéed greens.',
    img: IMAGES.paneerBowl,
    alt: 'An Indian curry in a metal bowl beside a bowl of rice',
    slots: ['lunch', 'dinner'],
    diet: 'vegetarian',
    contains: ['dairy'],
    portion: '1 bowl · 420 g',
    kcal: 620,
    proteinGrams: 32,
    carbsGrams: 74,
    fatGrams: 20,
  },
  {
    id: 'veg-grain-bowl',
    name: 'Roasted vegetable & grain bowl',
    description: 'Leafy greens, roasted vegetables, and grains with a lemon-herb dressing.',
    img: IMAGES.vegetableBowl,
    alt: 'A fresh bowl of roasted vegetables and grains',
    slots: ['brunch', 'lunch', 'snacks'],
    diet: 'vegetarian',
    contains: [],
    portion: '1 bowl · 380 g',
    kcal: 420,
    proteinGrams: 13,
    carbsGrams: 58,
    fatGrams: 15,
  },
  {
    id: 'fresh-salad',
    name: 'Fresh salad bowl',
    description: 'Crisp greens, vegetables, and seeds with a light vinaigrette.',
    img: IMAGES.saladBowl,
    alt: 'A colorful fresh salad bowl',
    slots: ['lunch', 'snacks'],
    diet: 'vegetarian',
    contains: ['nuts'],
    portion: '1 bowl · 300 g',
    kcal: 310,
    proteinGrams: 9,
    carbsGrams: 32,
    fatGrams: 16,
  },
  {
    id: 'chicken-curry',
    name: 'Chicken curry & rice',
    description: 'Tender chicken simmered in a spiced curry, served with basmati.',
    img: IMAGES.chickenCurry,
    alt: 'Chicken curry served in a steel bowl',
    slots: ['lunch', 'dinner'],
    diet: 'non-vegetarian',
    contains: ['dairy'],
    portion: '1 box · 450 g',
    kcal: 640,
    proteinGrams: 42,
    carbsGrams: 70,
    fatGrams: 21,
  },
  {
    id: 'butter-chicken',
    name: 'Butter chicken with basmati',
    description: 'Slow-simmered butter chicken with basmati and a side of greens.',
    img: IMAGES.hero,
    alt: 'Butter chicken curry served with basmati rice',
    slots: ['dinner'],
    diet: 'non-vegetarian',
    contains: ['dairy'],
    portion: '1 box · 470 g',
    kcal: 700,
    proteinGrams: 40,
    carbsGrams: 76,
    fatGrams: 26,
  },
  {
    id: 'chicken-tikka-masala',
    name: 'Chicken tikka masala & rice',
    description: 'Charred chicken in a creamy tomato masala, served with basmati.',
    img: IMAGES.chickenTikka,
    alt: 'Chicken tikka masala served with rice',
    slots: ['dinner'],
    diet: 'non-vegetarian',
    contains: ['dairy'],
    portion: '1 box · 460 g',
    kcal: 690,
    proteinGrams: 46,
    carbsGrams: 64,
    fatGrams: 28,
  },
  {
    id: 'french-toast',
    name: 'French toast with berries',
    description: 'Thick-cut bread soaked in egg, griddled, and topped with fresh berries.',
    img: IMAGES.frenchToast,
    alt: 'French toast topped with berries',
    slots: ['breakfast', 'brunch'],
    diet: 'eggetarian',
    contains: ['dairy', 'gluten'],
    portion: '2 slices · 240 g',
    kcal: 480,
    proteinGrams: 14,
    carbsGrams: 62,
    fatGrams: 19,
  },
  {
    id: 'buttermilk-pancakes',
    name: 'Buttermilk pancakes',
    description: 'Fluffy buttermilk pancakes with a light knob of butter and maple.',
    img: IMAGES.pancakes,
    alt: 'Fluffy pancakes stacked with butter',
    slots: ['breakfast', 'brunch'],
    diet: 'eggetarian',
    contains: ['dairy', 'gluten'],
    portion: '3 pancakes · 260 g',
    kcal: 520,
    proteinGrams: 13,
    carbsGrams: 76,
    fatGrams: 18,
  },
]

export type SlotMenu = {
  slot: MealSlotId
  meals: MealItem[]
  blockedByOtherRestriction: boolean
}

const dietAllows = (meal: MealItem, diet: DietId | ''): boolean => {
  if (diet === '') return true
  if (diet === 'non-vegetarian') return true
  if (diet === 'eggetarian') return meal.diet !== 'non-vegetarian'
  return meal.diet === 'vegetarian'
}

const restrictionsAllow = (meal: MealItem, draft: AssessmentDraft): boolean => {
  // Custom ("other") restrictions cannot be verified against these tags.
  if (draft.restrictions.includes('other')) return false
  return !meal.contains.some((tag) => draft.restrictions.includes(tag))
}

export function buildSlotMenus(draft: AssessmentDraft): SlotMenu[] {
  const allowed = DEMO_MEALS.filter(
    (meal) => dietAllows(meal, draft.dietPreference) && restrictionsAllow(meal, draft),
  )
  return draft.mealSlots.map((slot) => ({
    slot,
    meals: allowed.filter((meal) => meal.slots.includes(slot)),
    blockedByOtherRestriction: draft.restrictions.includes('other'),
  }))
}