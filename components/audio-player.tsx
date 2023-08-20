'use client'
import { useEffect, useRef, useState } from "react";
import utilities from "../lib/util";
import SoundIcon from "./mute-icon";
import styles from "../styles/audio-player.module.scss"

function AudioPlayer({ musicType, segment }: { musicType: string | undefined; segment: string }) {
  const audioElement = useRef<HTMLAudioElement>(null);
  const audioData = useRef<AnalyserNode | null>(null);
  const [animation, setAnimation] = useState<number>(0);
  const playing = useRef<boolean>(false);
  const now = useRef<number>(0);
  const audioContext = useRef<AudioContext | null>(null);

  const createAudioContext = () => {
    audioContext.current = new window.AudioContext();
    if (!audioElement.current) return
    const source = audioContext.current.createMediaElementSource(audioElement.current)
    const analyzer = audioContext.current.createAnalyser()
    analyzer.fftSize = 2048
    source.connect(audioContext.current.destination)
    source.connect(analyzer)
    audioData.current = analyzer
  }

  const startPlaying = () => {
    cancelAnimationFrame(animation)
    setAnimation(0)
    if(playing.current) return
    if (!musicType) return
    // if there is no audio element or audio context, create them
    if (!audioContext.current) {
      createAudioContext()
    }
    // audioData is created in createAudioContext
    if (!audioElement.current || !audioData.current) return
    // set the source of the audio element to the music type
    audioElement.current.src = musicType
    // 
    audioElement.current.play()
    playing.current = true
    // create a new array of 32 bit floating point numbers
    let data = new Float32Array(audioData.current.frequencyBinCount)
    // draw the audio data
    const draw = (data: number) => {
      const val = 1.5 + data / 10
      utilities.setCustomProperties({
        '--amp-primary': String(val),
        '--amp-secondary': String(val),
        '--amp-tertiary': String(val),
      })
    }

    const loop = () => {
      if (!audioData.current) return
      audioData.current.getFloatTimeDomainData(data)
      let sumQuares = 0.0
      for (const ampliltude of data) {
        sumQuares += ampliltude * ampliltude
      }
      const amp = Math.sqrt(sumQuares / data.length)
      draw(amp)
      const id = requestAnimationFrame(loop)
      setAnimation(id)
    }
    const id = requestAnimationFrame(loop)
    setAnimation(id);

  }

  const stopPlaying = () => {
    if (!audioElement.current) return
    audioElement.current.pause()
    cancelAnimationFrame(animation)
    setAnimation(0);
    playing.current = false

    function updateAmpValues() {
      now.current += 1 / 90
      
      // Normalize sin and cosine values to [0, 1] range
      const primaryAmp = (Math.sin(2 * Math.PI * now.current / 15) + 1) / 2;
      const secondaryAmp = (Math.sin(2 * Math.PI * now.current / 30) + 1) / 2;
      const tertiaryAmp = (Math.sin(2 * Math.PI * now.current / 60) + 1) / 2;
  
      // Scale and translate to desired range, for example, [1, 1.5]
      const primaryValue = 1 + 0.5 * primaryAmp;
      const secondaryValue = 1 + 0.5 * secondaryAmp;
      const tertiaryValue = 1 + 0.5 * tertiaryAmp;
      document.documentElement.style.setProperty('--amp-primary', String(primaryValue));
      document.documentElement.style.setProperty('--amp-secondary', String(secondaryValue));
      document.documentElement.style.setProperty('--amp-tertiary', String(tertiaryValue));
  }

    const loop = () => {
      updateAmpValues()
      const id = requestAnimationFrame(loop)
      setAnimation(id)
    }
    const id = requestAnimationFrame(loop)
    setAnimation(id)
  }


  useEffect(() => {
    stopPlaying()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [musicType])

  return (
    <div className={`${styles.container} ${styles[segment]}`}>
      {
        !!musicType && (
          <button
            className={`${styles.button} ${animation && 'playing'}`}
            onClick={playing.current ? stopPlaying : startPlaying}
            data-label={`${animation ? 'mute' : 'audio'}`}
            aria-label={`${animation ? 'stop' : 'play'} audio`}
          >
            <SoundIcon size="36" playing={playing.current} />
          </button>
        )
      }
      <audio id="audio" ref={audioElement}></audio>
    </div>
  )
}

export default AudioPlayer;