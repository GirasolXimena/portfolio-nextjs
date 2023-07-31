'use client'
import AudioPlayer from "./audio-player";
import PaletteSwitcher from "./palette-switcher";
import ThemeSwitcher from "./theme-switcher";
import utilities from "../lib/util";
import styles from '../styles/layout.module.scss'
import palettes from "../styles/palettes";
import { useState, useEffect } from "react";

const { setCustomProperties } = utilities

function HeaderControls() {
  const [palette, setPalette] = useState<string>('default');
  useEffect(() => {
    setCustomProperties(palettes[palette].properties)
  }, [palette])

  return (
    <div className={styles.controls}>
      <AudioPlayer
        musicType={palettes[palette].audio}
      />
      <PaletteSwitcher
        currentPalette={palette}
        setPalette={setPalette}
      />
      <ThemeSwitcher />
    </div>
  );

}

export default HeaderControls;