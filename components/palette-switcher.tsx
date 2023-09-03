import styles from "../styles/palette-switcher.module.scss";
import { useRef } from "react";
import usePaletteContext from "hooks/usePaletteContext";
import { motion } from "framer-motion";
import HeaderControlsButton from "./header-controls-button";
import useTransitionContext from "hooks/useTransitionContext";

function PaletteSwitcher({ segment }: { segment: string }) {
  const paletteSwitcherRef = useRef<HTMLButtonElement>(null);
  const { transitioning } = useTransitionContext();
  const { setPalette, nextPalette } = usePaletteContext();


  const handleClick = async (): Promise<void> => {
    setPalette(nextPalette.key);
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
        disabled={transitioning}
        ref={paletteSwitcherRef}
        onClick={handleClick}
        aria-label={"Change color palette"}
        data-label={"palette"}
      ></motion.button>
    </HeaderControlsButton>
  );
}

export default PaletteSwitcher;
