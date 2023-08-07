'use client'

import { ThemeProvider } from "next-themes"
import ShadowText from "../components/shadow-text"

export function Providers({ children }) {
  return (
    <ThemeProvider>
      <ShadowText textClass={'shadow'}>
        {children}

      </ShadowText>
    </ThemeProvider>
  )
}