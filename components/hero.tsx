'use client'

import styles from '../styles/hero.module.scss'
import Navbar from './navbar'
import React, { useEffect, useState, useRef, useCallback } from 'react'
import utilities from '../lib/util'
import useMouseCoordinates from '../hooks/useMouseCoordinates'
import usePrefersReducedMotion from '../hooks/usePreferesReducedMotion'
// import { inter, noto_sans, roboto_mono } from '../app/fonts'
const { setCustomProperties, toCartesianCoords } = utilities

export default function Hero() {
  const [save, setSave] = useState(false);
  const heroElement = useRef<HTMLDivElement>(null);
  const [factor, setFactor] = useState<{
    x: number;
    y: number;
  }>({
    x: 1,
    y: 1
  });

  const reduceMotion = usePrefersReducedMotion();

  const setShadow = ({ x, y }) => {
    console.log('setting shadow')
    setCustomProperties({
      '--shadow-x': `${x}px`,
      '--shadow-y': `${y}px`
    })
  }

  const resetMouse = () => {
    console.log('resetting mouse')
    setShadow({ x: 1 / 4, y: 1 / 4 })
    setFactor({ x: 1, y: 1 })
    setSave(false)
  }


  useEffect(() => {
    console.log('factor changed')
    const { x, y } = factor
    setCustomProperties({
      '--factor-x': `calc(${x}em / 16)`,
      '--factor-y': `calc(${y}em / 8)`
    })

  }, [factor]);


  const handleTouch = ({ touches }) => {
    console.log('touching')
    const { clientX, clientY } = touches[0]
    const { x, y } = toCartesianCoords({ x: clientX, y: clientY })
    setShadow({
      x: x * 2,
      y: y * 2
    })
  }

  const handleScroll = useCallback((event: WheelEvent) => {
    console.log('scrolling')
    event.preventDefault()
    const { deltaX, deltaY } = event
    const { x, y } = factor
    const factorX = x + deltaX / 100
    const factorY = y + deltaY / 100
    setFactor({
      x: factorX,
      y: factorY
    })
  }, [factor])

  const handleClick = () => setSave(!save)
  useEffect(() => {
    const home = heroElement.current
    console.log('adding event listeners')
    if (!home) return

    // todo move reduceMotion to css
    if (!reduceMotion) {
      home.addEventListener('wheel', handleScroll, { passive: false })
    }

    return () => {
      home.removeEventListener('wheel', handleScroll)
    };
  }, [handleScroll, reduceMotion]);

  const coords = useMouseCoordinates(true, reduceMotion);

  useEffect(() => {
    console.log('setting mouse coords')
    setCustomProperties({
      '--mouse-x': String(coords.x),
      '--mouse-y': String(coords.y)
    })
  }, [coords])

  return (
    <div
      ref={heroElement}
      id="hero"
      className={`${styles.hero}`}
      // todo: reduce motion rules
      onMouseLeave={resetMouse}
      onClick={handleClick}
      onTouchStart={handleTouch}
    >
      {/* {coords.x} {coords.y} */}
      <pre>
        reduce motion {reduceMotion ? 'true' : 'false'}
        <br />
        x: {coords.x}
        <br />
        y: {coords.y}
      </pre>
      <h1 id="name" className={styles.cmyk}>
        Ximena
        {/* <span className={`${inter.variable}`}>S.</span>&nbsp;Roberto */}
        <br />
        Andrade
      </h1>
      {/* <h2 className={styles.cmyk}>
        Creative Technologist
      </h2> */}
      {/* <Navbar theme='home' /> */}
    </div>
  )
}