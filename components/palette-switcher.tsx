import styles from "../styles/palette-switcher.module.scss";
import { useRef, useState } from "react";
import usePaletteContext from "hooks/usePaletteContext";
import { useBoolean, useIsClient, useIsomorphicLayoutEffect } from "usehooks-ts";
import { applyPaletteAnimation, setCustomProperties } from "lib/util";
import palettes from "styles/palettes";
import { PaletteProperties } from "types";
import { AnimationPlaybackControls, animate, motion } from "framer-motion";
import { useTheme } from "next-themes";

function PaletteSwitcher({ segment }: { segment: string }) {
  const paletteSwitcherRef = useRef<HTMLButtonElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { setPalette, nextPalette, nextNextPalette, currentPalette } = usePaletteContext();
  const { resolvedTheme } = useTheme()
  const isClient = useIsClient();
  const { value: hasRan, setTrue } = useBoolean(false);


  const animateColorProperty = (
    fromColor: string,
    toColor: string,
    property: string,
    element?: HTMLElement
  ): AnimationPlaybackControls => {
    return animate(fromColor, toColor, {
      duration: 2,
      delay: 0.25,
      ease: 'easeInOut',
      onUpdate: (value) => setCustomProperties({ [property]: value }, element)
    });
  };


  useIsomorphicLayoutEffect(() => {
    const paletteSwitcherButton = paletteSwitcherRef.current;
    if (!paletteSwitcherButton || !isClient) return;
    const { primary: serverPrimary, secondary: serverSecondary, tertiary: serverTertiary, light: serverLight, dark: serverDark } = palettes.grayscale.properties;
    const { primary: sourcePrimary, secondary: sourceSecondary, tertiary: sourceTertiary, light: sourceLight, dark: sourceDark } = currentPalette.palette.properties;
    const { primary: targetPrimary, secondary: targetSecondary, tertiary: targetTertiary, light: targetLight, dark: targetDark } = nextPalette.palette.properties;
    console.log('animating')
    const animations = [
      animateColorProperty(serverPrimary, sourcePrimary, '--primary'),
      animateColorProperty(serverSecondary, sourceSecondary, '--secondary'),
      animateColorProperty(serverTertiary, sourceTertiary, '--tertiary'),
      animateColorProperty(serverLight, sourceLight, '--light'),
      animateColorProperty(serverDark, sourceDark, '--dark'),
      animateColorProperty(serverPrimary, targetPrimary, '--primary', paletteSwitcherButton),
      animateColorProperty(serverSecondary, targetSecondary, '--secondary', paletteSwitcherButton),
      animateColorProperty(serverTertiary, targetTertiary, '--tertiary', paletteSwitcherButton),
      animateColorProperty(serverLight, targetLight, '--light', paletteSwitcherButton),
      animateColorProperty(serverDark, targetDark, '--dark', paletteSwitcherButton),
    ]
    setTrue()
    return () => {
      animations.forEach((animation) => animation.stop());
    }


  }, [isClient]);

  const updateLayoutPalette = async (sourceProperties: PaletteProperties, targetProperties: PaletteProperties): Promise<void[]> => {
    return await applyPaletteAnimation(sourceProperties, targetProperties)
  }

  const updateButtonPalette = async (sourceProperties: PaletteProperties, targetProperties: PaletteProperties): Promise<void[]> => {
    const paletteSwitcherButton = paletteSwitcherRef.current;
    return await applyPaletteAnimation(
      sourceProperties,
      targetProperties,
      paletteSwitcherButton as HTMLButtonElement
    );

  }

  const handleClick = async (): Promise<void> => {
    setIsTransitioning(true);
    updateLayoutPalette({
      ...currentPalette.palette.properties,
      'background': resolvedTheme === 'dark' ? currentPalette.palette.properties.dark : currentPalette.palette.properties.light,
      'text': resolvedTheme === 'dark' ? currentPalette.palette.properties.light : currentPalette.palette.properties.dark,
    }, {
      ...nextPalette.palette.properties,
      'background': resolvedTheme === 'dark' ? nextPalette.palette.properties.dark : nextPalette.palette.properties.light,
      'text': resolvedTheme === 'dark' ? nextPalette.palette.properties.light : nextPalette.palette.properties.dark,
    })
    await updateButtonPalette(nextPalette.palette.properties, nextNextPalette.palette.properties)
    setPalette(nextPalette.key);
    setIsTransitioning(false);
  };

  return (
    <motion.div
      whileHover={{
        scale: 1.15,
      }}
      transition={{
        duration: 0.25,
        ease: "easeInOut",
      }}
      className={`${styles.container} ${styles[segment]}`}
    >
      <button
        type="button"
        disabled={!isClient || isTransitioning}
        ref={isClient ? paletteSwitcherRef : undefined}
        onClick={isClient ? handleClick : undefined}
        aria-label={isClient ? "Change color palette" : undefined}
        data-label={isClient ? "palette" : undefined}
      ></button>
    </motion.div>
  );
}

export default PaletteSwitcher;
