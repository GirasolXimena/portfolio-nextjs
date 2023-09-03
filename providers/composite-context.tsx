'use client'
import { ThemeProvider } from "next-themes"
import PaletteContextProvider from 'providers/palette-context';
import AudioContextProvider from 'providers/audio-context';
import FrozenRouterContextProvider from 'providers/frozen-router-context';
import { ReactNode } from "react";
import TransitionContext from "./transition-context";

const providers = [
  { provider: ThemeProvider, props: {} },
  { provider: PaletteContextProvider, props: {} },
  { provider: TransitionContext, props: {} },
  { provider: AudioContextProvider, props: {} },
  { provider: FrozenRouterContextProvider, props: {} },
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