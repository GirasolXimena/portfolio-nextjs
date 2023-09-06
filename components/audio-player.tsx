'use client'
import { useCallback, useRef, FC } from "react";
import SoundIcon from "./mute-icon";
import styles from "../styles/audio-player.module.scss"
import useAudioContext from "hooks/useAudioContext";
import usePaletteContext from "hooks/usePaletteContext";
import { useIsClient, useUpdateEffect } from "usehooks-ts";
import { AnimatePresence, animate, motion, useMotionValue, useTransform, useWillChange, useMotionValueEvent } from "framer-motion";
import HeaderControlsButton from "./header-controls-button";
import { setCustomProperties } from "lib/util";
import usePrefersReducedMotion from "hooks/usePreferesReducedMotion";

const setAmpProperty = (value: number, property: string) => {
  setCustomProperties({
    [`amp-${property}`]: String(value),
  })
}

type AudioPlayerProps = {
  segment: string
}

const AudioPlayer: FC<AudioPlayerProps> = ({ segment }) => {
  const { currentPalette } = usePaletteContext()
  const frameIdRef = useRef<number | null>(null)
  const musicType = currentPalette.palette.audio
  const { playing, startPlaying, pausePlaying, loading } = useAudioContext();
  const isClient = useIsClient()
  const willChange = useWillChange()
  const audioLevel = useMotionValue(0)
  const { getCurrentData } = useAudioContext()

  const normalizedAudioLevel = useTransform(audioLevel, [120, 140], [0, 5])
  const shouldAnimate = !usePrefersReducedMotion()


  const togglePlaying = () => {
    console.log('playing', playing)
    if (playing) {
      animate(audioLevel, 0, {
        duration: 2.5,
        ease: 'easeIn',
      })
      pausePlaying()
    } else if (!playing) {
      startPlaying()
    }
  }

  useUpdateEffect(() => {
    function cleanup() {
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


  const getRMS = useCallback((dataArray: Uint8Array) => {
    let sumSquares = 0.0;
    for (const amplitude of dataArray) {
      sumSquares += amplitude * amplitude;
    }
    return Math.sqrt(sumSquares / dataArray.length);
  }, [])

  const audioAnimation = useCallback(() => {
    const data = getCurrentData({
      vizType: 'time',
      vizDataType: 'Uint8'
    })
    if (!data || !(data instanceof Uint8Array)) return

    const rms = getRMS(data)

    // console.log('animating', rms)
    animate(audioLevel, rms, {
      duration: 0.25,
      ease: 'easeOut'
    })


    // if audio is playing, request next frame
    if (playing && shouldAnimate) {
      frameIdRef.current = requestAnimationFrame(audioAnimation);
    }

  }, [playing, shouldAnimate, audioLevel, getRMS, getCurrentData])


    // set audio level property
  // with latest audio level
  useMotionValueEvent(normalizedAudioLevel, 'change', (value) => setAmpProperty(value, 'audio'));

  return (
    <HeaderControlsButton className={`${styles.container} ${styles[segment]}`}>
      <AnimatePresence>
        {
          !!musicType && isClient && !loading && (
            <motion.button
              initial={{opacity: 0}}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                willChange
              }}
              transition={{
                duration: 0.5,
                ease: 'easeInOut',
              }}
              className={`${styles.button}`}
              onClick={togglePlaying}
              data-label={`${playing ? 'mute' : 'audio'}`}
              aria-label={`${playing ? 'stop' : 'play'} audio`}
            >
              <SoundIcon size="36" playing={playing} />
            </motion.button>
          )
        }
      </AnimatePresence>
    </HeaderControlsButton>
  )
}

export default AudioPlayer;