import { basicFeatures, premiumFeatures } from '../data/meals'
import { CheckIcon } from '../components/icons'
import { formatINR, getFromPriceInr } from '../data/pricing'
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
            Basic keeps structured meals and recommended portions. Premium adds Super Flexibility —
            adjust portion sizes and meal slots as your appetite changes.
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
            <p className="plan__price">
              From <strong>{formatINR(getFromPriceInr('basic'))}</strong>
              <span> / month</span>
            </p>
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
            <header className="plan__head">
              <p className="plan__kicker">Super Flexibility</p>
              <h3>Premium</h3>
              <p className="plan__desc">
                Everything in Basic, plus portions and meal slots that follow your appetite and
                routine.
              </p>
            </header>
            <p className="plan__price">
              From <strong>{formatINR(getFromPriceInr('premium'))}</strong>
              <span> / month</span>
            </p>
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
          Demo INR pricing — rates depend on your goal and duration, so the &ldquo;from&rdquo;
          price above is the lowest monthly rate across goals. No order, payment, or delivery
          happens from this page.
        </p>
      </div>
    </section>
  )
}