'use client'
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
import { useBoolean, useEffectOnce, useUpdateEffect } from "usehooks-ts";

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
  const audioWorkerRef = useRef<Worker | null>(null)
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
      dataArrayRef.current = new Float32Array(audioData.current.fftSize);
    }


    audioData.current.getFloatTimeDomainData(dataArrayRef.current);

    const clonedBuffer = dataArrayRef.current.buffer.slice(0);

    audioWorkerRef.current?.postMessage({
      type: 'GET_AUDIO_DATA',
      data: clonedBuffer
  }, [clonedBuffer]);
  
  }, [])

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

  useEffectOnce(() => {
    audioWorkerRef.current = new Worker('/workers/audioWorker.js');

    audioWorkerRef.current.onmessage = (e) => {
      const { type, rms } = e.data;

      switch (type) {
        case 'AUDIO_RMS_DATA':
          animate(audioLevel, rms, {
            duration: 0.25,
            ease: 'easeOut'
          })
          break;
      }
    }

    return () => {
      if(audioWorkerRef.current) {
        audioWorkerRef.current.terminate();
        audioWorkerRef.current = null;
      }
    }
});

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
