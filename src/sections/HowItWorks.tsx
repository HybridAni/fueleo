import { Link } from 'react-router-dom'
import { steps } from '../data/meals'
import '../styles/how.css'

export function HowItWorks() {
  return (
    <section id="how" className="site-section" aria-labelledby="how-title">
      <div className="site-container">
        <header className="how-head">
          <div>
            <p className="site-eyebrow">How it works</p>
            <h2 id="how-title">From your answers to a week of food.</h2>
            <p className="how-head__lede">
              No nutrition homework. You answer five things; the plan, portions, and pricing do
              the rest.
            </p>
          </div>
          <Link className="btn btn--secondary" to="/how-it-works">
            See the full journey
          </Link>
        </header>
        <ol className="steps">
          {steps.map((step) => (
            <li className="step" key={step.num}>
              <span className="step__num">{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}