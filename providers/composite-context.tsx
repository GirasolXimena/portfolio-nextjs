import { ThemeProvider } from "next-themes"
import PaletteContextProvider from 'providers/palette-context';
import AudioContextProvider from 'providers/audio-context';
import FrozenRouterContextProvider from 'providers/frozen-router-context';
import { ReactNode } from "react";

const providers = [
  { provider: FrozenRouterContextProvider, props: {} },
  { provider: ThemeProvider, props: {} },
  { provider: PaletteContextProvider, props: {} },
  { provider: AudioContextProvider, props: {} },
]

const CompositeProvider = ({ children }: { children: ReactNode }) => {
  return providers.reduceRight(
    (kids, { provider: CurrentProvider, props }) => (
      <CurrentProvider {...props}>{kids}</CurrentProvider>
    ),
    children
  );
}

export default CompositeProvider;