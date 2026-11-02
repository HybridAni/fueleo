import { Link } from 'react-router-dom'
import { IMAGES } from '../data/meals'
import '../styles/hero.css'

export function Hero() {
  return (
    <section id="top" className="site-hero" aria-labelledby="hero-title">
      <div className="site-container site-hero__grid">
        <div className="site-hero__copy">
          <p className="site-eyebrow">Personalized nutrition · planned weekly</p>
          <h1 id="hero-title">Eating well should fit your life.</h1>
          <p className="site-hero__lede">
            Fueleo builds a week of meals around your goal, your target weight, the foods you
            like, and the pace of your days — then cooks it and delivers it ready.
          </p>
          <div className="site-hero__actions">
            <Link className="btn btn--primary btn--lg" to="/assessment">
              Build my plan
            </Link>
            <Link className="btn btn--secondary btn--lg" to="/how-it-works">
              Explore how it works
            </Link>
          </div>
          <p className="site-hero__note">
            Plans adapt to your goal, diet, restrictions, and meal schedule. Demo pricing in INR —
            nothing is charged from this prototype.
          </p>
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
            Butter chicken with basmati — one dish from the current rotation.
          </figcaption>
        </figure>
      </div>
    </section>
  )
}