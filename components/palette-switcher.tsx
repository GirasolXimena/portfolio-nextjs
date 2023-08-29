import palettes from "../styles/palettes"
import styles from "../styles/palette-switcher.module.scss"
import { animateProperties } from "../lib/util"
import { useRef } from "react"
import usePaletteContext from "hooks/usePaletteContext";
import { useEffectOnce } from "usehooks-ts";
import convert from "color-convert";
import { animate } from "framer-motion";
import { setCustomProperties } from "lib/util";

function PaletteSwitcher({ segment }) {
  const paletteSwitcherRef = useRef<HTMLButtonElement>(null);
  const isTransitioning = useRef(false)
  const { setPalette, nextPalette, nextNextPalette, currentPalette } = usePaletteContext()

  useEffectOnce(() => {
    const targetProperties = nextPalette.palette.properties;
    const sourceProperties = currentPalette.properties;
    const element = paletteSwitcherRef.current as HTMLButtonElement
    for (let propertyKey in targetProperties) {
      animateProperties(
        sourceProperties[propertyKey],
        targetProperties[propertyKey],
        propertyKey,
        element,
      );
    }
  })

  const handleClick = () => {
    console.log('n', nextPalette.key, 'nn', nextNextPalette.key)
    const targetProperties = nextNextPalette.palette.properties;
    const sourceProperties = nextPalette.palette.properties;
    const element = paletteSwitcherRef.current as HTMLButtonElement
    for (let propertyKey in targetProperties) {
      if (propertyKey === 'font') continue;
      const startColor = convert.hex.hsl(sourceProperties[propertyKey]);
      const endColor = convert.hex.hsl(targetProperties[propertyKey]);
      const midpoint = [
        (startColor[0] + endColor[0]) / 2,
        (startColor[1] + endColor[1]) / 2,
        (startColor[2] + endColor[2]) / 2
      ]
      const startString = `hsl(${startColor[0]}, ${startColor[1]}%, ${startColor[2]}%)`
      const midpointString = `hsl(${midpoint[0]}, ${midpoint[1]}%, ${midpoint[2]}%)`
      const endString = `hsl(${endColor[0]}, ${endColor[1]}%, ${endColor[2]}%)`

      animate(startString, midpointString, {
        duration: 0.5,
        onUpdate: (latest) => setCustomProperties({ [propertyKey]: latest }, element),
      }).then(() => {
        animate(midpointString, endString, {
          duration: 0.5,
          onUpdate: (latest) => setCustomProperties({ [propertyKey]: latest }, element),
        })
      });
    }
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
