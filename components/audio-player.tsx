'use client'
import { useEffect } from "react";

import SoundIcon from "./mute-icon";
import styles from "../styles/audio-player.module.scss"
import useAudioContext from "hooks/useAudioContext";
import usePaletteContext from "hooks/usePaletteContext";
import { useIsClient } from "usehooks-ts";
import { AnimatePresence, motion } from "framer-motion";

function AudioPlayer({ segment }) {
  const { currentPalette } = usePaletteContext()
  const musicType = currentPalette.palette.audio
  const { playing, startPlaying, stopPlaying } = useAudioContext();
  const isClient = useIsClient()

  const togglePlaying = () => {
    if (playing) {
      stopPlaying()
    } else if (!playing) {
      startPlaying()
    }
  }




  useEffect(() => {
    stopPlaying()
  }, [musicType, stopPlaying])

  return (
    <div className={`${styles.container} ${styles[segment]}`}>
      <AnimatePresence>
        {
          !!musicType && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.66 }}
              exit={{ opacity: 0 }}
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
    </div>
  )
}

export default AudioPlayer;