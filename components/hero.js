import styles from '../styles/hero.module.scss'
import Navbar from './navbar'
import { useEffect, useState } from 'react'
import palettes from '../styles/themes'

export default function Hero() {
  const [save, setSave] = useState(false)
  const [theme, setTheme] = useState(undefined)
  let [factor, setFactor] = useState({ x: 1, y: 1 })
  const [palette, setPalette] = useState(undefined)

  const toCartesianCoords = (el, { x, y }) => {
    const { width, height } = document.documentElement.getBoundingClientRect()
    const halfWidth = width / 2
    const halfHeight = height / 2
    const xPos = x - halfWidth
    const yPos = y - halfHeight
    return {
      x: xPos / width,
      y: yPos / height
    }
  }

  const handleMouse = ({ x, y }) => {
    const hero = document.getElementById('hero')
    if (save === false) {
      setShadow(toCartesianCoords(hero, { x, y }))
    }
  }

  const setShadow = ({ x, y }) => {
    const { documentElement: { style } } = document
    style.setProperty('--mouse-x', x)
    style.setProperty('--mouse-y', y)
  }

  const handleTouch = ({ touches }) => {
    const { width, height } = document.getElementById('hero').getBoundingClientRect()
    const { clientX, clientY } = touches[0]
    const halfWidth = width / 2
    const halfHeight = height / 2
    const xPos = clientX - halfWidth
    const yPos = clientY - halfHeight
    setMousePosition({
      x: xPos / width * 2,
      y: yPos / height * 2
    })
  }

  const handleToggle = ({ target: { checked } }) => {
    const { documentElement: { style } } = document

    if (checked) {
      style.setProperty('--background', 'var(--_dark)')
      style.setProperty('--text', 'var(--_light)')
      setTheme('dark')
    } else {
      style.setProperty('--background', 'var(--_light)')
      style.setProperty('--text', 'var(--_dark)')
      setTheme('light')
    }
  }

  const handleClick = (_e) => setSave(!save)

  const handleKey = ({ key }) => {
    if (key.toLowerCase() === 's') {
      setPalette('Shrek')
    }
    if (key.toLowerCase() === 'd') {
      setPalette('Doom')
    }
    if (key.toLowerCase() === 'v') {
      setPalette('Vaporwave')
    }
    if (key.toLowerCase() === 'q') {
      setPalette('Queer')
    }
    if (key === 'Escape') {
      setPalette('default')
    }
  }

  const handleScroll = (e) => {
    e.preventDefault()
    const { deltaX, deltaY } = e
    const { x, y } = factor
    const factorX = x + deltaX / 100
    const factorY = y + deltaY / 100
    setFactor({
      x: factorX,
      y: factorY
    })
  }

  useEffect(() => {
    if (palette) {
      const { documentElement: { style } } = document
      for (const [property, value] of Object.entries(palettes[palette])) {
        style.setProperty(`--${property}`, value)
      }
    }
  }, [palette]);

  useEffect(() => {
    const { documentElement: { style } } = document
    const { x, y } = factor
    style.setProperty('--factor-x', `calc(${x}em / 16)`)
    style.setProperty('--factor-y', `calc(${y}em / 8)`)

  }, [factor]);


  const resetMouse = (_e) => {
    setShadow({ x: 1 / 4, y: 1 / 4 })
    setFactor({ x: 1, y: 1 })
    setSave(false)
  }

  useEffect(() => {
    const { matches: prefersReducedMotion } = window.matchMedia("(prefers-reduced-motion: reduce)");
    const home = document.getElementById('home')
    if (!prefersReducedMotion) {
      home.addEventListener('mousemove', handleMouse)
      home.addEventListener('mouseleave', resetMouse)
      home.addEventListener('touchstart', handleTouch)
      home.onkeyup = handleKey
      home.onclick = ('click', handleClick)
      home.onwheel = handleScroll
    }

    return () => {
      home.removeEventListener('mousemove', handleMouse)
      home.removeEventListener('mouseleave', resetMouse)
      home.removeEventListener('touchstart', handleTouch)
      home.removeEventListener('click', handleClick)
    };
  });

  useEffect(() => {
    if (theme === undefined) {
      const { matches: prefersDarkScheme } = window.matchMedia("(prefers-color-scheme: dark)");
      const toggle = document.getElementById('toggle')
      toggle.checked = prefersDarkScheme
    }
  }, [theme]);

  return (
    <div id="hero" className={`${styles.hero}`}>
      <form className={styles.form}>
        <input onChange={handleToggle} type="checkbox" name="night-toggle" id="toggle" />
        <label htmlFor="toggle">Toggle {theme} mode</label>
      </form>
      <h1 id="name" className={styles.cmyk}>
        <span>S.</span>&nbsp;Roberto
        <br />
        Andrade
      </h1>
      <h2 className={styles.cmyk}>
        Creative Technologist
      </h2>
      <Navbar home />
    </div>
  )
}