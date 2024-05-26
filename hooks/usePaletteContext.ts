import { useContext } from "react";
import { PaletteContext } from "providers/palette-context";

const usePaletteContext = () => {
  const context = useContext(PaletteContext);
  if (context === undefined) {
    throw new Error(`usePalette must be used within a PaletteContextProvider`);
  }
  return context;
};

export default usePaletteContext;
