import {
  ReactNode,
  createContext,
} from "react";
import useAudioControl, { HookOptions, PlayFunction, UseAudioControlReturn } from "hooks/useAudioControl";

import usePaletteContext from "hooks/usePaletteContext";

type AudioContextType = {
  playing: boolean;
  startPlaying: PlayFunction;
  stopPlaying: () => void;
  loading: boolean;
  getCurrentData: () => Uint8Array | Float32Array | null;
}

type AudioContextProviderProps = {
  children: ReactNode;
  audioControlHook?: (src: string | string[] | undefined, options?: HookOptions) => UseAudioControlReturn;
}

export const AudioContext = createContext<AudioContextType | undefined>(undefined);



const AudioContextProvider = ({ children, audioControlHook = useAudioControl }: AudioContextProviderProps) => {

  const { currentPalette } = usePaletteContext()
  const src = currentPalette.palette.audio
  const {play,  playing, pause, loading, getCurrentData } = audioControlHook(src, {
    interrupt: true
  })
  return (
    <AudioContext.Provider value={{
      playing,
      startPlaying: play,
      stopPlaying: pause,
      loading,
      getCurrentData
    }}>
      {children}
    </AudioContext.Provider>
  )
}

export default AudioContextProvider;
