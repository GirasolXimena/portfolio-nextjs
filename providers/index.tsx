'use client'
import { useEffect, ReactNode } from "react";
import utilities from 'lib/util';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
// providers
import { ThemeProvider } from "next-themes"
import PaletteContextProvider from './palette-context';
import AudioContextProvider from './audio-context';
import FrozenRouterContextProvider from './frozen-router-context';
// providers

const { setCustomProperties, toCartesianCoords } = utilities

const handleInput = (event: MouseEvent | TouchEvent) => {
  let x: number;
  let y: number;

  if (event instanceof TouchEvent && event.touches.length > 0) {
    x = event.touches[0].clientX;
    y = event.touches[0].clientY;
  } else if (event instanceof MouseEvent) {
    x = event.clientX;
    y = event.clientY;
  } else {
    return;  // Early return if neither condition met
  }

  const coords = toCartesianCoords({ x, y });
  setCustomProperties({
    'mouse-x': `${coords.x}`,
    'mouse-y': `${coords.y}`,
  });
}




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


export function Providers({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    const { body } = document;

    body.addEventListener('mousemove', handleInput);
    body.addEventListener('touchmove', handleInput);

    return () => {
      body.removeEventListener('mousemove', handleInput);
      body.removeEventListener('touchmove', handleInput);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, type: 'tween' }}
      >
        <CompositeProvider>
          {children}
        </CompositeProvider>
      </motion.div>
    </AnimatePresence>
  )
}

export default Providers