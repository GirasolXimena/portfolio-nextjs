import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState
} from "react";

type PaletteContextProviderProps = {
  children: ReactNode
}

type PaletteContextType = {
  palette: string,
  setPalette: Dispatch<SetStateAction<string>>
}
export const PaletteContext = createContext<PaletteContextType | undefined>(undefined);

const PaletteContextProvider = ({ children }: PaletteContextProviderProps) => {
  const [palette, setPalette] = useState('default');

  return (
    <PaletteContext.Provider value={{
      palette,
      setPalette
    }}>
      {children}
    </PaletteContext.Provider>
  )
}

export const usePaletteContext = () => {
  const context = useContext(PaletteContext)
  if (context === undefined) {
    throw new Error(`usePalette must be used within a PaletteContextProvider`)
  }
  return context
}

export default PaletteContextProvider;
