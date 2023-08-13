import styles from '../styles/hero.module.scss'
import Navbar from './navbar'

export default function Hero() {
  const name = process.env.NAME || 'Katerina Solensan'
  return (
    <div className={styles.hero}>
      <h1 id="name">
        {name}
      </h1>
      <Navbar segment='home' />
    </div>
  )
}