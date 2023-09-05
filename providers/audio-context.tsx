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
import useAudioControl, { HookOptions, UseAudioControlReturn } from "hooks/useAudioControl";
import { useUpdateEffect } from "usehooks-ts";
import usePaletteContext from "hooks/usePaletteContext";

type AudioContextType = {
  playing: boolean;
  audioData: AnalyserNode | null;
  startPlaying: () => void;
  stopPlaying: () => void;
}

type AudioContextProviderProps = {
  children: ReactNode;
  audioControlHook?: (src: string | string[], options?: HookOptions) => UseAudioControlReturn;
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
  const src = currentPalette.palette.audio || ''
  const [play, { playing, audioData, pause }] = audioControlHook(src, {
    interrupt: true,
  })
  const audioLevel = useMotionValue(0)

  const normalizedAudioLevel = useTransform(audioLevel, [120, 140], [0, 1.75])
  const shouldAnimate = !usePrefersReducedMotion()

  const audioAnimation = useCallback((audioData) => {
    // need audioData to exist to analyze it
    if (!audioData) return
    // create new Uint8Array for audio data if first time
    if (!dataArrayRef.current) {
      dataArrayRef.current = new Uint8Array(audioData.fftSize);
    }


    // get byte data is faster than get float data
    audioData.getByteTimeDomainData(dataArrayRef.current);

    // calculate rms
    let sumSquares = 0.0;
    for (const amplitude of dataArrayRef.current) {
      sumSquares += amplitude * amplitude;
    }

    const rms = Math.sqrt(sumSquares / dataArrayRef.current.length);
    animate(audioLevel, rms, {
      duration: 0.25,
      ease: 'easeOut'
    })


    // if audio is playing, request next frame
    if (playing && shouldAnimate) {
      frameIdRef.current = requestAnimationFrame(() => audioAnimation(audioData));
    }

  }, [playing, shouldAnimate, audioLevel])

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
      audioAnimation(audioData)
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
      audioData: audioData,
      startPlaying: play,
      stopPlaying: pause,
    }}>
      {children}
    </AudioContext.Provider>
  )
}

export default AudioContextProvider;
