'use client'
import { useContext, useRef, ReactNode } from 'react'
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context'
import { ThemeProvider } from "next-themes"
import { useEffect } from "react";
import utilities from 'lib/util';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
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


function FrozenRouter({ children }: { children: ReactNode }) {
  const context = useContext(LayoutRouterContext)
  const frozen = useRef(context).current;
  return (
  <LayoutRouterContext.Provider value={frozen}>
    {children}
  </LayoutRouterContext.Provider>
  )
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
        <FrozenRouter>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </FrozenRouter>
      </motion.div>
    </AnimatePresence>
  )
}