import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState
} from "react";
import palettes from "styles/palettes";
import { Palette } from "types";

type PaletteContextProviderProps = {
  children: ReactNode
}

type PaletteContextType = {
  palette: string,
  nextPalette: string,
  currentPalette: Palette
  setPalette: Dispatch<SetStateAction<string>>
}

export const PaletteContext = createContext<PaletteContextType | undefined>(undefined);

const PaletteContextProvider = ({ children }: PaletteContextProviderProps) => {
  const [palette, setPalette] = useState('default');
  const paletteKeys = Object.keys(palettes)
  const nextPaletteIndex = paletteKeys.indexOf(palette) + 1
  const nextPalette = paletteKeys[nextPaletteIndex] || paletteKeys[0]
  const currentPalette = palettes[palette]


  return (
    <PaletteContext.Provider value={{
      palette,
      currentPalette,
      nextPalette,
      setPalette
    }}>
      {children}
    </PaletteContext.Provider>
  )
}

export default PaletteContextProvider;
