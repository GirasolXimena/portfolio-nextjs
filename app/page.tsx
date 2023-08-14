import React from "react";
import Hero from "../components/hero";
import utilStyles from '../styles/utils.module.scss'
import styles from '../styles/hero.module.scss'

export default function Page() {
  return (
    <article
      id="home"
      className={`${styles.container} ${utilStyles.articleLayout}`}
    >
      <Hero />
    </article>
  )
}
