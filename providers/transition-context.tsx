"use client";
import { MutableRefObject, ReactNode, createContext, useRef } from "react";
import { motion } from "framer-motion";
import usePaletteContext from "hooks/usePaletteContext";
import palettes from "styles/palettes";
import { useTheme } from "next-themes";
import { useBoolean } from "usehooks-ts";
import { PaletteProperties } from "types";

type TransitionContextType = {
  transitioning: boolean;
  currentThemeColorsRef: MutableRefObject<PaletteProperties>;
};

type TransitionContextProviderProps = {
  children: ReactNode;
  transitionKey?: string | number;
};

export const TransitionContext = createContext<
  TransitionContextType | undefined
>(undefined);

const TransitionContextProvider = ({
  children,
}: TransitionContextProviderProps) => {
  const { currentPalette } = usePaletteContext();
  const { resolvedTheme } = useTheme();
  const {
    value: transitioning,
    setTrue: startTransition,
    setFalse: endTransition,
  } = useBoolean(false);

  const currentThemeColorsRef = useRef<PaletteProperties>({
    primary: palettes.grayscale.properties.primary,
    secondary: palettes.grayscale.properties.secondary,
    tertiary: palettes.grayscale.properties.tertiary,
    light: palettes.grayscale.properties.text as string,
    dark: palettes.grayscale.properties.background as string,
    font: palettes.grayscale.properties.font,
  });

  const onUpdate = (latest) => {
    currentThemeColorsRef.current = {
      primary: latest["--primary"],
      secondary: latest["--secondary"],
      tertiary: latest["--tertiary"],
      light: latest["--text"] as string,
      dark: latest["--background"] as string,
      font: "",
    };
  };

  return (
    <TransitionContext.Provider
      value={{
        transitioning,
        currentThemeColorsRef,
      }}
    >
      <motion.div
        id="transition-context"
        onUpdate={onUpdate}
        initial={
          {
            "--primary": palettes.grayscale.properties.primary,
            "--secondary": palettes.grayscale.properties.secondary,
            "--tertiary": palettes.grayscale.properties.tertiary,
            "--background": palettes.grayscale.properties.background as string,
            "--text": palettes.grayscale.properties.text as string,
          } as any
        }
        animate={
          {
            "--primary": currentPalette.palette.properties.primary,
            "--secondary": currentPalette.palette.properties.secondary,
            "--tertiary": currentPalette.palette.properties.tertiary,
            "--background":
              resolvedTheme === "dark"
                ? currentPalette.palette.properties.dark
                : currentPalette.palette.properties.light,
            "--text":
              resolvedTheme === "dark"
                ? currentPalette.palette.properties.light
                : currentPalette.palette.properties.dark,
          } as any
        }
        transition={{
          duration: 1,
          ease: "easeInOut",
        }}
        onAnimationStart={startTransition}
        onAnimationComplete={endTransition}
      >
        {children}
      </motion.div>
    </TransitionContext.Provider>
  );
};

export default TransitionContextProvider;
