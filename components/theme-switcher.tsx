'use client'
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import styles from '../styles/theme-switcher.module.scss';
import iconStyles from '../styles/theme-icon.module.scss';
import ThreeStateCheckbox from './three-state-checkbox';
import ThemeIcon from './theme-icon';
import usePaletteContext from 'hooks/usePaletteContext';
import { animateColorTransition } from 'lib/util';
import { useIsClient, useUpdateEffect } from 'usehooks-ts';
import HeaderControlsButton from './header-controls-button';

function ThemeSwitcher({ segment }) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { currentPalette } = usePaletteContext();
  const currentTheme = useRef(resolvedTheme);
  const isClient = useIsClient()

  const onChange = (newChecked: boolean | null) => {
    const newTheme = newChecked === null ? 'system' : (newChecked ? 'dark' : 'light');
    setTheme(newTheme);
  };

  const getCheckedFromTheme = (themeVal: string | undefined) => {
    if (themeVal === 'system') return null;
    return themeVal === 'dark';
  };

  return isClient ? (
    <HeaderControlsButton className={`${styles.container} ${styles[segment]}`}>
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
    </HeaderControlsButton>
  ) : (
    <div className={`${styles.container} ${styles[segment]}`}>
      <button className={`${styles.button} ${iconStyles.toggle}`}>
        <ThemeIcon />
      </button>
    </div>
  );
}

export default ThemeSwitcher;
