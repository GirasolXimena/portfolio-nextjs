import React from 'react'
import { Metadata } from 'next'
import {
  noto_sans,
  roboto_mono,
  inter
} from './fonts'
import '../styles/global.scss'
import DefaultHeader from '../components/default-header'
import styles from '../styles/layout.module.scss'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}

const fontVariableNames = [noto_sans, roboto_mono, inter]
  .map(({ variable }) => variable).join(' ')

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang='en' className={fontVariableNames}>
    <body className={styles.body} >
      <DefaultHeader />
      {children}
    </body>
  </html>
)

export default RootLayout