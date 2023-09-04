import { useRef, useCallback, MutableRefObject } from 'react';
import usePaletteContext from 'hooks/usePaletteContext'
import { useBoolean, useEffectOnce, useIsClient, useUpdateEffect } from 'usehooks-ts';

export type AudioDataType = MutableRefObject<AnalyserNode | null>;
export type AudioDataTypeOption = 'frequency' | 'time' | 'both';

export type UseAudioControlReturn = {
  playing: boolean;
  audioData: AudioDataType;
  frequencyData: MutableRefObject<Uint8Array | null>;
  timeData: MutableRefObject<Uint8Array>;
  audioElement: MutableRefObject<HTMLAudioElement | null>;
  startPlaying: () => void;
  stopPlaying: () => void;
};

const useAudioControl = (dataType: AudioDataTypeOption = 'both'): UseAudioControlReturn => {
  const audioElement = useRef<HTMLAudioElement | null>(null);
  const audioData = useRef<AnalyserNode | null>(null);
  const { value: playing, setTrue: setPlayingTrue, setFalse: setPlayingFalse } = useBoolean(false);
  const isClient = useIsClient()
  const { currentPalette } = usePaletteContext();
  const audioContext = useRef<AudioContext | null>(null);
  const bufferRef = useRef<AudioBuffer | null>(null);
  const frequencyData = useRef<Uint8Array>(new Uint8Array(audioData.current?.frequencyBinCount || 0));
  const timeData = useRef<Uint8Array>(new Uint8Array(audioData.current?.frequencyBinCount || 0));

  const initAudio = useCallback(() => {
    if(!audioContext.current) {
      console.log('creating new audio context')
      if (!window.AudioContext) return console.error('AudioContext not supported');
      audioContext.current = new window.AudioContext();
      if(!audioElement.current) return console.error('No audio element found');
      const source = audioContext.current.createMediaElementSource(audioElement.current);
      const analyzer = audioContext.current.createAnalyser();
      analyzer.fftSize = 2048;
      source.connect(audioContext.current.destination);
      source.connect(analyzer);
      audioData.current = analyzer;
      console.log('audio context created', source, analyzer)
    }
  }, [])


  const resumeAudioContext = useCallback(() => {
    if (audioContext.current && audioContext.current.state === "suspended") {
      audioContext.current.resume();
    }
  }, []);
  
  const loadAudio = useCallback(() => {
    console.log('loading audio')
    if (currentPalette.palette.audio === undefined) return console.error('No audio file found');
    const request = new XMLHttpRequest();
    request.open('GET', currentPalette.palette.audio, true);
    request.responseType = 'arraybuffer';
    request.onload = () => {
      console.log('audio loaded', request.response)
      if (audioContext.current) {
        audioContext.current.decodeAudioData(request.response, (buffer) => {
          if (!buffer) {
            return console.error('Error decoding audio data')
          }
          bufferRef.current = buffer;
          if(!audioElement.current || !audioContext.current) return console.error('No audio element found');
          const source = audioContext.current.createBufferSource();
          source.buffer = buffer;
          source.connect(audioContext.current.destination);
          source.start(0);
        }, (error) => {
          console.error('Error decoding audio data: ', error)
        });
      }
    }
    request.onerror = (error) => {
      console.error('Error loading audio data: ', currentPalette.palette.audio, error)
    }
    request.send();
    if(!audioElement.current) return console.error('No audio element found');
    audioElement.current.src = currentPalette.palette.audio;

  }, [currentPalette.palette.audio]);

  const updateAudioData = useCallback(() => {
    if (!audioData.current) return;
    if (dataType === 'frequency' || dataType === 'both') {
      audioData.current.getByteFrequencyData(frequencyData.current);
    }
    if (dataType === 'time' || dataType === 'both') {
      audioData.current.getByteTimeDomainData(timeData.current);
    }
  }, [audioData, dataType])




  const togglePlayback = useCallback(() => {
    console.log('toggle playback', playing)
    if(!audioElement.current) return console.error('No audio element found');
    if (!playing) {
      audioElement.current.pause();
    } else {
      console.log('playing audio')
      audioElement.current.play();
      requestAnimationFrame(updateAudioData);
    }
  }, [updateAudioData, playing]);

  // load audio on palette change
  useUpdateEffect(() => {
    if(!isClient) return;
    loadAudio();
  }, [currentPalette.palette.audio])

  // toggle playback on play state change
  useUpdateEffect(() => {
    if(!isClient) return;
    togglePlayback();
  }, [playing])

  // init audio element
  useEffectOnce(() => {
    console.log('effect once')

    if (audioElement.current === null) {
      console.log('creating new audio element in effect once')
      audioElement.current = new Audio();
      initAudio()
    }

    return () => {
      console.log('cleaning up audio element')
      if (audioData.current) {
        audioData.current.disconnect();
        audioData.current = null;
      }
      if (audioContext.current) {
        audioContext.current.close()
          .then(() => audioContext.current = null)
          .catch((error) => console.error('Error closing audio context: ', error))
      }
    }
  })

  return {
    playing,
    audioData,
    audioElement,
    frequencyData,
    timeData,
    startPlaying: setPlayingTrue,
    stopPlaying: setPlayingFalse,
  };
};

export default useAudioControl;
