import styles from '../styles/hero.module.scss'
import utilStyles from '../styles/utils.module.scss'
import Navbar from './navbar'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [save, setSave] = useState(false)
  const [theme, setTheme] = useState(undefined)

  const toCartesianCoords = (el, { x, y }) => {
    const { width, height } = el.getBoundingClientRect()
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
      setShadow(hero, toCartesianCoords(hero, { x, y }))
    }
  }

  const setShadow = (el, { x, y }) => {
    el.style.setProperty('--mouse-x', x)
    el.style.setProperty('--mouse-y', y)
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
    const hero = document.getElementById('hero')
    const docStyle = getComputedStyle(document.documentElement);
    const light = docStyle.getPropertyValue('--light')
    const dark = docStyle.getPropertyValue('--dark')
    if (checked) {
      hero.style.setProperty('--background', dark)
      hero.style.setProperty('--text', light)
      setTheme('dark')
    } else {
      hero.style.setProperty('--background', light)
      hero.style.setProperty('--text', dark)
      setTheme('light')
    }
  }

  const handleClick = (_e) => setSave(!save)

  const resetMouse = (_e) => {
    const hero = document.getElementById('hero')
    setShadow(hero, { x: 1 / 4, y: 1 / 4 })
    setSave(false)
  }

  useEffect(() => {
    const { matches: prefersReducedMotion } = window.matchMedia("(prefers-reduced-motion: reduce)");
    const home = document.getElementById('home')
    if (!prefersReducedMotion) {
      home.addEventListener('mousemove', handleMouse)
      home.addEventListener('mouseleave', resetMouse)
      home.addEventListener('touchstart', handleTouch)
      home.addEventListener('click', handleClick)
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
      <h1 className={styles.cmyk}>
        S.&nbsp;<span>Roberto</span>
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