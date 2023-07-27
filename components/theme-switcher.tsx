'use client'

import { useEffect, useState } from 'react';
import styles from '../styles/theme-switcher.module.scss'


function ThemeSwitcher() {
  const [theme, setTheme] = useState<string>('light');


  useEffect(() => {
    if (theme === undefined) {
      const { matches: prefersDarkScheme } = window.matchMedia("(prefers-color-scheme: dark)");
      const toggle = document.getElementById('toggle') as HTMLInputElement
      if (!toggle) return
      toggle.checked = prefersDarkScheme
    }
  }, [theme]);

  const handleToggle = ({ target: { checked } }) => {
    const { documentElement: { style } } = document

    if (checked) {
      style.setProperty('--background', 'var(--_dark)')
      style.setProperty('--text', 'var(--_light)')
      setTheme('dark')
    } else {
      style.setProperty('--background', 'var(--_light)')
      style.setProperty('--text', 'var(--_dark)')
      setTheme('light')
    }
  }


  return (
    <form className={styles.form}>
      <input onChange={handleToggle} type="checkbox" name="night-toggle" id="toggle" />
      <label htmlFor="toggle">Toggle {theme} mode</label>
    </form>
  )
}
export default ThemeSwitcher;