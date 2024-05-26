import {
  ReactNode,
  createContext,
} from "react";
import useAudioControl, { HookOptions, UseAudioControlReturn, getCurrentDataType } from "hooks/useAudioControl";

import usePaletteContext from "hooks/usePaletteContext";

type AudioContextProviderProps = {
  children: ReactNode;
  audioControlHook?: (src: string | undefined, options?: HookOptions) => UseAudioControlReturn;
}

export const AudioContext = createContext<UseAudioControlReturn | undefined>(undefined);



const AudioContextProvider = ({ children, audioControlHook = useAudioControl }: AudioContextProviderProps) => {

  const { currentPalette } = usePaletteContext()
  const src = currentPalette.palette.audio
  const audioControls = audioControlHook(src, {
    // interrupt: true
  })
  return (
    <AudioContext.Provider value={audioControls}>
      {children}
    </AudioContext.Provider>
  );
};

export default AudioContextProvider;
