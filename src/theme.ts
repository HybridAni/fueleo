import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'fueleo-theme'

/**
 * Reads the theme already applied by the inline script in index.html (which
 * prefers the stored choice and falls back to the system preference), then
 * falls back to the system preference if the attribute is missing.
 */
function getInitialTheme(): Theme {
  const attribute =
    typeof document !== 'undefined'
      ? document.documentElement.getAttribute('data-theme')
      : null
  if (attribute === 'light' || attribute === 'dark') return attribute

  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark'
  }
  return 'light'
}

/**
 * Theme state for the app.
 * - Applies `data-theme` on the document root (drives all design tokens).
 * - Persists the user's explicit choice to localStorage.
 * - Follows live system preference changes until the user makes a choice.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // Storage may be unavailable (private mode etc.) — the theme still applies for the session.
    }
  }, [theme])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (event: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem(THEME_STORAGE_KEY) === null) {
          setTheme(event.matches ? 'dark' : 'light')
        }
      } catch {
        // Ignore storage errors; keep the current theme.
      }
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'))
  }, [])

  return { theme, toggleTheme }
}