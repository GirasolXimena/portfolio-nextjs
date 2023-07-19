import React from "react";
import Hero from "../components/hero";
import utilStyles from '../styles/utils.module.scss'

export default function Page() {
  return (
    <div id="home">
      <main className={utilStyles.headingMd} style={{ display: 'grid', alignItems: 'center', justifyItems: 'center', height: '100vh', width: '100vw' }}>
        <Hero />
      </main>
    </div>
  )
}
