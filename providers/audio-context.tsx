import {
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useRef,
  useState
} from "react";
import usePaletteContext from "hooks/usePaletteContext";
import usePrefersReducedMotion from "hooks/usePreferesReducedMotion";
import palettes from "styles/palettes";
import utilities, { setCustomProperties } from "lib/util/index";
import { animate, useAnimationFrame, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";

type AudioContextType = {
  playing: boolean;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  audioData: MutableRefObject<AnalyserNode | null>;
  startPlaying: () => void;
  stopPlaying: () => void;
}
export const AudioContext = createContext<AudioContextType | undefined>(undefined);

const AudioContextProvider = ({ children }: { children: ReactNode }) => {
  const audioElement = useRef<HTMLAudioElement>(null);
  const audioData = useRef<AnalyserNode | null>(null);
  const [playing, setPlaying] = useState(false);
  const audioContext = useRef<AudioContext | null>(null);
  const { currentPalette } = usePaletteContext();
  const musicType = currentPalette.palette.audio;
  const primaryValue = useMotionValue(0)
  const secondaryValue = useMotionValue(0)
  const tertiaryValue = useMotionValue(0)
  const audioLevel = useMotionValue(0)

  const normalizedPrimaryLevel = useTransform(primaryValue, [0, 1], [0, 1])
  const normalizedSecondaryLevel = useTransform(secondaryValue, [0, 1], [0, 1])
  const normalizedTertiaryLevel = useTransform(tertiaryValue, [0, 1], [0, 1])
  const normalizedAudioLevel = useTransform(audioLevel, [0, 0.5], [0, 1])

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

  const audioAnimation = useCallback((audioData) => {
    // create a new array of 32 bit floating point numbers
    if (!audioData.current) return
    let data = new Float32Array(audioData.current.frequencyBinCount)
    // draw the audio data
    if (!audioData.current) return
    const draw = (data: number) => {
      animate(audioLevel, data, {
        duration: 0.25,
        ease: 'easeOut'
      })
    }
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
    animate(primaryValue, primaryAmp / 2)
    animate(secondaryValue, secondaryAmp / 2)
    animate(tertiaryValue, tertiaryAmp / 2)
  }, [])

  const stopPlaying = useCallback(() => {
    if (!audioElement.current) return
    audioElement.current.pause()
    setPlaying(false)
  }, [setPlaying])

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

  const shouldAnimate = !usePrefersReducedMotion()
  useAnimationFrame((time) => {
    if (!shouldAnimate) return
    if (playing) {
      audioAnimation(audioData)
    } else {
      noAudioAnimation(time)
    }
  })

  useMotionValueEvent(normalizedAudioLevel, 'change', (value) => {
    console.log({ value })
    setCustomProperties({
      'amp-tertiary': String(value),
    })
  })
  useMotionValueEvent(normalizedPrimaryLevel, 'change', (value) => {
    setCustomProperties({
      'amp-primary': String(value),
    })
  })
  useMotionValueEvent(normalizedSecondaryLevel, 'change', (value) => {
    setCustomProperties({
      'amp-secondary': String(value),
    })
  })
  useMotionValueEvent(normalizedTertiaryLevel, 'change', (value) => {
    setCustomProperties({
      'amp-tertiary': String(value),
    })
  })
  return (
    <AudioContext.Provider value={{
      playing,
      setPlaying,
      audioData,
      startPlaying,
      stopPlaying,
    }}>
      {children}
      <audio id="audio" ref={audioElement}></audio>
    </AudioContext.Provider>
  )
}

export default AudioContextProvider;