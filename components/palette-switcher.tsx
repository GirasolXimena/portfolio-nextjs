import styles from "../styles/palette-switcher.module.scss";
import { useRef, useState } from "react";
import usePaletteContext from "hooks/usePaletteContext";
import { motion } from "framer-motion";
import HeaderControlsButton from "./header-controls-button";

function PaletteSwitcher({ segment }: { segment: string }) {
  const paletteSwitcherRef = useRef<HTMLButtonElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { setPalette, nextPalette } = usePaletteContext();


  const handleClick = async (): Promise<void> => {
    setIsTransitioning(true);
    setPalette(nextPalette.key);
    setIsTransitioning(false);
  };

  return (
    <HeaderControlsButton
      className={`${styles.container} ${styles[segment]}`}
    >
      <motion.button
        animate={{
          '--primary': nextPalette.palette.properties.primary,
          '--secondary': nextPalette.palette.properties.secondary,
          '--tertiary': nextPalette.palette.properties.tertiary,
        } as any}
        transition={{
          duration: 2,
          ease: 'easeInOut',
        }}
        type="button"
        disabled={isTransitioning}
        ref={paletteSwitcherRef}
        onClick={handleClick}
        aria-label={"Change color palette"}
        data-label={"palette"}
      ></motion.button>
    </HeaderControlsButton>
  );
}

export default PaletteSwitcher;
