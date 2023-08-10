import Head from 'next/head'
import styles from '../styles/layout.module.scss'
import DefaultHeader from './default-header'
import { StrictMode } from 'react'

const name = process.env.NAME || 'Katerina Solensan'
export const siteTitle = name

export default function RootLayout({ children, home }) {
  return (
    <StrictMode>
      <div className={styles.container} id="layout-default">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content={`Personal website for ${name}`}
          />
          <meta
            property="og:image"
            content={`https://og-image.vercel.app/${encodeURI(
              siteTitle
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <header className={styles.header} id="header">
          <DefaultHeader />
        </header>
        <main className={styles.content} id="main-content">{children}</main>
      </div>
    </StrictMode>
  )
}