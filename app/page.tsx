import React from "react";
import Hero from "../components/hero";
import styles from "../styles/hero.module.scss";
import { NAME } from "lib/data";

export default function Page() {
  return (
    <article id="home" className={`${styles.container} relative`}>
      <Hero name={NAME} />
    </article>
  );
}
