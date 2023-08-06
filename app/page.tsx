import React from "react";
import Hero from "../components/hero";
import utilStyles from '../styles/utils.module.scss'

export default function Page() {
  return (
    <article id="home" className={utilStyles.headingMd} style={{ display: 'grid', alignItems: 'center', justifyItems: 'center', height: '100%', width: '100%' }}>
      <Hero />
    </article>
  )
}
