"use client";
import { useEffect } from "react";

import SoundIcon from "./mute-icon";
import styles from "../styles/audio-player.module.scss";
import useAudioContext from "hooks/useAudioContext";
import usePaletteContext from "hooks/usePaletteContext";
import { useIsClient } from "usehooks-ts";
import { AnimatePresence, motion, useWillChange } from "framer-motion";
import HeaderControlsButton from "./header-controls-button";

function AudioPlayer({ segment }) {
  const { currentPalette } = usePaletteContext();
  const musicType = currentPalette.palette.audio;
  const { playing, startPlaying, stopPlaying } = useAudioContext();
  const isClient = useIsClient();
  const willChange = useWillChange();

  const togglePlaying = () => {
    if (playing) {
      stopPlaying();
    } else if (!playing) {
      startPlaying();
    }
  };

  useEffect(() => {
    stopPlaying();
  }, [musicType, stopPlaying]);

  return (
    <HeaderControlsButton className={`${styles.container} ${styles[segment]}`}>
      <AnimatePresence>
        {!!musicType && isClient && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              willChange,
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            className={`${styles.button}`}
            onClick={togglePlaying}
            data-label={`${playing ? "mute" : "audio"}`}
            aria-label={`${playing ? "stop" : "play"} audio`}
          >
            <SoundIcon size="36" playing={playing} />
          </motion.button>
        )}
      </AnimatePresence>
    </HeaderControlsButton>
  );
}

export default AudioPlayer;
