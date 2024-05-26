import { AudioContext } from "providers/audio-context";
import { useContext } from "react";

const useAudioContext = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error(
      "useAudioContext must be used within an AudioContextProvider",
    );
  }
  return context;
};

export default useAudioContext;
