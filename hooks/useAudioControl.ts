import { useState, useRef, useCallback, useEffect } from 'react';
import { Howl, Howler } from 'howler';
import { useBoolean } from 'usehooks-ts';

export type SpriteMap = {
  [key: string]: [number, number];
};


type HowlOptions = ConstructorParameters<typeof Howl>[0];

export type HookOptions = Omit<HowlOptions, 'src'> & {
  src?: HowlOptions['src'];
  id?: string;
  volume?: number;
  playbackRate?: number;
  interrupt?: boolean;
  soundEnabled?: boolean;
  sprite?: SpriteMap;
  vizType?: 'time' | 'frequency' | 'both';
  vizDataType?: 'Uint8' | 'Float32' | 'both';
  onload?: () => void;
};

export interface PlayOptions {
  id?: string;
  forceSoundEnabled?: boolean;
  playbackRate?: number;
}

export type PlayFunction = (options?: PlayOptions) => void;

export type UseAudioControlProps = {
  src?: HowlOptions['src'];
  options?: HookOptions
}

export type UseAudioControlReturn = {
  play: PlayFunction;
  sound: Howl | null;
  stop: (id?: string) => void;
  pause: (id?: string) => void;
  duration: number | null;
  playing: boolean;
  analyser: AnalyserNode | null;
  loading: boolean;
  getCurrentData: () => Uint8Array | Float32Array | null;
}

function useAudioControl(
  src: HowlOptions['src'],
  {
    id,
    volume = 1,
    playbackRate = 1,
    soundEnabled = true,
    interrupt = false,
    onload,
    vizType = 'time',
    vizDataType = 'Uint8',
    ...delegated
  }: HookOptions
) {
  const { value: playing, setTrue: startPlaying, setFalse: stopPlaying } = useBoolean(false);
  const { value: loading, setTrue: startLoading, setFalse: stopLoading } = useBoolean(false);
  const [duration, setDuration] = useState<number | null>(null);

  const [sound, setSound] = useState<Howl | null>(null);

  const soundId = useRef<number | undefined>(undefined);
  const soundSeek = useRef<number | undefined>(undefined);

  const dataArrayRef = useRef<Uint8Array | Float32Array | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  
  const handleLoad = useCallback(function (this: Howl) {
    if(vizType.length) {
      const ctx = Howler.ctx
      if (!ctx) return;
      const analyser = ctx.createAnalyser();

      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 1;

      Howler.masterGain.connect(analyser);
      if(vizDataType === 'Uint8') {
        dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
      }
      if (vizDataType === 'Float32') {
        dataArrayRef.current = new Float32Array(analyser.frequencyBinCount);
      }
      analyserRef.current = analyser;
    }
    if (typeof onload === 'function') {
      onload.call(this);
    }
    setDuration(this.duration() * 1000);
    setSound(this);
    stopLoading();
  }, [onload, stopLoading, vizType, vizDataType]);

  const createSound = useCallback((src: string | string[]) => {
    startLoading();
    return new Howl({
      src: Array.isArray(src) ? src : [src],
      volume,
      rate: playbackRate,
      onload: handleLoad,
      ...delegated,
      onplayerror: function (e) {
        console.log('onplayerror', e, arguments)
      }
    });
  }, [delegated, playbackRate, volume, startLoading, handleLoad]);

  const getCurrentData = useCallback(() => {
    if (!analyserRef.current || !dataArrayRef.current) return null;
    if(vizType === 'time') {
      if(dataArrayRef.current instanceof Uint8Array) {
        analyserRef.current.getByteTimeDomainData(dataArrayRef.current);
      }
      if(dataArrayRef.current instanceof Float32Array) {
        analyserRef.current.getFloatTimeDomainData(dataArrayRef.current);
      }
    }
    if(vizType === 'frequency') {
      if(dataArrayRef.current instanceof Uint8Array) {
        analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      }
      if(dataArrayRef.current instanceof Float32Array) {
        analyserRef.current.getFloatFrequencyData(dataArrayRef.current);
      }
    }
    return dataArrayRef.current;
  }, [analyserRef, dataArrayRef, vizType]);


  // When the `src` changes, we have to do a whole thing where we recreate
  // the Howl instance. This is because Howler doesn't expose a way to
  // tweak the sound
  useEffect(() => {
    if(src && src.length) {
      if(sound) {
        sound.stop(soundId.current);
        soundId.current = undefined;
      }
      setSound(createSound(src));
    }
    // The linter wants to run this effect whenever ANYTHING changes,
    // but very specifically I only want to recreate the Howl instance
    // when the `src` changes. Other changes should have no effect.
    // Passing array to the useEffect dependencies list will result in
    // ifinite loop so we need to stringify it, for more details check
    // https://github.com/facebook/react/issues/14476#issuecomment-471199055
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  // Whenever volume/playbackRate are changed, change those properties
  // on the sound instance.
  useEffect(() => {
    if (sound) {
      sound.volume(volume);
      sound.rate(playbackRate);
    }
    // A weird bug means that including the `sound` here can trigger an
    // error on unmount, where the state loses track of the sprites??
    // No idea, but anyway I don't need to re-run this if only the `sound`
    // changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volume, playbackRate]);



  const play: PlayFunction = useCallback(
    (options?: PlayOptions) => {
      if (typeof options === 'undefined') {
        options = {};
      }

      if (!sound || (!soundEnabled && !options.forceSoundEnabled)) {
        return;
      }

      if (interrupt) {
        sound.stop();
      }

      if (options.playbackRate) {
        sound.rate(options.playbackRate);
      }
      if (!soundId.current) {
        soundId.current = sound.play();
      } else {
        sound.seek(soundSeek.current)
        sound.play(soundId.current);
      }
      startPlaying()
    },
    [sound, soundEnabled, interrupt, startPlaying]
  );

  const stop = useCallback(
    id => {
      if (!sound) {
        return;
      }
      sound.stop(soundId.current);
      stopPlaying()
    },
    [sound, stopPlaying]
  );

  const pause = useCallback(
    id => {
      if (!sound) {
        return;
      }
      sound.pause(soundId.current);
      soundSeek.current = sound.seek();
      stopPlaying()
    },
    [sound, stopPlaying]
  );

  const returnedValue: UseAudioControlReturn = {
    play,
    playing,
    loading,
    sound,
    stop,
    pause,
    duration,
    analyser: analyserRef.current,
    getCurrentData,

  }

  return returnedValue;
}

export { useAudioControl };

export default useAudioControl;