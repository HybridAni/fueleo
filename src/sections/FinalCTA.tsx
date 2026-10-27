import { Link } from 'react-router-dom'
import '../styles/cta.css'

export function FinalCTA() {
  return (
    <section id="start" className="site-section site-start" aria-labelledby="start-title">
      <div className="site-container">
        <div className="site-start__inner">
          
          <h2 id="start-title">Your meals, planned around your life.</h2>
          <p className="site-start__lede">
            A few short questions about how you eat and live, and we&rsquo;ll show you a sample
            plan you can actually eat. Choose a plan and we handle the cooking.
          </p>
          <div className="site-start__actions">
            <Link className="btn btn--primary btn--lg" to="/assessment">
              Start the assessment
            </Link>
            <Link className="btn btn--ghost btn--lg" to="/how-it-works">
              See how it works
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}