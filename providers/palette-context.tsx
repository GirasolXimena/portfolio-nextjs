"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useMemo,
} from "react";
import palettes from "styles/palettes";
import { Palette } from "types";
import { useLocalStorage } from "usehooks-ts";
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

export const PaletteContext = createContext<PaletteContextType | undefined>(
  undefined,
);

const PaletteContextProvider = ({ children }: PaletteContextProviderProps) => {
  const [palette, setPalette] = useLocalStorage("user-palette", "default");
  const nextPaletteKey = useMemo(
    () => getNextPaletteKey(palette, 1),
    [palette],
  );
  const nextNextPaletteKey = useMemo(
    () => getNextPaletteKey(palette, 2),
    [palette],
  );

  const nextPalette = useMemo(
    () => getPaletteData(nextPaletteKey),
    [nextPaletteKey],
  );
  const nextNextPalette = useMemo(
    () => getPaletteData(nextNextPaletteKey),
    [nextNextPaletteKey],
  );

  const currentPalette = { palette: palettes[palette], key: palette };

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
