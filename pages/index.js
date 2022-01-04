import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import Hero from '../components/hero'
import utilStyles from '../styles/utils.module.scss'

export default function Home() {
  return (
    <div className="hero">
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <main className={utilStyles.headingMd}>
        <Hero />
      </main>
    </div>
  )
}
