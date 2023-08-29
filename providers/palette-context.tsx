import { set } from "date-fns";
import { animate, color } from "framer-motion";
import { animateProperties, setCustomProperties } from "lib/util";
import convert from "color-convert";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useRef,
  useMemo,
  useCallback
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
  nextNextPalette: { palette: Palette, key: string },
  currentPalette: Palette,
  setPalette: Dispatch<SetStateAction<string>>
}

export const PaletteContext = createContext<PaletteContextType | undefined>(undefined);

const PaletteContextProvider = ({ children }: PaletteContextProviderProps) => {
  const [palette, setPalette] = useLocalStorage('user-palette', 'default');
  const paletteKeys = Object.keys(palettes);

  const getNextPalette = useCallback((current: string, offset: number): { palette: Palette, key: string } => {
    const currentIndex = paletteKeys.indexOf(current);
    const nextIndex = (currentIndex + offset) % paletteKeys.length;
    const nextKey = paletteKeys[nextIndex];
    return { palette: palettes[nextKey], key: nextKey };
  }, [paletteKeys])

  const nextPalette = useMemo(() => getNextPalette(palette, 1), [palette, getNextPalette]);
  const nextNextPalette = useMemo(() => getNextPalette(palette, 2), [palette, getNextPalette]);


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
      if (propertyKey === 'font') continue;
      const startColor = convert.hex.hsl(sourceProperties[propertyKey]);
      const endColor = convert.hex.hsl(targetProperties[propertyKey]);
      const midpoint = [
        (startColor[0] + endColor[0]) / 2,
        (startColor[1] + endColor[1]) / 2,
        (startColor[2] + endColor[2]) / 2
      ]
      const startString = `hsl(${startColor[0]}, ${startColor[1]}%, ${startColor[2]}%)`
      const midpointString = `hsl(${midpoint[0]}, ${midpoint[1]}%, ${midpoint[2]}%)`
      const endString = `hsl(${endColor[0]}, ${endColor[1]}%, ${endColor[2]}%)`

      animate(startString, midpointString, {
        duration: 0.5,
        onUpdate: (latest) => setCustomProperties({ [propertyKey]: latest }),
      }).then(() => {
        animate(midpointString, endString, {
          duration: 0.5,
          onUpdate: (latest) => setCustomProperties({ [propertyKey]: latest }),
        })
      });
    }

    prevPalette.current = palette;
  }, [palette, currentPalette.properties]);

  return (
    <PaletteContext.Provider value={{
      palette,
      currentPalette,
      nextPalette,
      nextNextPalette,
      setPalette
    }}>
      {children}
    </PaletteContext.Provider>
  );
}

export default PaletteContextProvider;
