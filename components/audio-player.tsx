'use client'
import { useCallback, useEffect, useRef, useState } from "react";
import utilities from "../lib/util";
import SoundIcon from "./mute-icon";
import styles from "../styles/audio-player.module.scss"
import { useAnimationFrame } from "framer-motion";
import usePrefersReducedMotion from "@/hooks/usePreferesReducedMotion";

function AudioPlayer({ musicType, segment }: { musicType: string | undefined; segment: string }) {
  const audioElement = useRef<HTMLAudioElement>(null);
  const audioData = useRef<AnalyserNode | null>(null);
  const [playing, setPlaying] = useState<boolean>(false);
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

  const audioAnimation = useCallback((audioData) => {
      // create a new array of 32 bit floating point numbers
  if (!audioData.current) return
  let data = new Float32Array(audioData.current.frequencyBinCount)
  // draw the audio data
  const draw = (data: number) => {
    const val = 0.33 + data / 3
    utilities.setCustomProperties({
      '--amp-primary': String(val),
      '--amp-secondary': String(val),
      '--amp-tertiary': String(val),
    })
  }
  if (!audioData.current) return
  audioData.current.getFloatTimeDomainData(data)
  let sumQuares = 0.0
  for (const ampliltude of data) {
    sumQuares += ampliltude * ampliltude
  }
  const amp = Math.sqrt(sumQuares / data.length)
  draw(amp)
  }, [])

  const noAudioAnimation = useCallback((time: number) => {
    const now = time / 1000

    // Normalize sin and cosine values to [0, 1] range
    const primaryAmp = (Math.sin(2 * Math.PI * now / 15) + 1) / 2;
    const secondaryAmp = (Math.sin(2 * Math.PI * now / 30) + 1) / 2;
    const tertiaryAmp = (Math.sin(2 * Math.PI * now / 60) + 1) / 2;
  
    // Scale and translate to desired range, for example, [1, 1.5]
    const primaryValue = primaryAmp / 2;
    const secondaryValue = secondaryAmp / 2;
    const tertiaryValue = tertiaryAmp / 2;
    utilities.setCustomProperties({
      '--amp-primary': String(primaryValue),
      '--amp-secondary': String(secondaryValue),
      '--amp-tertiary': String(tertiaryValue),
    })
  }, [])

  const startPlaying = () => {
    if (playing || !musicType) return
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
    setPlaying(true)
  }

  const stopPlaying = () => {
    if (!audioElement.current) return
    audioElement.current.pause()
    setPlaying(false)
  }

  const togglePlaying = () => {
    if (playing) {
      stopPlaying()
    } else if (!playing) {
      startPlaying()
    }
  }


  const shouldAnimate = !usePrefersReducedMotion()
  useAnimationFrame((time) => {
    if (!shouldAnimate) return
    if(playing) {
      audioAnimation(audioData)
    } else {
      noAudioAnimation(time)
    }
  })

  useEffect(() => {
    stopPlaying()
  }, [musicType])

  return (
    <div className={`${styles.container} ${styles[segment]}`}>
      {
        !!musicType && (
          <button
            className={`${styles.button}`}
            onClick={togglePlaying}
            data-label={`${playing ? 'mute' : 'audio'}`}
            aria-label={`${playing ? 'stop' : 'play'} audio`}
          >
            <SoundIcon size="36" playing={playing} />
          </button>
        )
      }
      <audio id="audio" ref={audioElement}></audio>
    </div>
  )
}

export default AudioPlayer;