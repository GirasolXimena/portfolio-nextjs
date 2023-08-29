'use client'
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import styles from '../styles/theme-switcher.module.scss';
import iconStyles from '../styles/theme-icon.module.scss';
import ThreeStateCheckbox from './three-state-checkbox';
import ThemeIcon from './theme-icon';
import usePaletteContext from 'hooks/usePaletteContext';
import { animateProperties } from 'lib/util';
import { useUpdateEffect } from 'usehooks-ts';

function ThemeSwitcher({ segment }) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { currentPalette } = usePaletteContext();
  const currentTheme = useRef(resolvedTheme);
  const [mounted, setMounted] = useState(false);

  const animateTheme = useCallback(() => {
    const { light, dark } = currentPalette.properties;
    const isLightTheme = resolvedTheme === 'light';
    animateProperties(isLightTheme ? light : dark, isLightTheme ? dark : light, 'text');
    animateProperties(isLightTheme ? dark : light, isLightTheme ? light : dark, 'background');
  }, [resolvedTheme, currentPalette.properties]);

  useUpdateEffect(() => {
    if (resolvedTheme !== 'system' && resolvedTheme !== currentTheme.current) {
      if(currentTheme.current !== 'system') {
        animateTheme();
      }
      currentTheme.current = resolvedTheme;
    }
  }, [resolvedTheme]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onChange = (newChecked: boolean | null) => {
    const newTheme = newChecked === null ? 'system' : (newChecked ? 'dark' : 'light');
    setTheme(newTheme);
  };

  const getCheckedFromTheme = (themeVal: string | undefined) => {
    if (themeVal === 'system') return null;
    return themeVal === 'dark';
  };

  return mounted && (
    <div className={`${styles.container} ${styles[segment]}`}>
      <ThreeStateCheckbox
        className={`${styles.button} ${iconStyles.toggle}`}
        onChange={onChange}
        name="dark-mode-toggle"
        id="toggle"
        checked={getCheckedFromTheme(theme)}
        label={theme}
      >
        <ThemeIcon />
      </ThreeStateCheckbox>
    </div>
  );
}

export default ThemeSwitcher;
