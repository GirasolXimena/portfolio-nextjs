'use client'

import styles from '../styles/hero.module.scss'
import Navbar from './navbar'
import AudioPlayer from './audio-player'
import React, { useEffect, useState, useRef } from 'react'
import utilities from '../lib/util'
import useMouseCoordinates from '../hooks/useMouseCoordinates'
import usePrefersReducedMotion from '../hooks/usePreferesReducedMotion'
// import { inter, noto_sans, roboto_mono } from '../app/fonts'

export default function Hero() {
  const [save, setSave] = useState(false);
  const heroElement = useRef<HTMLDivElement>(null);
  let [factor, setFactor] = useState<{
    x: number;
    y: number;
  }>({
    x: 1,
    y: 1
  });

  const reduceMotion = usePrefersReducedMotion();

  const handleTouch = ({ touches }) => {
    const { clientX, clientY } = touches[0]
    const { x, y } = utilities.toCartesianCoords({x: clientX, y: clientY})
    setShadow({
      x: x * 2,
      y: y * 2
    })
  }

  const handleClick = () => setSave(!save)

  const handleScroll = (event: WheelEvent) => {
    event.preventDefault()
    const { deltaX, deltaY } = event
    const { x, y } = factor
    const factorX = x + deltaX / 100
    const factorY = y + deltaY / 100
    setFactor({
      x: factorX,
      y: factorY
    })
  }





  const resetMouse = () => {
    setShadow({ x: 1 / 4, y: 1 / 4 })
    setFactor({ x: 1, y: 1 })
    setSave(false)
  }

  const setShadow = ({ x, y }) => {
    utilities.setCustomProperties({
      '--shadow-x': `${x}px`,
      '--shadow-y': `${y}px`
    })
  }




  useEffect(() => {
    const { x, y } = factor
    utilities.setCustomProperties({
      '--factor-x': `calc(${x}em / 16)`,
      '--factor-y': `calc(${y}em / 8)`
    })

  }, [factor]);

  useEffect(() => {
    const home = heroElement.current
    if (!home) return
    if (!reduceMotion) {
      // home.addEventListener('mouseleave', resetMouse)
      // home.addEventListener('touchstart', handleTouch, { passive: true })
      // home.addEventListener('click', handleClick)
      home.addEventListener('wheel', handleScroll, { passive: false })
    }

    return () => {
      // home.removeEventListener('mouseleave', resetMouse)
      // home.removeEventListener('touchstart', handleTouch)
      // home.removeEventListener('click', handleClick)
      home.removeEventListener('wheel', handleScroll)
    };
  });

  const coords = useMouseCoordinates(true, reduceMotion);
  return (
    <div
      ref={heroElement}
      id="hero"
      className={`${styles.hero}`}
      onMouseLeave={resetMouse}
      onTouchStart={handleTouch}
      onClick={handleClick}
      // onWheel={handleScroll}
    >
      {/* {coords.x} {coords.y} */}
      <pre>
        reduce motion {reduceMotion ? 'true' : 'false'}
        <br />
        x: {coords.x}
        <br />
        y: {coords.y}
      </pre>
      <AudioPlayer />
      <h1 id="name" className={styles.cmyk} style={{
        '--_mouse-x': coords.x,
        '--_mouse-y': coords.y
      } as React.CSSProperties}>
        Ximena
        {/* <span className={`${inter.variable}`}>S.</span>&nbsp;Roberto */}
        <br />
        Andrade
      </h1>
      {/* <h2 className={styles.cmyk}>
        Creative Technologist
      </h2> */}
      <Navbar theme='home' />
    </div>
  )
}