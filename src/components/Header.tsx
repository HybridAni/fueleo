import { Link } from 'react-router-dom'
import { type Theme } from '../theme'
import { BrandMark, MoonIcon, SunIcon } from './icons'
import '../styles/header.css'

function ThemeToggle({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      className="theme-toggle"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={onToggle}
    >
      {isDark ? <MoonIcon /> : <SunIcon />}
      <span>{isDark ? 'Dark' : 'Light'}</span>
    </button>
  )
}

export function Header({
  theme,
  onToggleTheme,
}: {
  theme: Theme
  onToggleTheme: () => void
}) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="site-brand" aria-label="Fueleo — home">
          <BrandMark />
          <span className="site-brand__name">Fueleo</span>
        </Link>
        <nav className="site-nav" aria-label="Primary">
          <Link to="/how-it-works">How it works</Link>
          <Link to="/#meals">Our meals</Link>
          <Link to="/#plans">Plans</Link>
        </nav>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  )
}