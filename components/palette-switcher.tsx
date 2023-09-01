import styles from "../styles/palette-switcher.module.scss";
import { useRef, useState } from "react";
import usePaletteContext from "hooks/usePaletteContext";
import { useEffectOnce, useIsClient } from "usehooks-ts";
import { applyPaletteAnimation } from "lib/util";

function PaletteSwitcher({ segment }) {
  const paletteSwitcherRef = useRef<HTMLButtonElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { setPalette, nextPalette, nextNextPalette, currentPalette } = usePaletteContext();
  const isClient = useIsClient();


  useEffectOnce(() => {
    const sourceProperties = currentPalette.palette.properties;
    const targetProperties = nextPalette.palette.properties;
    const element = paletteSwitcherRef.current || undefined;
    applyPaletteAnimation(sourceProperties, targetProperties, element)
  });

  const handleClick = async () => {
    setIsTransitioning(true);
    const sourceProperties = nextPalette.palette.properties;
    const targetProperties = nextNextPalette.palette.properties;
    setPalette(nextPalette.key);
    await applyPaletteAnimation(
      sourceProperties,
      targetProperties,
      paletteSwitcherRef.current as HTMLButtonElement
      );

    setIsTransitioning(false);
  };

  return (
    <div className={`${styles.container} ${styles[segment]}`}>
      {
        isClient ? (
          <button
            type="button"
            disabled={isTransitioning}
            ref={paletteSwitcherRef}
            onClick={handleClick}
            aria-label="Change color palette"
            data-label="palette"
          ></button>

        ) : (
          <button
          type="button"
        >dummy button</button> 
        )
      }
    </div>
  );
}

export default PaletteSwitcher;
