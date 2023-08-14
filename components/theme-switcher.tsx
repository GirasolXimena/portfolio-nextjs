import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import styles from '../styles/theme-switcher.module.scss';
import iconStyles from '../styles/theme-icon.module.scss';
import ThreeStateCheckbox from './three-state-checkbox';
import ThemeIcon from './theme-icon';

function ThemeSwitcher({ segment }) {
  const isTransitioning = useRef(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [checked, setChecked] = useState(theme === 'system' ? null : theme === 'dark');

  // Avoid hydration mismatch by only rendering form when mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  const onChange = (checked: Boolean | null) => {
    // prevent double clicks
    if (isTransitioning.current) return
    let theme = ''
    if (checked === null) {
      theme ='system';
    } else if (checked) {
      theme = 'dark';
    } else {
      theme  = 'light';
    }

    const bodyElem = document.body;

    const handleTransitionEnd = (event) => {
      if (event.propertyName === 'opacity' && event.srcElement.nodeName === 'BODY') {
        setTheme(theme);
        bodyElem.removeEventListener('transitionend', handleTransitionEnd);
        bodyElem.classList.remove('transitioning');
        isTransitioning.current = false
      }
    };
    isTransitioning.current = true
    bodyElem.classList.add('transitioning');
    bodyElem.addEventListener('transitionend', handleTransitionEnd);
  }

  return mounted && (
    <div className={`${styles.container} ${styles[segment]}`}>
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
    </div>
  );
}

export default ThemeSwitcher;
