import { basicFeatures, premiumFeatures } from '../data/meals'
import { CheckIcon } from '../components/icons'
import '../styles/plans.css'

export function Plans() {
  return (
    <section
      id="plans"
      className="site-section site-section--tinted"
      aria-labelledby="plans-title"
    >
      <div className="site-container">
        <div className="site-section-head">
          <p className="site-eyebrow">Plans</p>
          <h2 id="plans-title">Two ways to subscribe</h2>
          <p className="site-section-head__lede">
            Start with everyday structure, or take full flexibility from day one. Both run as
            subscriptions of one to twelve months, with delivery matched to your meal slots.
          </p>
        </div>
        <div className="plans">
          <article className="plan">
            <header className="plan__head">
              <p className="plan__kicker">Everyday structure</p>
              <h3>Basic</h3>
              <p className="plan__desc">
                A structured weekly menu with recommended portions — the simple way to eat
                consistently.
              </p>
            </header>
            <ul className="plan__features">
              {basicFeatures.map((feature) => (
                <li key={feature}>
                  <CheckIcon />
                  {feature}
                </li>
              ))}
            </ul>
            <a className="btn btn--secondary" href="#start">
              Choose Basic
            </a>
          </article>

          <article className="plan plan--premium">
            <span className="badge badge--accent plan__badge">Super Flexibility</span>
            <header className="plan__head">
              <p className="plan__kicker">Adapts to your appetite</p>
              <h3>Premium</h3>
              <p className="plan__desc">
                Everything in Basic, plus the freedom to change how much and how often you eat —
                day to day.
              </p>
            </header>
            <ul className="plan__features">
              {premiumFeatures.map((feature) => (
                <li key={feature}>
                  <CheckIcon />
                  {feature}
                </li>
              ))}
            </ul>
            <p className="plan__flex">
              Super Flexibility: portions and meal slots follow your week — a light lunch before a
              big dinner, a bigger serving after heavy training.
            </p>
            <a className="btn btn--primary" href="#start">
              Choose Premium
            </a>
          </article>
        </div>
        <p className="site-note">
          Subscription pricing is being finalized for the beta menu — no figures on this page are
          quotes.
        </p>
      </div>
    </section>
  )
}