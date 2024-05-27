"use client";
import { ReactNode, createContext } from "react";
import { motion } from "framer-motion";
import usePaletteContext from "hooks/usePaletteContext";
import palettes from "styles/palettes";
import { useTheme } from "next-themes";
import { useBoolean } from "usehooks-ts";

type TransitionContextType = {
  transitioning: boolean;
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
  // transitionKey,
}: TransitionContextProviderProps) => {
  const { currentPalette } = usePaletteContext();
  const { resolvedTheme } = useTheme();
  const {
    value: transitioning,
    setTrue: startTransition,
    setFalse: endTransition,
  } = useBoolean(false);
  return (
    <TransitionContext.Provider
      value={{
        transitioning,
      }}
    >
      <motion.div
        id="transition-context"
        initial={
          {
            "--primary": palettes.grayscale.properties.primary,
            "--secondary": palettes.grayscale.properties.secondary,
            "--tertiary": palettes.grayscale.properties.tertiary,
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
