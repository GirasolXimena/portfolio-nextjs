import palettes from "../styles/palettes"
import styles from "../styles/palette-switcher.module.scss"
import utilities from "../lib/util"
import { useEffect, useRef } from "react"
import usePaletteContext from "hooks/usePaletteContext";

function PaletteSwitcher({ segment }) {
  const paletteSwitcherRef = useRef<HTMLButtonElement>(null);
  const isTransitioning = useRef(false)
  const { setPalette, nextPalette } = usePaletteContext()

  useEffect(() => {
    if (!paletteSwitcherRef.current) return
    const properties = nextPalette.palette.properties
    const element = paletteSwitcherRef.current
    utilities.setCustomProperties(properties, element)
  }, [nextPalette])

  const handleClick = () => {

    setPalette(nextPalette.key);
  }

  return (
    <div className={`${styles.container} ${styles[segment]}`}>
      <button
        disabled={isTransitioning.current}
        ref={paletteSwitcherRef}
        onClick={handleClick}
        aria-label="change palette"
        data-label="palette"
      ></button>
    </div>
  )
}

export default PaletteSwitcher;
