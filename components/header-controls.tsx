import AudioPlayer from "./audio-player";
import PaletteSwitcher from "./palette-switcher";
import ThemeSwitcher from "./theme-switcher";
import utilities from "../lib/util";
import styles from '../styles/layout.module.scss'
import palettes from "../styles/palettes";
import { useEffect } from "react";
import usePaletteContext from "@/hooks/usePaletteContext";


const { setCustomProperties } = utilities

function HeaderControls({ segment }) {
  const { palette, setPalette } = usePaletteContext()

  useEffect(() => {
    const storedPalette = localStorage.getItem('user-palette') || 'default';
    setPalette(storedPalette)
  }, [setPalette])

  useEffect(() => {
    localStorage.setItem('user-palette', palette)
    setCustomProperties(palettes[palette].properties)
  }, [palette])

  return (
    <div className={styles.controls}>
      <AudioPlayer
        segment={segment}
        musicType={palettes[palette].audio}
      />
      <ThemeSwitcher
        segment={segment}
      />
      <PaletteSwitcher
        segment={segment}
        currentPalette={palette}
        setPalette={setPalette}
      />
    </div>
  );

}

export default HeaderControls;