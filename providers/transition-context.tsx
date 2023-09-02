'use client'
import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import usePaletteContext from 'hooks/usePaletteContext';
import palettes from 'styles/palettes';
import { useTheme } from 'next-themes';

type TransitionContextType = {
  children: ReactNode;
  transitionKey?: string | number;
}

const TransitionContext: FC<TransitionContextType> = ({ children }) => {
  const { currentPalette } = usePaletteContext();
  const { resolvedTheme } = useTheme()
  return ( <motion.div
    id='transition-context'
    initial={{
      '--primary': palettes.grayscale.properties.primary,
      '--secondary': palettes.grayscale.properties.secondary,
      '--tertiary': palettes.grayscale.properties.tertiary,
    } as any}
    animate={{ 
      '--primary': currentPalette.palette.properties.primary,
      '--secondary': currentPalette.palette.properties.secondary,
      '--tertiary': currentPalette.palette.properties.tertiary,
      '--background': resolvedTheme === 'dark' ? currentPalette.palette.properties.dark : currentPalette.palette.properties.light,
      '--text': resolvedTheme === 'dark' ? currentPalette.palette.properties.light : currentPalette.palette.properties.dark,
     } as any}
    transition={{
      duration: 1,
      ease: 'easeInOut',
    }}
  >
    {children}
  </motion.div>
);
}


export default TransitionContext;
