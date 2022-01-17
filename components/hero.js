import styles from '../styles/hero.module.scss'
import Navbar from './navbar'
import Canvas from '../components/canvas'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [size, setSize] = useState({ width: 0, height: 0 })

  const changeSize = () => {
    const { height, width } = document.getElementById('canvas').getBoundingClientRect()
    setSize({
      width,
      height
    })
  }
  useEffect(() => {
      window.addEventListener('resize', changeSize)
      changeSize()
    return () => {
      window.removeEventListener('resize', changeSize)
    }
  }, [size.width, size.height])
  return (
    <div className={styles.hero}>
      <h1>S.&nbsp;Roberto<br />Andrade</h1>
      <h2>Creative Technologist</h2>
      <Canvas id="canvas" width={size.width} height={size.height} fromx={size.width / 5} fromy={size.height * 18 / 32 } tox={size.width * 3 / 4} toy={size.height * 18 / 32} headlen={10} />
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