import palettes from "../styles/palettes"
import styles from "../styles/palette-switcher.module.scss"
import utilities from "../lib/util"
import { useEffect, useRef } from "react"

function PaletteSwitcher({ currentPalette, setPalette, segment }) {
  const paletteSwitcherRef = useRef<HTMLButtonElement>(null);
  const paletteKeys = Object.keys(palettes)
  const nextPaletteIndex = paletteKeys.indexOf(currentPalette) + 1
  const nextPalette = paletteKeys[nextPaletteIndex] || paletteKeys[0]
  const isTransitioning = useRef(false)

  useEffect(() => {
    if (!paletteSwitcherRef.current) return
    const properties = palettes[nextPalette].properties
    const element = paletteSwitcherRef.current
    utilities.setCustomProperties(properties, element)
  }, [nextPalette])

  const handleClick = () => {
    // prevent double clicks
    if (isTransitioning.current) return

    const bodyElem = document.body;

    const handleTransitionEnd = (event) => {
    
      if (event.propertyName === 'opacity') {
        setPalette(nextPalette);
        bodyElem.removeEventListener('transitionend', handleTransitionEnd);
        bodyElem.classList.remove('transitioning');
        isTransitioning.current = false
      }
    };
    isTransitioning.current = true
    bodyElem.classList.add('transitioning');
    bodyElem.addEventListener('transitionend', handleTransitionEnd);
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
