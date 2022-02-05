import styles from '../styles/hero.module.scss'
import Navbar from './navbar'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 1, y: 1 })

  const setMouse = (e) => {
    const offset = document.getElementById('hero').getBoundingClientRect()
    const { left, top, width, height } = offset
    const { clientX, clientY } = e
    const x = clientX - left
    const y = clientY - top
    const halfWidth = width / 2
    const halfHeight = height / 2
    const xPos = x - halfWidth
    const yPos = y - halfHeight
    setMousePosition({
      x: xPos / width * 2,
      y: yPos / height * 2
    })
  }

  const resetMouse = (_e) => {
    setMousePosition({
      x: 1,
      y: 1
    })
  }
  useEffect(() => {
    const hero = document.getElementById('hero')
    hero.addEventListener('mousemove', setMouse)
    hero.addEventListener('mouseleave', resetMouse)

    return () => {
      hero.removeEventListener('mousemove', setMouse)
      hero.removeEventListener('mouseleave', resetMouse)
    };
  }, []);

  return (
    <div id="hero" className={styles.hero}>
      <h1
        style={{
          textShadow: `
            ${mousePosition.y * 5}px ${mousePosition.y * -5}px yellow,
            0 ${mousePosition.y * -5}px cyan,
            ${mousePosition.x * -5}px ${mousePosition.y * -5}px magenta
            `
        }}
        className={styles.cmyk}
      >
        S.&nbsp;<span>Roberto</span><br />
        Andrade
      </h1>
      <h2
        style={{
          textShadow: `
            ${mousePosition.y * 5}px ${mousePosition.y * -5}px yellow,
            0 ${mousePosition.y * -5}px cyan,
            ${mousePosition.x * -5}px ${mousePosition.y * -5}px magenta
            `
        }}
        className={styles.cmyk}
      >
        Creative Technologist
      </h2>
      <Navbar home />
      <span style={{ position: 'fixed', top: 0, left: 0 }}>
        {JSON.stringify(mousePosition)}
      </span>
    </div>
  )
}