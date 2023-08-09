import React from 'react'
import { Metadata } from 'next'
import {
  noto_sans,
  roboto_mono,
  inter
} from './fonts'
import '../styles/global.scss'
import styles from '../styles/layout.module.scss'
import DefaultLayout from '../components/default-layout'
import { Providers } from './providers'


export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}

// const fontVariableNames = [noto_sans, roboto_mono, inter]
  // .map(({ variable }) => variable).join(' ')

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning className={inter.className}>
      <body className={styles.body}>
        <Providers>
          <DefaultLayout home={true}>
            {children}
          </DefaultLayout>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout