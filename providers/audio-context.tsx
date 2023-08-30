import {
  MutableRefObject,
  ReactNode,
  createContext,
  useCallback,
  useRef,
} from "react";
import usePrefersReducedMotion from "hooks/usePreferesReducedMotion";
import { setCustomProperties } from "lib/util/index";
import {
  animate,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
  useTransform
} from "framer-motion";
import useAudioControl, { AudioDataType, UseAudioControlReturn } from "hooks/useAudioControl";

type AudioContextType = {
  playing: boolean;
  audioData: MutableRefObject<AnalyserNode | null>;
  startPlaying: () => void;
  stopPlaying: () => void;
}

type AudioContextProviderProps = {
  children: ReactNode;
  audioControlHook?: () => UseAudioControlReturn;
}

export const AudioContext = createContext<AudioContextType | undefined>(undefined);

const setAmpProperty = (value: number, property: string) => {
  setCustomProperties({
    [`amp-${property}`]: String(value),
  })
}

const AudioContextProvider = ({ children, audioControlHook = useAudioControl }: AudioContextProviderProps) => {
  const dataArrayRef = useRef<Float32Array | null>(null)
  const {
    playing,
    audioData,
    startPlaying,
    stopPlaying
  } = audioControlHook()
  const primaryValue = useMotionValue(0)
  const secondaryValue = useMotionValue(0)
  const tertiaryValue = useMotionValue(0)
  const audioLevel = useMotionValue(0)

  const normalizedPrimaryLevel = useTransform(primaryValue, [0, 1], [0, 1])
  const normalizedSecondaryLevel = useTransform(secondaryValue, [0, 1], [0, 1])
  const normalizedTertiaryLevel = useTransform(tertiaryValue, [0, 1], [0, 1])
  const normalizedAudioLevel = useTransform(audioLevel, [0, 0.5], [0, 1])

  const audioAnimation = useCallback((audioData: AudioDataType) => {
    // create a new array of 32 bit floating point numbers
    if (!audioData.current) return
    if (!dataArrayRef.current) {
      dataArrayRef.current = new Float32Array(audioData.current.fftSize)
    }
    // draw the audio data
    const draw = (data: number) => {
      animate(audioLevel, data, {
        duration: 0.25,
        ease: 'easeOut'
      })
    }
    if(!audioData.current) return
    audioData.current.getFloatTimeDomainData(dataArrayRef.current)
    let sumQuares = 0.0
    for (const ampliltude of dataArrayRef.current) {
      sumQuares += ampliltude * ampliltude
    }
    const amp = Math.sqrt(sumQuares / dataArrayRef.current.length)
    draw(amp)
  }, [audioLevel])

  const noAudioAnimation = useCallback((time: number) => {
    const PRIMARY_ANIMATION_PERIOD = 15;
    const SECONDARY_ANIMATION_PERIOD = 30;
    const TERTIARY_ANIMATION_PERIOD = 60;
    const now = time / 1000

    // Normalize sin and cosine values to [0, 1] range
    const primaryAmp = (Math.sin(2 * Math.PI * now / PRIMARY_ANIMATION_PERIOD) + 1) / 2;
    const secondaryAmp = (Math.sin(2 * Math.PI * now / SECONDARY_ANIMATION_PERIOD) + 1) / 2;
    const tertiaryAmp = (Math.sin(2 * Math.PI * now / TERTIARY_ANIMATION_PERIOD) + 1) / 2;

    // Scale and translate to desired range, for example, [1, 1.5]
    animate(primaryValue, primaryAmp / 2)
    animate(secondaryValue, secondaryAmp / 2)
    animate(tertiaryValue, tertiaryAmp / 2)
  }, [primaryValue, secondaryValue, tertiaryValue])

  const shouldAnimate = !usePrefersReducedMotion()
  useAnimationFrame((time) => {
    if (!shouldAnimate) return
    if (playing) {
      audioAnimation(audioData)
    } else {
      noAudioAnimation(time)
    }
  })

  useMotionValueEvent(normalizedAudioLevel, 'change',
    (value) => setAmpProperty(value, 'tertiary'));
  useMotionValueEvent(normalizedPrimaryLevel, 'change',
    (value) => setAmpProperty(value, 'primary'));
  useMotionValueEvent(normalizedSecondaryLevel, 'change',
    (value) => setAmpProperty(value, 'secondary'));
  useMotionValueEvent(normalizedTertiaryLevel, 'change',
    (value) => setAmpProperty(value, 'tertiary'));

  return (
    <AudioContext.Provider value={{
      playing,
      audioData,
      startPlaying,
      stopPlaying,
    }}>
      {children}
    </AudioContext.Provider>
  )
}

export default AudioContextProvider;
