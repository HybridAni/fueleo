import { DIET_PREFERENCES } from '../data/assessment'
import { DEMO_MEALS, type MealItem } from '../data/demoMeals'
import '../styles/meals.css'

const labelFrom = <T extends { id: string; label: string }>(options: readonly T[], id: string) =>
  options.find((option) => option.id === id)?.label ?? ''

const FEATURED_IDS = ['chicken-curry', 'paneer-basmati', 'veg-grain-bowl']

export function OurMeals() {
  const featured = FEATURED_IDS.map((id) => DEMO_MEALS.find((meal) => meal.id === id)).filter(
    (meal): meal is MealItem => Boolean(meal),
  )
  const primary = featured[0]

  if (!primary) {
    return null
  }

  return (
    <section id="meals" className="site-section" aria-labelledby="meals-title">
      <div className="site-container">
        <header className="menu-head">
          <p className="site-eyebrow">The menu</p>
          <h2 id="meals-title">A short rotation, cooked properly.</h2>
          <p className="menu-head__lede">
            Balanced, protein-first, and lighter options each week — portioned to the plan, not
            to a template.
          </p>
        </header>

        <div className="menu-grid">
          <figure className="menu-feature">
            <img
              src={primary.img}
              alt={primary.alt ?? primary.name}
              width={800}
              height={600}
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              {primary.name} — {primary.portion}
            </figcaption>
          </figure>

          <ol className="menu-list">
            {featured.map((dish, index) => (
              <li className="menu-row" key={dish.id}>
                <span className="menu-row__index" aria-hidden="true">
                  0{index + 1}
                </span>
                <div className="menu-row__body">
                  <p className="menu-row__diet">
                    {labelFrom(DIET_PREFERENCES, dish.diet)} · {dish.portion}
                  </p>
                  <h3>{dish.name}</h3>
                  <p className="menu-row__desc">{dish.description}</p>
                  <p className="menu-row__macros">
                    {dish.kcal} kcal · {dish.proteinGrams} g protein · {dish.carbsGrams} g carbs ·
                    {dish.fatGrams} g fat
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <p className="site-note">
          Illustrative dishes from the current sample menu — not a live order menu, and not a
          medical prescription.
        </p>
      </div>
    </section>
  )
}