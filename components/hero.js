import styles from '../styles/hero.module.scss'
import Navbar from './navbar'
import { useEffect, useState } from 'react'

export default function Hero() {
  const initialMousePosition = { x: 1 / 2, y: 1 / 2 }

  const [mousePosition, setMousePosition] = useState(initialMousePosition)
  const [save, setSave] = useState(false)

  const [textShadowString, setTextShadowString] = useState({
    textShadow: ``
  })

  const handleMouse = (e) => {
    const offset = document.getElementById('hero').getBoundingClientRect()
    const { width, height } = offset
    const { x, y } = e
    const halfWidth = width / 2
    const halfHeight = height / 2
    const xPos = x - halfWidth
    const yPos = y - halfHeight

    if (!save) {
      setMousePosition({
        x: xPos / width * 2,
        y: yPos / height * 2
      })
    }
  }

  const handleTouch = (e) => {
    const { clientX, clientY } = e.touches[0]
    const offset = document.getElementById('hero').getBoundingClientRect()
    const { width, height } = offset
    const halfWidth = width / 2
    const halfHeight = height / 2
    const xPos = clientX - halfWidth
    const yPos = clientY - halfHeight
    setMousePosition({
      x: xPos / width * 2,
      y: yPos / height * 2
    })
  }

  const handleClick = (e) => save ? setSave(false) : setSave(true)

  const resetMouse = (_e) => setMousePosition(initialMousePosition)

  useEffect(() => {
    const { matches: isReducedMotion } = window.matchMedia("(prefers-reduced-motion: reduce)");
    const home = document.getElementById('home')

    if (!isReducedMotion) {
      home.addEventListener('mousemove', handleMouse)
      home.addEventListener('mouseleave', resetMouse)
      home.addEventListener('touchstart', handleTouch)
      home.addEventListener('click', handleClick)
    }

    return () => {
      const home = document.getElementById('home')
      home.removeEventListener('mousemove', handleMouse)
      home.removeEventListener('mouseleave', resetMouse)
      home.removeEventListener('touchstart', handleTouch)
      home.removeEventListener('click', handleClick)

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