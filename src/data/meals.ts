/* --------------------------------------------------------------------------
   Landing-page content and image sources.
   Image URLs are centralized here so they can be swapped in one place.
   -------------------------------------------------------------------------- */

export const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1200&h=900&q=80',
  paneerBowl:
    'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&h=600&q=80',
  chickenCurry:
    'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&h=600&q=80',
  vegetableBowl:
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&h=600&q=80',
  chickenTikka:
    'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&h=600&q=80',
  saladBowl:
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&h=600&q=80',
  frenchToast:
    'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=800&h=600&q=80',
  pancakes:
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&h=600&q=80',
}

export type Step = {
  num: string
  title: string
  text: string
}

export const steps: Step[] = [
  {
    num: '01',
    title: 'Tell us about yourself',
    text: 'A short intro, not a drill. Your goals, the foods you love, the ones you skip, and the shape of a normal week.',
  },
  {
    num: '02',
    title: 'Get a plan tailored to you',
    text: 'We balance protein, portions, and variety around your goal and routine, then shape a full week of real meals.',
  },
  {
    num: '03',
    title: 'Choose meals, slots, and length',
    text: 'Pick the meal slots you want covered and a subscription length of one to twelve months — then we handle the cooking and the delivery.',
  },
]

export type Meal = {
  tag: string
  name: string
  description: string
  img: string
  alt: string
}

export const meals: Meal[] = [
  {
    tag: 'Balanced · Indian',
    name: 'Paneer & basmati bowl',
    description:
      'Roasted paneer in a light tomato masala over basmati, with sautéed greens and a spoon of cooling curd.',
    img: IMAGES.paneerBowl,
    alt: 'An Indian curry in a metal bowl beside a bowl of rice',
  },
  {
    tag: 'Protein-focused',
    name: 'Chicken curry & rice',
    description:
      'Tender chicken simmered in a spiced curry, served with basmati and roasted seasonal vegetables.',
    img: IMAGES.chickenCurry,
    alt: 'Chicken curry served in a steel bowl',
  },
  {
    tag: 'Lighter option',
    name: 'Roasted vegetable bowl',
    description:
      'A bright bowl of leafy greens, roasted vegetables, and grains with a lemon-herb dressing.',
    img: IMAGES.vegetableBowl,
    alt: 'A fresh bowl of roasted vegetables and grains',
  },
]

export const basicFeatures: string[] = [
  'Weekly menu built around your goals and preferences',
  'Recommended portions for balanced meals',
  'Freshly cooked, delivered on your schedule',
]

export const premiumFeatures: string[] = [
  'Everything in Basic',
  'Portion sizes you can adjust meal by meal',
  'Meal slots that flex with your routine',
  'Swap dishes anytime before the daily cutoff',
]