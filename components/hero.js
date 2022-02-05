import styles from '../styles/hero.module.scss'
import Navbar from './navbar'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({
    H1: {
      x: 1,
      y: 1
    },
    H2: {
      x: 1,
      y: 1
    }
  })

  const setMouse = (e) => {
    let { x, y, target } = e
    x = x - target.offsetLeft + 1
    y = y - target.offsetTop + 1
    const halfWidth = target.offsetWidth / 2
    const halfHeight = target.offsetHeight / 2
    const xPos = x - halfWidth
    const yPos = y - halfHeight
    const { tagName } = target
    const { height, width } = target.getBoundingClientRect()
    console.log('set mouse', xPos, yPos)
    setMousePosition(state => ({
      ...state,
      [tagName]: {
        x: xPos / width * 2,
        y: yPos / height * 2
      }
    }))
  }

  const resetMouse = (e) => {
    const { tagName } = e.target
    setMousePosition(state => ({
      ...state,
      [tagName]: {
        x: 1,
        y: 1
      }
    }))
  }
  useEffect(() => {
    const h1 = document.querySelector('#hero h1')
    const h2 = document.querySelector('#hero h2')
    h1.addEventListener('mousemove', setMouse)
    h1.addEventListener('mouseleave', resetMouse)
    h2.addEventListener('mousemove', setMouse)
    h2.addEventListener('mouseleave', resetMouse)

    return () => {
      h1.removeEventListener('mousemove', setMouse)
      h1.removeEventListener('mouseleave', resetMouse)
      h2.removeEventListener('mousemove', setMouse)
      h2.removeEventListener('mouseleave', resetMouse)
    };
  }, []);

  return (
    <div id="hero" className={styles.hero}>
      <h1
        style={{
          textShadow: `
            0 ${mousePosition.H1.y * -5}px cyan,
            ${mousePosition.H1.x * -5}px ${mousePosition.H1.y * -5}px magenta,
            ${mousePosition.H1.y * 5}px ${mousePosition.H1.y * -5}px yellow`
        }}
        className={styles.cmyk}
      >
        S.&nbsp;<span>Roberto</span><br />
        Andrade
      </h1>
      <h2
        style={{
          textShadow: `
            0 ${mousePosition.H2.y * -5}px cyan,
            ${mousePosition.H2.x * -5}px ${mousePosition.H2.y * -5}px magenta,
            ${mousePosition.H2.y * 5}px ${mousePosition.H2.y * -5}px yellow`
        }}
        className={styles.cmyk}
      >
        Creative Technologist
      </h2>
      <Navbar home />
      <span style={{ position: 'absolute' }}>
        {JSON.stringify(mousePosition)}
      </span>
    </div>
  )
}