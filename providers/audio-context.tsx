'use client'
import {
  ReactNode,
  createContext,
  useCallback,
  useRef,
} from "react";
import usePrefersReducedMotion from "hooks/usePreferesReducedMotion";
import { setCustomProperties } from "lib/util/index";
import {
  animate,
  useMotionValue,
  useMotionValueEvent,
  useTransform
} from "framer-motion";
import useAudioControl, { HookOptions, PlayFunction, UseAudioControlReturn } from "hooks/useAudioControl";
import { useUpdateEffect } from "usehooks-ts";
import usePaletteContext from "hooks/usePaletteContext";

type AudioContextType = {
  playing: boolean;
  analyser: AnalyserNode | null;
  startPlaying: PlayFunction;
  stopPlaying: () => void;
  loading: boolean;
}

type AudioContextProviderProps = {
  children: ReactNode;
  audioControlHook?: (src: string | string[] | undefined, options?: HookOptions) => UseAudioControlReturn;
}

export const AudioContext = createContext<AudioContextType | undefined>(undefined);

const setAmpProperty = (value: number, property: string) => {
  setCustomProperties({
    [`amp-${property}`]: String(value),
  })
}

const AudioContextProvider = ({ children, audioControlHook = useAudioControl }: AudioContextProviderProps) => {
  const dataArrayRef = useRef<Uint8Array | null>(null)
  const frameIdRef = useRef<number | null>(null)
  const { currentPalette } = usePaletteContext()
  const src = currentPalette.palette.audio
  const {play,  playing, analyser, pause, loading } = audioControlHook(src, {
    interrupt: true
  })
  const audioLevel = useMotionValue(0)

  const normalizedAudioLevel = useTransform(audioLevel, [120, 140], [0, 1.75])
  const shouldAnimate = !usePrefersReducedMotion()

  const getRMS = useCallback((dataArray: Uint8Array) => {
    let sumSquares = 0.0;
    for (const amplitude of dataArray) {
      sumSquares += amplitude * amplitude;
    }
    return Math.sqrt(sumSquares / dataArray.length);
  }, [])

  const audioAnimation = useCallback(() => {
    // need an analyser to get audio data
    if (!analyser) return
    // create new Uint8Array for audio data if first time
    if (!dataArrayRef.current) {
      dataArrayRef.current = new Uint8Array(analyser.fftSize);
    }


    // get byte data is faster than get float data
    analyser.getByteTimeDomainData(dataArrayRef.current);

    const rms = getRMS(dataArrayRef.current)

    animate(audioLevel, rms, {
      duration: 0.25,
      ease: 'easeOut'
    })


    // if audio is playing, request next frame
    if (playing && shouldAnimate) {
      frameIdRef.current = requestAnimationFrame(() => audioAnimation());
    }

  }, [playing, shouldAnimate, audioLevel, analyser, getRMS])

  useUpdateEffect(() => {
    function cleanup() {
      audioLevel.set(0)
      if (frameIdRef.current !== null) {
        // cancel frame with newest id
        cancelAnimationFrame(frameIdRef.current);
        frameIdRef.current = null;
      }
    }
    if (playing && shouldAnimate) {
      audioAnimation()
    } else {
      cleanup()
    }

    return cleanup

  }, [playing])


  // set audio level property
  // with latest audio level
  useMotionValueEvent(normalizedAudioLevel, 'change',
    (value) => setAmpProperty(value, 'audio'));

  return (
    <AudioContext.Provider value={{
      playing,
      analyser,
      startPlaying: play,
      stopPlaying: pause,
      loading
    }}>
      {children}
    </AudioContext.Provider>
  )
}

export default AudioContextProvider;
