import styles from '../styles/hero.module.scss'
import Navbar from './navbar'
import { useEffect, useState } from 'react'

export default function Hero() {
  const initialMousePosition = { x: 1 / 2, y: 1 / 2 }

  const [mousePosition, setMousePosition] = useState(initialMousePosition)
  const [textShadowString, setTextShadowString] = useState({
    textShadow: ``
  })

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
    setMousePosition(initialMousePosition)
  }
  useEffect(() => {
    const hero = document.getElementById('hero')
    hero.addEventListener('mousemove', setMouse)
    hero.addEventListener('mouseleave', resetMouse)

    return () => {
      hero.removeEventListener('mousemove', setMouse)
      hero.removeEventListener('mouseleave', resetMouse)
    };
  });

  useEffect(() => {
    const { x, y } = mousePosition
    setTextShadowString({
      textShadow: `${x / 32}em ${y / 16}em 2.5px yellow, ${x / 16}em ${y / -32}em 2.5px magenta, ${x / -16}em ${y / -32}em 2.5px cyan`
    })
  }, [mousePosition])


  return (
    <div id="hero" className={styles.hero}>
      <h1
        style={textShadowString}
        className={styles.cmyk}
      >
        S.&nbsp;<span>Roberto</span><br />
        Andrade
      </h1>
      <h2
        style={textShadowString}
        className={styles.cmyk}
      >
        Creative Technologist
      </h2>
      <Navbar home />
    </div>
  )
}