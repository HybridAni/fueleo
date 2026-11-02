import { Hero } from '../sections/Hero'
import { OurMeals } from '../sections/OurMeals'
import { Personalization } from '../sections/Personalization'
import { HowItWorks } from '../sections/HowItWorks'
import { Plans } from '../sections/Plans'
import { FinalCTA } from '../sections/FinalCTA'

export function LandingPage() {
  return (
    <>
      <Hero />
      <OurMeals />
      <Personalization />
      <HowItWorks />
      <Plans />
      <FinalCTA />
    </>
  )
}