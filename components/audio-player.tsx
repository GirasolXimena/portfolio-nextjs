'use client'
import { useRef, useState } from "react";
import utilities from "../lib/util";
import SoundIcon from "./mute-icon";
import styles from "../styles/audio-player.module.scss"

function AudioPlayer({ musicType, segment }: { musicType: string | undefined ; segment: string | null }) {
  const audioElement = useRef<HTMLAudioElement>(null);
  const audioData = useRef<AnalyserNode | null>(null);
  const [playing, setPlaying] = useState<number>(0);
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
    // create a new array of 32 bit floating point numbers
    let data = new Float32Array(audioData.current.frequencyBinCount)
    // draw the audio data
    const draw = (data: number) => {
      const val = data * 20
      utilities.setCustomProperties({ '--amp': String(val) })
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
      setPlaying(id)
    }
    const id = requestAnimationFrame(loop)
    setPlaying(id);

  }

  const stopPlaying = () => {
    if (!audioElement.current) return
    audioElement.current.pause()
    cancelAnimationFrame(playing)
    setPlaying(0)
  }

  return (
    <div className={`${styles.container} ${!segment && styles.home}`}>
      {
        !!musicType && (
          <button
            className={`${styles.button} ${playing && 'playing'}` }
            onClick={playing ? stopPlaying : startPlaying}
            data-label={`${playing ? 'mute' : 'audio'}`}
            aria-label={`${playing ? 'stop' : 'play'} audio`}
          >
            <SoundIcon size="36" playing={Boolean(playing)} />
          </button>
        )
      }
      <audio id="audio" ref={audioElement}></audio>
    </div>
  )
}

export default AudioPlayer;