'use client'

import styles from '../styles/hero.module.scss'
import Navbar from './navbar'
import { useEffect, useState, useRef } from 'react'
import palettes from '../styles/themes'
import utilities from '../lib/util'
// import { inter, noto_sans, roboto_mono } from '../app/fonts'

export default function Hero() {
  const [save, setSave] = useState(false);
  const [theme, setTheme] = useState<string>('light');
  const [palette, setPalette] = useState<string>('');
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



  const handleMouse = ({ x, y }) => {
    const { toCartesianCoords } = utilities
    if (save === false) {
      setShadow(toCartesianCoords({ x, y }))
    }
  }

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

  const handleClick = () => setSave(!save)

  const handleKey = ({ key }) => {
    if (musicType || key === 'Escape') {
      setPalette('default')
      setMusicType('')
    }
    if (key.toLowerCase() === 's') {
      setMusicType('/audio/Shrek.mp3')
      setPalette('Shrek')
    }
    if (key.toLowerCase() === 'd') {
      setMusicType('/audio/Doom.mp3')
      setPalette('Doom')
    }
    if (key.toLowerCase() === 'v') {
      setMusicType('/audio/Vapor.mp3')
      setPalette('Vaporwave')
    }
    if (key.toLowerCase() === 'q') {
      setPalette('Queer')
    }
  }

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
    if(!audioElement.current || !audioContext) return
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
    if(!audioElement.current) return
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
      if(!audioElement.current) return
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
    if (palette) {
      const { documentElement: { style } } = document
      for (const [property, value] of Object.entries(palettes[palette])) {
        if (typeof value === 'string') {
          style.setProperty(`--${property}`, value)
        }
      }
    }
  }, [palette]);

  useEffect(() => {
    const { documentElement: { style } } = document
    const { x, y } = factor
    style.setProperty('--factor-x', `calc(${x}em / 16)`)
    style.setProperty('--factor-y', `calc(${y}em / 8)`)

  }, [factor]);

  useEffect(() => {
    const { matches: prefersReducedMotion } = window.matchMedia("(prefers-reduced-motion: reduce)");
    const home = document.getElementById('home')
    if (!home) return
    if (!prefersReducedMotion) {
      home.addEventListener('mousemove', handleMouse)
      home.addEventListener('mouseleave', resetMouse)
      home.addEventListener('touchstart', handleTouch, { passive: true })
      home.onkeyup = handleKey
      home.onclick = (handleClick)
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
      const toggle = document.getElementById('toggle') as HTMLInputElement
      if (!toggle) return
      toggle.checked = prefersDarkScheme
    }
  }, [theme]);

  return (
    <div id="hero" className={`${styles.hero}`}>
      <audio id="audio" ref={audioElement} src=""></audio>
      <form className={styles.form}>
        <input onChange={handleToggle} type="checkbox" name="night-toggle" id="toggle" />
        <label htmlFor="toggle">Toggle {theme} mode</label>
      </form>
      <h1 id="name" className={styles.cmyk}>
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