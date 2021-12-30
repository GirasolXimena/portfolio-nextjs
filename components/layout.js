import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

const name = 'S. Roberto Andrade'
const jobTitle = 'Creative Technologist'
export const siteTitle = 'Portfolio Site'

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
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
      <header className={styles.header}>
        <nav>
          <ul className="nav-links">
            <li className="nav-link">
              <Link href="/">
                <a>
                  Home
                </a>
              </Link>
            </li>
            <li className="nav-link">
              <Link href="/resume">
                <a>
                  Resume
                </a>
              </Link>
            </li>
            <li className="nav-link">
              <Link href="/posts">
                <a>
                  Blog
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}