import { Hero } from '../sections/Hero'
import { HowItWorks } from '../sections/HowItWorks'
import { OurMeals } from '../sections/OurMeals'
import { Plans } from '../sections/Plans'
import { FinalCTA } from '../sections/FinalCTA'

export function LandingPage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <OurMeals />
      <Plans />
      <FinalCTA />
    </>
  )
}