'use client'

import { ThemeProvider } from "next-themes"
import { useEffect } from "react";
import utilities from 'lib/util';
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



export function Providers({ children }) {

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
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
}