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

export default PaletteContextProvider;
