'use client'
import AudioPlayer from "./audio-player";
import PaletteSwitcher from "./palette-switcher";
import ThemeSwitcher from "./theme-switcher";
import utilities from "../lib/util";
import styles from '../styles/layout.module.scss'
import palettes from "../styles/themes";
import { useState, useEffect } from "react";

const { setCustomProperties } = utilities

function HeaderControls() {
  const [palette, setPalette] = useState<string>('default');
  useEffect(() => {
    setCustomProperties(palettes[palette])
  }, [palette])

  const musicType = `/audio/${palette}.mp3`;
  return (
    <div className={styles.controls}>
      <PaletteSwitcher
        currentPalette={palette}
        setPalette={setPalette}
      />
      {musicType}
      <AudioPlayer musicType={musicType} />
      <ThemeSwitcher />
    </div>
  );

}

export default HeaderControls;