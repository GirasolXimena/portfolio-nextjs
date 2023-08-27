'use client'
import { useCallback, useEffect, useRef, useState } from "react";

import SoundIcon from "./mute-icon";
import styles from "../styles/audio-player.module.scss"
import { useAudioContext } from "providers/audio-context";

function AudioPlayer({ musicType, segment }) {
  const { playing, startPlaying, stopPlaying } = useAudioContext();

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