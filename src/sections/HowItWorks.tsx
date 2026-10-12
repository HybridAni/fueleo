import { Link } from 'react-router-dom'
import { steps } from '../data/meals'
import '../styles/how.css'

export function HowItWorks() {
  return (
    <section
      id="how"
      className="site-section site-section--tinted"
      aria-labelledby="how-title"
    >
      <div className="site-container">
        <div className="site-section-head">
          <p className="site-eyebrow">How it works</p>
          <h2 id="how-title">Your plan, started in three steps</h2>
          <p className="site-section-head__lede">
            The full journey covers everything from your profile to your delivered meals — here
            is the short version.
          </p>
        </div>
        <ol className="steps">
          {steps.map((step) => (
            <li className="step" key={step.num}>
              <span className="step__num">{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="how-teaser">
          <Link className="btn btn--secondary" to="/how-it-works">
            See the full journey
          </Link>
          <span className="how-teaser__note">
            Profile, plan, subscription, kitchen, and progress — in detail.
          </span>
        </div>
      </div>
    </section>
  )
}