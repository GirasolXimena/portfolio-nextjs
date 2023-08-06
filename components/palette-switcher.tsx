import palettes from "../styles/palettes"
import styles from "../styles/palette-switcher.module.scss"
import utilStyles from "../styles/utils.module.scss"
import utilities from "../lib/util"
import { useEffect, useRef } from "react"

function PaletteSwitcher({ currentPalette, setPalette }) {
  const paletteSwitcherRef = useRef<HTMLDivElement>(null);
  const allPalettes = Object.keys(palettes)
  const nextPaletteIndex = allPalettes.indexOf(currentPalette) + 1
  const nextPalette = allPalettes[nextPaletteIndex] || allPalettes[0]

  useEffect(() => {
    if (!paletteSwitcherRef.current) return
    utilities.setCustomProperties(palettes[nextPalette].properties, paletteSwitcherRef.current)
  }, [nextPalette])

  const handleClick = () => {
    setPalette(nextPalette)
  }

  return (
    <div ref={paletteSwitcherRef} className={styles.options}>
      <div className={utilStyles.srOnly}>Palette Switcher</div>
      <div>
        <button onClick={handleClick}>new palette</button>
      </div>
    </div>
  )
}

export default PaletteSwitcher;
