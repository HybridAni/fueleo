import { meals } from '../data/meals'
import '../styles/meals.css'

export function OurMeals() {
  return (
    <section id="meals" className="site-section" aria-labelledby="meals-title">
      <div className="site-container">
        <div className="site-section-head">
          <p className="site-eyebrow">Our meals</p>
          <h2 id="meals-title">Real food, planned in advance</h2>
          <p className="site-section-head__lede">
            A rotating menu of home-style dishes — with balanced, protein-first, and lighter
            options every single week.
          </p>
        </div>
        <div className="meals">
          {meals.map((meal) => (
            <article className="meal" key={meal.name}>
              <div className="meal__media">
                <img
                  src={meal.img}
                  alt={meal.alt}
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="meal__body">
                <span className="badge badge--accent">{meal.tag}</span>
                <h3>{meal.name}</h3>
                <p>{meal.description}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="site-note">
          Illustrative examples of the kinds of dishes our rotating menu includes — flexible
          guidance, not a medical prescription.
        </p>
      </div>
    </section>
  )
}