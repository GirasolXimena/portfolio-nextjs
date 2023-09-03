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
  useMotionValue,
  useMotionValueEvent,
  useTransform
} from "framer-motion";
import useAudioControl, { AudioDataType, UseAudioControlReturn } from "hooks/useAudioControl";
import { useEffectOnce, useIsomorphicLayoutEffect } from "usehooks-ts";

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
  const dataArrayRef = useRef<Uint8Array | null>(null)
  const audioWorkerRef = useRef<Worker | null>(null)
  const frameIdRef = useRef<number | null>(null)
  const {
    playing,
    audioData,
    startPlaying,
    stopPlaying
  } = audioControlHook()
  const audioLevel = useMotionValue(0)

  const normalizedAudioLevel = useTransform(audioLevel, [120, 140], [0, 1.75])
  const shouldAnimate = !usePrefersReducedMotion()

  const audioAnimation = useCallback((audioData: AudioDataType) => {
    // need audioData to exist to analyze it
    if (!audioData.current) return
    // create new Uint8Array for audio data if first time
    if (!dataArrayRef.current) {
      dataArrayRef.current = new Uint8Array(audioData.current.fftSize);
    }


    // get byte data is faster than get float data
    audioData.current.getByteTimeDomainData(dataArrayRef.current);

    // clone buffer to avoid transferable error
    const clonedBuffer = dataArrayRef.current.buffer.slice(0);

    // send data to worker
    audioWorkerRef.current?.postMessage({
      type: 'GET_AUDIO_DATA',
      data: clonedBuffer
    }, [clonedBuffer]);

    // if audio is playing, request next frame
    if (playing && shouldAnimate) {
      frameIdRef.current = requestAnimationFrame(() => audioAnimation(audioData));
    }

  }, [playing, shouldAnimate])


  useIsomorphicLayoutEffect(() => {
    // if audio is playing, request frame
    if (playing && shouldAnimate) {
      audioAnimation(audioData)
    }

    return () => {
      audioLevel.set(0)
      if (frameIdRef.current !== null) {
        // cancel frame with newest id
        cancelAnimationFrame(frameIdRef.current);
        frameIdRef.current = null;
      }
    }
  }, [playing, shouldAnimate, audioAnimation, audioData, audioLevel])

  // set audio level property
  // with latest audio level
  useMotionValueEvent(normalizedAudioLevel, 'change',
    (value) => setAmpProperty(value, 'audio'));


  useEffectOnce(() => {
    // set up audio worker when component mounts
    audioWorkerRef.current = new Worker('/workers/audioWorker.js');
    audioWorkerRef.current.onmessage = (e) => {
      const { type, rms } = e.data;
      // getting root mean square of audio data
      // good way to visualize single channel audio
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
      // terminate worker when component unmounts
      if (audioWorkerRef.current) {
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
