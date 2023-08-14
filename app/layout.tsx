import { Metadata } from 'next'
import {
  inter
} from './fonts'
import '../styles/global.scss'
import styles from '../styles/layout.module.scss'
import { Providers } from './providers'
import { ReactNode } from 'react'
const name = process.env.NAME || 'Katerina Solensan'
export const siteTitle = name
import { StrictMode } from 'react'
import DefaultLayout from '@/components/default-layout'


export const metadata: Metadata = {
  title: name,
  description: `${name} is a software engineer and designer based in Minneapolis, MN.`,
}

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html suppressHydrationWarning className={inter.variable}>
      <body className={styles.body}>
        <StrictMode>
          <Providers>
            <DefaultLayout>
              {children}
            </DefaultLayout>
          </Providers>
        </StrictMode>
      </body>
    </html>
  )
}

export default RootLayout