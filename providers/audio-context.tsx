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
import { useBoolean, useUpdateEffect } from "usehooks-ts";

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
  const { value: animating, setTrue: setAnimatingTrue } = useBoolean(false)
  const {
    playing,
    audioData,
    startPlaying,
    stopPlaying
  } = audioControlHook()
  const audioLevel = useMotionValue(0)

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

  const shouldAnimate = !usePrefersReducedMotion() && animating
  useAnimationFrame((time) => {
    if (!shouldAnimate) return
    if (playing) {
      audioAnimation(audioData)
    } else {
      audioLevel.set(0)
    }
  })

  useMotionValueEvent(normalizedAudioLevel, 'change',
    (value) => setAmpProperty(value, 'audio'));

  useUpdateEffect(() => {
    setAnimatingTrue()
  })

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
