import { animateProperties, setCustomProperties } from "lib/util";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useRef,
  useMemo
} from "react";
import palettes from "styles/palettes";
import { Palette } from "types";
import { useEffectOnce, useLocalStorage, useUpdateEffect } from "usehooks-ts";

type PaletteContextProviderProps = {
  children: ReactNode
}

type PaletteContextType = {
  palette: string,
  nextPalette: { palette: Palette, key: string },
  currentPalette: Palette,
  setPalette: Dispatch<SetStateAction<string>>
}

export const PaletteContext = createContext<PaletteContextType | undefined>(undefined);

const PaletteContextProvider = ({ children }: PaletteContextProviderProps) => {
  const [palette, setPalette] = useLocalStorage('user-palette', 'default');
  const paletteKeys = Object.keys(palettes);

  const nextPalette = useMemo(() => {
    const nextPaletteIndex = (paletteKeys.indexOf(palette) + 1) % paletteKeys.length;
    const nextPaletteKey = paletteKeys[nextPaletteIndex];
    return { palette: palettes[nextPaletteKey], key: nextPaletteKey };
  }, [palette, paletteKeys]);

  const currentPalette = palettes[palette];
  const prevPalette = useRef<string | undefined>(palette);

  useEffectOnce(() => {
    setCustomProperties(currentPalette.properties);
  });

  useUpdateEffect(() => {
    if (!prevPalette.current || prevPalette.current === palette) return;

    const targetProperties = currentPalette.properties;
    const sourceProperties = palettes[prevPalette.current].properties;

    // Transitioning between the palette properties
    for (let propertyKey in targetProperties) {
      animateProperties(
        sourceProperties[propertyKey],
        targetProperties[propertyKey],
        propertyKey
      );
    }

    prevPalette.current = palette;
  }, [palette, currentPalette.properties]);

  return (
    <PaletteContext.Provider value={{ palette, currentPalette, nextPalette, setPalette }}>
      {children}
    </PaletteContext.Provider>
  );
}

export default PaletteContextProvider;
