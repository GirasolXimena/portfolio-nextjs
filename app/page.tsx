import React from "react";
import Hero from "../components/hero";
import styles from '../styles/hero.module.scss'

export default function Page() {
  return (
    <article
      id="home"
      className={`${styles.container}`}
    >
      <Hero />
    </article>
  )
}
