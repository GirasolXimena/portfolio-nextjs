'use client'

import { useEffect, useRef, useState } from 'react';
import styles from '../styles/theme-switcher.module.scss'
import usePrefersDarkColorScheme from '../hooks/usePrefersDarkColorScheme';


function ThemeSwitcher() {
  const [theme, setTheme] = useState<string>('light');
  const toggle = useRef<HTMLInputElement>(null);

  
  const prefersDarkScheme = usePrefersDarkColorScheme();
  useEffect(() => {
    if(!toggle.current) return
    toggle.current.checked = prefersDarkScheme
  });

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
      <input ref={toggle} onChange={handleToggle} type="checkbox" name="night-toggle" id="toggle" />
      <label htmlFor="toggle">Toggle {theme} mode</label>
    </form>
  )
}
export default ThemeSwitcher;