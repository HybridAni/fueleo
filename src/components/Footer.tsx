import { Link } from 'react-router-dom'
import { BrandMark } from './icons'
import '../styles/footer.css'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="site-footer__inner">
          <Link to="/" className="site-brand" aria-label="Fueleo — home">
            <BrandMark />
            <span className="site-brand__name">Fueleo</span>
          </Link>
          <nav className="site-footer__nav" aria-label="Footer">
            <Link to="/how-it-works">How it works</Link>
            <Link to="/#meals">Our meals</Link>
            <Link to="/#plans">Plans</Link>
          </nav>
        </div>
        <p className="site-footer__meta">
          Fueleo is a college entrepreneurship prototype. All dishes shown are illustrative
          examples, not medical prescriptions.
        </p>
      </div>
    </footer>
  )
}