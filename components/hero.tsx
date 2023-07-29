'use client'

import styles from '../styles/hero.module.scss'
import Navbar from './navbar'
import React, { useEffect, useState, useRef } from 'react'
import utilities from '../lib/util'
import useMouseCoordinates from '../hooks/useMouseCoordinates'
import usePrefersReducedMotion from '../hooks/usePreferesReducedMotion'
// import { inter, noto_sans, roboto_mono } from '../app/fonts'

export default function Hero() {
  const [save, setSave] = useState(false);
  const [playing, setPlaying] = useState<number>(5);
  const [audio, setAudio] = useState<any>({});
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const audioElement = useRef<HTMLAudioElement>(null);
  const [musicType, setMusicType] = useState<string>('');
  let [factor, setFactor] = useState<{
    x: number;
    y: number;
  }>({
    x: 1,
    y: 1
  });

  const reduceMotion = usePrefersReducedMotion();
  // const reduceMotion = false;
  const handleTouch = ({ touches }) => {
    const hero = document.getElementById('hero')
    if (!hero) return
    const { width, height } = hero.getBoundingClientRect()
    const { clientX, clientY } = touches[0]
    const halfWidth = width / 2
    const halfHeight = height / 2
    const xPos = clientX - halfWidth
    const yPos = clientY - halfHeight
    setShadow({
      x: xPos / width * 2,
      y: yPos / height * 2
    })
  }

  const handleClick = () => setSave(!save)

  const handleScroll = (e: WheelEvent) => {
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

  const startPlaying = () => {
    const { documentElement: { style } } = document
    if (!audioElement.current || !audioContext) return
    audioElement.current.src = musicType
    let data = new Float32Array(audio.frequencyBinCount)
    audioElement.current.play()
    // if(!audioContext) return
    audioContext.resume()
    const draw = (data) => {
      const val = data * 20
      style.setProperty('--amp', String(val))
    }
    const loop = () => {
      audio.getFloatTimeDomainData(data)
      let sumQuares = 0.0
      for (const ampliltude of data) {
        sumQuares += ampliltude * ampliltude
      }
      const amp = Math.sqrt(sumQuares / data.length)
      draw(amp)
      if (musicType) {
        const id = requestAnimationFrame(loop)
        setPlaying(id)
      }
    }
    const id = requestAnimationFrame(loop)
    setPlaying(id);

  }

  const stopPlaying = () => {
    if (!audioElement.current) return
    audioElement.current.pause()
    cancelAnimationFrame(playing)
  }

  const resetMouse = () => {
    setShadow({ x: 1 / 4, y: 1 / 4 })
    setFactor({ x: 1, y: 1 })
    setSave(false)
  }

  const setShadow = ({ x, y }) => {
    const { documentElement: { style } } = document
    style.setProperty('--mouse-x', x)
    style.setProperty('--mouse-y', y)
  }

  useEffect(() => {
    if (!audioContext) {
      const audioContext = new window.AudioContext();
      if (!audioElement.current) return
      const source = audioContext.createMediaElementSource(audioElement.current)
      const analyzer = audioContext.createAnalyser()
      analyzer.fftSize = 2048
      source.connect(audioContext.destination)
      source.connect(analyzer)
      setAudioContext(audioContext)
      setAudio((audio) => (audio.audioData = analyzer));
    }
  }, [audioContext])

  useEffect(() => {
    if (musicType) {
      startPlaying()
    } else {
      stopPlaying()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [musicType])

  useEffect(() => {
    const { documentElement: { style } } = document
    const { x, y } = factor
    style.setProperty('--factor-x', `calc(${x}em / 16)`)
    style.setProperty('--factor-y', `calc(${y}em / 8)`)

  }, [factor]);

  useEffect(() => {
    const home = document.getElementById('home')
    if (!home) return
    if (!reduceMotion) {
      home.addEventListener('mouseleave', resetMouse)
      home.addEventListener('touchstart', handleTouch, { passive: true })
      home.addEventListener('click', handleClick)
      home.addEventListener('wheel', handleScroll, { passive: false })
    }

    return () => {
      home.removeEventListener('mouseleave', resetMouse)
      home.removeEventListener('touchstart', handleTouch)
      home.removeEventListener('click', handleClick)
      home.removeEventListener('wheel', handleScroll)
    };
  });

  const coords = useMouseCoordinates(true, reduceMotion);
  return (
    <div id="hero" className={`${styles.hero}`}>
      {/* {coords.x} {coords.y} */}
      <pre>
        reduce motion {reduceMotion ? 'true' : 'false'}
        <br />
        x: {coords.x}
        <br />
        y: {coords.y}
      </pre>
      <audio id="audio" ref={audioElement} src=""></audio>
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