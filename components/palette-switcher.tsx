import palettes from "../styles/palettes"
import styles from "../styles/palette-switcher.module.scss"
import utilities from "../lib/util"
import { useEffect, useRef } from "react"

function PaletteSwitcher({ currentPalette, setPalette }) {
  const paletteSwitcherRef = useRef<HTMLButtonElement>(null);
  const paletteKeys = Object.keys(palettes)
  const nextPaletteIndex = paletteKeys.indexOf(currentPalette) + 1
  const nextPalette = paletteKeys[nextPaletteIndex] || paletteKeys[0]

  useEffect(() => {
    if (!paletteSwitcherRef.current) return
    const properties = palettes[nextPalette].properties
    const element = paletteSwitcherRef.current
    utilities.setCustomProperties(properties, element)
  }, [nextPalette])

  const handleClick = () => {
    setPalette(nextPalette)
  }

  return (
    <div className={styles.options}>
      <button
        ref={paletteSwitcherRef}
        onClick={handleClick}
        aria-label="change palette"
        data-label="palette"
      ></button>
    </div>
  )
}

export default PaletteSwitcher;
