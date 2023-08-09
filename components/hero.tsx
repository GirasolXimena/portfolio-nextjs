import styles from '../styles/hero.module.scss'
import Navbar from './navbar'
import { inter } from '../app/fonts'

export default function Hero() {
  return (
    <div className={styles.hero}>
      <h1 id="name">
        <span className={`${inter.variable}`}>
          S.
        </span>&nbsp;Roberto
        <br />
        Andrade
      </h1>
      <h2>
        Creative Technologist
      </h2>
      <Navbar segment='home' />
    </div>
  )
}