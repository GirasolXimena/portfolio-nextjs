import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import Hero from '../components/hero'
import utilStyles from '../styles/utils.module.scss'

export default function Home() {
  return (
    <div id="home">
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <main className={utilStyles.headingMd} style={{ display: 'grid', alignItems: 'center', justifyItems: 'center', height: '100vh', width: '100vw' }}>
        <Hero />
      </main>
    </div>
  )
}
