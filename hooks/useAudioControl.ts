import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { useBoolean, useIsClient } from 'usehooks-ts';
import BufferLoader from 'lib/util/BufferLoader';

type VizTypeType = 'time' | 'frequency'
type VizDataTypeType = 'Uint8' | 'Float32'

export type HookOptions = {
  src?: string | string[] | undefined;
  id?: string;
  volume?: number;
  playbackRate?: number;
  vizType?: 'time' | 'frequency' | 'both';
  vizDataType?: 'Uint8' | 'Float32' | 'both';
  onload?: () => void;
};

type getCurrentDataProps = {
  vizType: VizTypeType;
  vizDataType: VizDataTypeType;
}

export type getCurrentDataType = (props: getCurrentDataProps) => Uint8Array | Float32Array | null

export type UseAudioControlReturn = {
  playing: boolean;
  loading: boolean;
  seek: (timeInSeconds: number) => void;
  startPlaying: () => void;
  stopPlaying: () => void;
  pausePlaying: () => void;
  audioNode?: AudioBufferSourceNode;
  gainNode?: GainNode;
}

function useAudioControl(
  src: string | string[] | undefined,
  {
    id,
    onload,
    vizType = 'time',
    vizDataType = 'Uint8',
    ...delegated
  }: HookOptions
): UseAudioControlReturn {
  const { value: playing, setTrue: startPlaying, setFalse: stopPlaying } = useBoolean(false);
  const { value: loading, setTrue: startLoading, setFalse: stopLoading } = useBoolean(false);
  const [buffer, setBuffer] = useState<AudioBuffer | null>(null);
  const stopSoundRef = useRef<() => void>();
  const analyserConnected = useRef(false);
  const [source, setSource] = useState<AudioBufferSourceNode | undefined>(undefined);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [volume, setVolume] = useState<number>(1);
  const gainNode = useRef<GainNode | undefined>(undefined);
  // const [playbackRate, setPlaybackRate] = useState<number>(1);

  const [pauseTime, setPauseTime] = useState<number | null>(null);
  
  const isClient = useIsClient()
  const dataArrayRef = useRef<Uint8Array | Float32Array | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  
  const context = useMemo(() => {
    if(!isClient) return null;
    console.log('create context')
    const context = new AudioContext()
    return context;
  }, [isClient]);

  const playSound = useCallback(() => {
    if (!buffer || playing || !context) return;
    console.log('pauseTime', pauseTime);
    const sourceNode = context.createBufferSource();
    const gNode = context.createGain();
    sourceNode.buffer = buffer;
    sourceNode.connect(gNode);
    gNode.connect(context.destination);
    gainNode.current = gNode;
    sourceNode.start(0, pauseTime || 0);
    setStartTime(context.currentTime - (pauseTime || 0));  // Note this line
    setSource(sourceNode);
    startPlaying();
  }, [buffer, context, playing, startPlaying, pauseTime]);

  const pauseSound = useCallback(() => {
    if (!source || !playing || !context) return;
    source.stop();
    setPauseTime(context.currentTime - (startTime || 0));  // Note the modification here
    setSource(undefined);
    stopPlaying();
    analyserConnected.current = false;
  }, [source, playing, stopPlaying, context, startTime]);


  const stopSound = useCallback(() => {
    if (!source || !playing) return;
    source.stop();

    if(analyserRef.current) {
      console.log('disconnect analyser')
      analyserRef.current.disconnect();
      analyserConnected.current = false;
    }
    setPauseTime(0);
    setSource(undefined);
    stopPlaying();
  }, [source, playing, stopPlaying]);

  const loadSounds = useCallback((obj, soundMap, callback) => {
    if(!context) return;
    const names = [] as string[];
    const paths = [] as string[];
    for (let name in soundMap) {
      paths.push(soundMap[name]);
      names.push(name);
    }
    const bufferLoader = new BufferLoader(context, paths, (bufferList) => {
      for (let i = 0; i < bufferList.length; i++) {
        obj[names[i]] = bufferList[i];
      }
      callback(bufferList);
    });
    bufferLoader.load();
  }, [context]);

  const seek = useCallback((timeInSeconds) => {
    if (!buffer) return;
    if (playing) {
      stopSound();
    }
    setPauseTime(timeInSeconds);
    playSound();
  }, [buffer, playing, stopSound, playSound]);

  useEffect(() => {
    stopSoundRef.current = stopSound;
  }, [stopSound])

  useEffect(() => {
    stopSoundRef.current?.()
  }, [src])

  useEffect(() => {
    if (!src) return;
    setPauseTime(0);
    startLoading();
    loadSounds({}, { buffer: src }, (bufferList: AudioBuffer[]) => {
      setBuffer(bufferList[0]);
      stopLoading();
    });
  }, [src, loadSounds, startLoading, stopLoading]);




  return {
    playing,
    loading,
    seek,
    startPlaying: playSound,
    stopPlaying: stopSound,
    pausePlaying: pauseSound,
    audioNode: source,
    gainNode: gainNode.current,
    // playbackRate,
    // setPlaybackRate,
  }
}

export { useAudioControl };

export default useAudioControl;