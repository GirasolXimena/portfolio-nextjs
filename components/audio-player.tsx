'use client'
import { useEffect } from "react";

import SoundIcon from "./mute-icon";
import styles from "../styles/audio-player.module.scss"
import useAudioContext from "hooks/useAudioContext";
import usePaletteContext from "hooks/usePaletteContext";
import { useIsClient } from "usehooks-ts";

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

  return isClient && (
    <div className={`${styles.container} ${styles[segment]}`}>
      {
        !!musicType && (
          <button
            className={`${styles.button}`}
            onClick={togglePlaying}
            data-label={`${playing ? 'mute' : 'audio'}`}
            aria-label={`${playing ? 'stop' : 'play'} audio`}
          >
            <SoundIcon size="36" playing={playing} />
          </button>
        )
      }
    </div>
  )
}

export default AudioPlayer;