import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import styles from '../styles/theme-switcher.module.scss';
import ThreeStateCheckbox from './three-state-checkbox';

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [checked, setChecked] = useState(theme === 'system' ? null : theme === 'dark');

  // Avoid hydration mismatch by only rendering form when mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle theme change
  const onChange = (checked) => {
    if (checked === null) {
      setTheme('system');
    } else if (checked) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
    setChecked(checked);
  };

  return mounted && (
    <form className={styles.form}>
      <ThreeStateCheckbox
        onChange={onChange}
        name="dark-mode-toggle"
        id="toggle"
        checked={checked}
      />
      <label data-theme={theme} htmlFor="toggle">
        {theme}
      </label>
    </form>
  );
}

export default ThemeSwitcher;
