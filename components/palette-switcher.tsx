import styles from "../styles/palette-switcher.module.scss";
import { useRef, useState } from "react";
import usePaletteContext from "hooks/usePaletteContext";
import { useEffectOnce } from "usehooks-ts";
import { applyPaletteAnimation } from "lib/util";

function PaletteSwitcher({ segment }) {
  const paletteSwitcherRef = useRef<HTMLButtonElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { setPalette, nextPalette, nextNextPalette, currentPalette } = usePaletteContext();


  useEffectOnce(() => {
    const sourceProperties = currentPalette.palette.properties;
    const targetProperties = nextPalette.palette.properties;
    applyPaletteAnimation(sourceProperties, targetProperties, paletteSwitcherRef.current as HTMLButtonElement)
  });

  const handleClick = async () => {
    setIsTransitioning(true);
    const sourceProperties = nextPalette.palette.properties;
    const targetProperties = nextNextPalette.palette.properties;
    await applyPaletteAnimation(
      sourceProperties,
      targetProperties,
      paletteSwitcherRef.current as HTMLButtonElement
    );

    setPalette(nextPalette.key);
    setIsTransitioning(false);
  };

  return (
    <div className={`${styles.container} ${styles[segment]}`}>
      <button
        disabled={isTransitioning}
        ref={paletteSwitcherRef}
        onClick={handleClick}
        aria-label="Change color palette"
        data-label="palette"
      ></button>
    </div>
  );
}

export default PaletteSwitcher;
