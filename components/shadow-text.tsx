'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react'
import utilities from '../lib/util'
// import { inter, noto_sans, roboto_mono } from '../app/fonts'
const { setCustomProperties, toCartesianCoords } = utilities

function ShadowText({ children, textClass }) {
  const [save, setSave] = useState(false);
  const currentElement = useRef<HTMLDivElement>(null);


  const handleMouseMove = (event) => {
    const x = (event.clientX - (window.innerWidth / 2)) / (window.innerWidth / 2)
    const y = (event.clientY - (window.innerHeight / 2)) / (window.innerHeight / 2)
    setCustomProperties({
      'mouse-x': `${x}`,
      'mouse-y': `${y}`,
    })
  }


  const setShadow = ({ x, y }) => {
    setCustomProperties({
      'shadow-x': `${x}px`,
      'shadow-y': `${y}px`
    })
  }

  const resetMouse = () => {
    console.log('reset mouse')
    setShadow({ x: 1 / 4, y: 1 / 4 })
    setCustomProperties({
      'factor-x': `calc(1em / 16)`,
      'factor-y': `calc(1em / 8)`
    })
    document.documentElement.style.removeProperty('--_mouse-x')
    document.documentElement.style.removeProperty('--_mouse-y')
    setSave(false)
  }

  const handleTouch = ({ touches }) => {
    const { clientX, clientY } = touches[0]
    const { x, y } = toCartesianCoords({ x: clientX, y: clientY })
    setShadow({
      x: x * 2,
      y: y * 2
    })
  }

  return (
    <div
      style={{height: '100%', width: '100%'}}
      id="shaodw-text"
      ref={currentElement}
      // todo: reduce motion rules
      onMouseLeave={resetMouse}
      onClick={() => setSave(!save)}
      onTouchStart={handleTouch}
      onMouseMove={handleMouseMove}
    className={textClass}
    >
      {children}
    </div>
  )
}

export default ShadowText