'use client'
import { useRef, useState } from "react";
import utilities from "../lib/util";

function AudioPlayer({ musicType }: { musicType: string | undefined }) {
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
    <div className="audio-container" style={{width: '60px', height: '30px', backgroundColor: 'gray' }}>
      {
        !!musicType && (
          <>
            {
              playing ?
              <button onClick={stopPlaying}>Stop</button> :
              <button onClick={startPlaying}>Play</button>
            }

          </>
        )
      }
      <audio id="audio" ref={audioElement}></audio>
    </div>
  )
}

export default AudioPlayer;