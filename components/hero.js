import styles from '../styles/hero.module.scss'
import Navbar from './navbar'
import Canvas from '../components/canvas'

export default function Hero() {
  return (
    <div className={styles.hero}>
      <h1>S.&nbsp;Roberto<br />Andrade</h1>
      <h2>Creative Technologist</h2>
      <Canvas />
      <Navbar home />
      <span className={styles.blackUnderline} />
      <span className={styles.redUnderline} />
      <button className={styles.cta}>
        <div>download</div>
        <div>resume</div>
      </button>
      <button className={styles.contact}>
        contact me
      </button>
    </div>
  )
}