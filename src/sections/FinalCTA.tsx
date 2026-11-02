import { Link } from 'react-router-dom'
import '../styles/cta.css'

export function FinalCTA() {
  return (
    <section id="start" className="site-section site-start" aria-labelledby="start-title">
      <div className="site-container">
        <div className="site-start__inner">
          <p className="site-eyebrow">Fueleo</p>
          <h2 id="start-title">Let&rsquo;s plan your actual meals.</h2>
          <p className="site-start__lede">
            Five short questions — goal, target weight, diet, and schedule — turn into a week of
            meals, portions, and a clear price. No payment happens here.
          </p>
          <div className="site-start__actions">
            <Link className="btn btn--primary btn--lg" to="/assessment">
              Build my plan
            </Link>
            <Link className="btn btn--ghost btn--lg" to="/how-it-works">
              Explore how it works
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}