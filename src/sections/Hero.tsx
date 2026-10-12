import { Link } from 'react-router-dom'
import { IMAGES } from '../data/meals'
import { CheckIcon } from '../components/icons'
import '../styles/hero.css'

export function Hero() {
  return (
    <section id="top" className="site-hero" aria-labelledby="hero-title">
      <div className="site-container site-hero__grid">
        <div className="site-hero__copy">
          <p className="site-eyebrow">Personalized nutrition · delivered meals</p>
          <h1 id="hero-title">Eating well should fit your life.</h1>
          <p className="site-hero__lede">
            Fueleo plans your meals around your goals, the foods you love, and the rhythm of your
            actual days — then delivers them cooked and ready.
          </p>
          <div className="site-hero__actions">
            <Link className="btn btn--primary btn--lg" to="/assessment">
              Build my plan
            </Link>
            <Link className="btn btn--secondary btn--lg" to="/how-it-works">
              How it works
            </Link>
          </div>
          <ul className="site-hero__notes">
            <li>
              <CheckIcon />
              Plans flex around foods you already enjoy
            </li>
            <li>
              <CheckIcon />
              Freshly cooked, delivered on your schedule
            </li>
          </ul>
        </div>
        <figure className="site-hero__media">
          <img
            src={IMAGES.hero}
            alt="Butter chicken curry served with basmati rice"
            width={1200}
            height={900}
            fetchPriority="high"
            decoding="async"
          />
          <figcaption className="site-hero__caption">
            This week — butter chicken with basmati
          </figcaption>
        </figure>
      </div>
    </section>
  )
}