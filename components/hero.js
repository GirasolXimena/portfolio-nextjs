import styles from '../styles/hero.module.scss'
import Navbar from './navbar'
import { useEffect, useState, useRef } from 'react'
import palettes from '../styles/themes'

export default function Hero() {
  const [save, setSave] = useState(false)
  const [theme, setTheme] = useState(undefined)
  const [palette, setPalette] = useState(undefined)
  const [playing, setPlaying] = useState(5)
  const [audio, setAudio] = useState({})
  const [audioContext, setAudioContext] = useState(false)
  const audioElement = useRef(null)
  const [musicType, setMusicType] = useState(undefined)
  let [factor, setFactor] = useState({ x: 1, y: 1 })

  const toCartesianCoords = ({ x, y }) => {
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
    if (save === false) {
      setShadow(toCartesianCoords({ x, y }))
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
    if (musicType || key === 'Escape') {
      setPalette('default')
      setMusicType(undefined)
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
    if (!audioContext) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioContext.createMediaElementSource(audioElement.current)
      const analyzer = audioContext.createAnalyser()
      analyzer.fftSize = 2048
      source.connect(audioContext.destination)
      source.connect(analyzer)
      setAudioContext(audioContext)
      setAudio((audio) => (audio.audioData = analyzer));
    }
  }, [audioContext])

  const startPlaying = () => {
    const { documentElement: { style } } = document
    audioElement.current.src = musicType
    let data = new Float32Array(audio.frequencyBinCount)
    audioElement.current.play()
    audioContext.resume()
    const draw = (data) => {
      style.setProperty('--amp', data * 20)
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
    audioElement.current.pause()
    cancelAnimationFrame(playing)
  }
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
      <audio id="audio" ref={audioElement} src=""></audio>
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