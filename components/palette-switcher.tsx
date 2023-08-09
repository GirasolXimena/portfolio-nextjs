import palettes from "../styles/palettes"
import styles from "../styles/palette-switcher.module.scss"
import utilities from "../lib/util"
import { useEffect, useRef } from "react"

function PaletteSwitcher({ currentPalette, setPalette, segment }) {
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
    const bodyElem = document.body;

    const handleTransitionEnd = (event) => {
      console.log('transitionend', event)
      setPalette(nextPalette);
      if (event.propertyName === 'opacity') {
        bodyElem.removeEventListener('transitionend', handleTransitionEnd);
        bodyElem.classList.remove('transitioning');
      }
    };

    bodyElem.classList.add('transitioning');
    bodyElem.addEventListener('transitionend', handleTransitionEnd);
  }

  return (
    <div className={`${styles.container} ${styles[segment]}`}>
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
