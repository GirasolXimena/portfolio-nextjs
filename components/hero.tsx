import { NAME } from 'lib/data'
import styles from '../styles/hero.module.scss'
import Navbar from './navbar'

export default function Hero() {
  return (
    <div className={styles.hero}>
      <h1 id="name">
        {NAME}
      </h1>
      <Navbar segment='home' />
    </div>
  )
}