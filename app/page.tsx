import React from "react";
import Hero from "../components/hero";
import utilStyles from '../styles/utils.module.scss'

export default function Page() {
  return (
    <article
      id="home"
      className={`${utilStyles.headingMd} ${utilStyles.articleLayout}`}
    >
      <Hero />
    </article>
  )
}
