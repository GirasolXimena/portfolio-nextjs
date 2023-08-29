import palettes from "../styles/palettes"
import styles from "../styles/palette-switcher.module.scss"
import utilities from "../lib/util"
import { useEffect, useRef } from "react"
import usePaletteContext from "hooks/usePaletteContext";

function PaletteSwitcher({ segment }) {
  const paletteSwitcherRef = useRef<HTMLButtonElement>(null);
  const isTransitioning = useRef(false)
  const { palette, setPalette, nextPalette } = usePaletteContext()

  useEffect(() => {
    if (!paletteSwitcherRef.current) return
    const properties = palettes[nextPalette].properties
    const element = paletteSwitcherRef.current
    utilities.setCustomProperties(properties, element)
  }, [nextPalette])

  useEffect(() => {
    const storedPalette = localStorage.getItem('user-palette') || 'default';
    setPalette(storedPalette)
  }, [setPalette])

  useEffect(() => {
    localStorage.setItem('user-palette', palette)
    utilities.setCustomProperties(palettes[palette].properties)
  }, [palette])

  const handleClick = () => {
    // prevent double clicks
    if (isTransitioning.current) return

    const bodyElem = document.body;

    const handleTransitionEnd = (event) => {
    
      if (event.propertyName === 'opacity' && event.srcElement.nodeName === 'BODY') {
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
