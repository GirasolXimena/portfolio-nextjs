import { useRef, useCallback, MutableRefObject } from "react";
import usePaletteContext from "hooks/usePaletteContext";
import {
  useBoolean,
  useEffectOnce,
  useIsClient,
  useUpdateEffect,
} from "usehooks-ts";

export type AudioDataType = MutableRefObject<AnalyserNode | null>;

export type UseAudioControlReturn = {
  playing: boolean;
  audioData: AudioDataType;
  audioElement: MutableRefObject<HTMLAudioElement | null>;
  startPlaying: () => void;
  stopPlaying: () => void;
};

const useAudioControl = (): UseAudioControlReturn => {
  const isClient = useIsClient();
  const { currentPalette } = usePaletteContext();
  const audioElement = useRef<HTMLAudioElement | null>(null);
  const audioData = useRef<AnalyserNode | null>(null);
  const {
    value: playing,
    setTrue: setPlayingTrue,
    setFalse: setPlayingFalse,
  } = useBoolean(false);
  const audioContext = useRef<AudioContext | null>(null);

  const setMusicType = useCallback((src: string) => {
    if (audioElement.current) audioElement.current.src = src;
  }, []);

  const startPlaying = useCallback(() => {
    if (!audioElement.current) {
      audioElement.current = new Audio();
      audioElement.current.src = currentPalette.palette.audio || "";
    }
    if (playing || !audioElement.current.src) return;

    if (!audioContext.current) {
      if (!window.AudioContext)
        return console.error("AudioContext not supported");
      audioContext.current = new window.AudioContext();
      const source = audioContext.current.createMediaElementSource(
        audioElement.current,
      );
      const analyzer = audioContext.current.createAnalyser();
      analyzer.fftSize = 2048;
      source.connect(audioContext.current.destination);
      source.connect(analyzer);
      audioData.current = analyzer;
    }

    if (audioElement.current) {
      try {
        audioElement.current.play();
        setPlayingTrue();
      } catch (error) {
        console.error("Error playing audio: ", error);
      }
    }
  }, [playing, setPlayingTrue, currentPalette.palette.audio]);

  const stopPlaying = useCallback(() => {
    if (audioElement.current) {
      audioElement.current.pause();
      setPlayingFalse();
    }
  }, [setPlayingFalse]);

  useUpdateEffect(() => {
    if (!isClient) return;

    if (audioElement.current === null) {
      audioElement.current = new Audio();
    }

    const musicType = currentPalette.palette.audio || "";
    setMusicType(musicType);
  }, [currentPalette, setMusicType]);

  useEffectOnce(() => {
    return () => {
      if (audioData.current) {
        audioData.current.disconnect();
        audioData.current = null;
      }
      if (audioContext.current) {
        audioContext.current
          .close()
          .then(() => (audioContext.current = null))
          .catch((error) =>
            console.error("Error closing audio context: ", error),
          );
      }
    };
  });

  return {
    playing,
    audioData,
    audioElement,
    startPlaying,
    stopPlaying,
  };
};

export default useAudioControl;
