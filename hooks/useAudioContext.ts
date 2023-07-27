import { useEffect, useState } from "react";

function useAudioContext(audioElement: React.RefObject<HTMLAudioElement> | null) {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [audio, setAudio] = useState<any>({});

  useEffect(() => {
    if (!audioContext) {
      const audioContext = new window.AudioContext();
      if (!audioElement || !audioElement.current) return
      const source = audioContext.createMediaElementSource(audioElement.current)
      const analyzer = audioContext.createAnalyser()
      analyzer.fftSize = 2048
      source.connect(audioContext.destination)
      source.connect(analyzer)
      setAudioContext(audioContext)
      setAudio((audio) => (audio.audioData = analyzer));
    }
  }, [audioContext, audioElement])
  return {
    audio,
    audioContext
  }
}

export default useAudioContext