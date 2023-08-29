import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useRef,
  useMemo,
} from "react";
import { applyPaletteAnimation, setCustomProperties } from "lib/util";
import palettes from "styles/palettes";
import { Palette } from "types";
import { useEffectOnce, useLocalStorage, useUpdateEffect } from "usehooks-ts";
import { getNextPaletteKey, getPaletteData } from "lib/util";

type PaletteContextProviderProps = {
  children: ReactNode;
};

type PaletteContextType = {
  palette: string;
  nextPalette: { palette: Palette; key: string };
  nextNextPalette: { palette: Palette; key: string };
  currentPalette: { palette: Palette; key: string };
  setPalette: Dispatch<SetStateAction<string>>;
};

export const PaletteContext = createContext<PaletteContextType | undefined>(undefined);

const PaletteContextProvider = ({ children }: PaletteContextProviderProps) => {
  const [palette, setPalette] = useLocalStorage("user-palette", "default");
  const nextPaletteKey = useMemo(() => getNextPaletteKey(palette, 1), [palette]);
  const nextNextPaletteKey = useMemo(() => getNextPaletteKey(palette, 2), [palette]);

  const nextPalette = useMemo(() => getPaletteData(nextPaletteKey), [nextPaletteKey]);
  const nextNextPalette = useMemo(() => getPaletteData(nextNextPaletteKey), [nextNextPaletteKey]);

  const currentPalette = {palette: palettes[palette], key: palette};
  const prevPalette = useRef<undefined | Palette>(palettes[palette]);

  useEffectOnce(() => {
    setCustomProperties(currentPalette.palette.properties);
  });

  useUpdateEffect(() => {
    if (!prevPalette.current || prevPalette.current === palettes[palette]) return;
    const sourceProperties = prevPalette.current.properties;
    const targetProperties = currentPalette.palette.properties;
    applyPaletteAnimation(sourceProperties, targetProperties)

    prevPalette.current = palettes[palette];
  }, [palette, currentPalette.palette.properties]);

  return (
    <PaletteContext.Provider
      value={{
        palette,
        currentPalette,
        nextPalette,
        nextNextPalette,
        setPalette,
      }}
    >
      {children}
    </PaletteContext.Provider>
  );
};

export default PaletteContextProvider;
