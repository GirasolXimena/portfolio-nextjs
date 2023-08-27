import { ThemeProvider } from "next-themes"
import PaletteContextProvider from './palette-context';
import AudioContextProvider from './audio-context';
import FrozenRouterContextProvider from './frozen-router-context';
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