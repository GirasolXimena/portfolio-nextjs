'use client'
import { useEffect, useState } from 'react';
import styles from '../styles/theme-switcher.module.scss'
import usePrefersDarkColorScheme from '../hooks/usePrefersDarkColorScheme';
import utilities from '../lib/util';

const { setCustomProperties } = utilities

function ThemeSwitcher() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const prefersDarkScheme = usePrefersDarkColorScheme();

  useEffect(() => {
    setIsDark(prefersDarkScheme)
  }, [prefersDarkScheme]);

  useEffect(() => {
    setCustomProperties({
      background: `var(--_${isDark ? 'dark' : 'light'})`,
      text: `var(--_${isDark ? 'light' : 'dark'})`,
    })
  }, [isDark])

  return (
    <form className={styles.form}>
      <input
        onChange={() => setIsDark(!isDark)}
        type="checkbox"
        name="dark-mode-toggle"
        id="toggle"
        checked={isDark}
      />
      <label htmlFor="toggle">
        Toggle {isDark ? 'light' : 'dark'} mode
      </label>
    </form>
  )
}
export default ThemeSwitcher;