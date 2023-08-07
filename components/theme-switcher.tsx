import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import styles from '../styles/theme-switcher.module.scss';
import iconStyles from '../styles/theme-icon.module.scss';
import ThreeStateCheckbox from './three-state-checkbox';
import ThemeIcon from './theme-icon';

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
    <ThreeStateCheckbox
      className={`${styles.button} ${iconStyles.toggle}`}
      onChange={onChange}
      name="dark-mode-toggle"
      id="toggle"
      checked={checked}
      label={theme}
    >
      <ThemeIcon />
    </ThreeStateCheckbox>
  );
}

export default ThemeSwitcher;
