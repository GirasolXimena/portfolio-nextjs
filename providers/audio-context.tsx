import {
  ReactNode,
  createContext,
} from "react";
import useAudioControl, { HookOptions } from "hooks/useAudioControl";

import usePaletteContext from "hooks/usePaletteContext";

type AudioContextType = {
  playing: boolean;
  startPlaying: () => void;
  stopPlaying: () => void;
  pausePlaying: () => void;
  loading: boolean;
  getCurrentData: () => Uint8Array | Float32Array | null;
}

type AudioContextProviderProps = {
  children: ReactNode;
  audioControlHook?: (src: string | string[] | undefined, options?: HookOptions) => any;
}

export const AudioContext = createContext<AudioContextType | undefined>(undefined);



const AudioContextProvider = ({ children, audioControlHook = useAudioControl }: AudioContextProviderProps) => {

  const { currentPalette } = usePaletteContext()
  const src = currentPalette.palette.audio
  const { playing, startPlaying, pausePlaying, stopPlaying, loading, getCurrentData } = audioControlHook(src, {
    // interrupt: true
  })
  return (
    <AudioContext.Provider value={{
      playing,
      startPlaying: startPlaying,
      pausePlaying: pausePlaying,
      stopPlaying: stopPlaying,
      loading,
      getCurrentData
    }}>
      {children}
    </AudioContext.Provider>
  )
}

export default AudioContextProvider;
