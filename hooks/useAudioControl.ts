import { useState, useRef, useCallback, useEffect } from 'react';
import type { Howl, HowlerGlobal } from 'howler';
import { useBoolean, useEffectOnce, useIsMounted, useUpdateEffect } from 'usehooks-ts';

export type SpriteMap = {
  [key: string]: [number, number];
};


type HowlOptions = ConstructorParameters<typeof Howl>[0];

export type HookOptions = Omit<HowlOptions, 'src'> & {
  id?: string;
  volume?: number;
  playbackRate?: number;
  interrupt?: boolean;
  soundEnabled?: boolean;
  sprite?: SpriteMap;
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
    ...delegated
  }: HookOptions
) {
  const HowlConstructor = useRef<any | null>(null);
  const HowlerGlobal = useRef<HowlerGlobal | null>(null);
  const isMounted = useIsMounted();
  const { value: playing, setTrue: startPlaying, setFalse: stopPlaying } = useBoolean(false);
  const { value: loading, setTrue: startLoading, setFalse: stopLoading } = useBoolean(false);
  const [duration, setDuration] = useState<number | null>(null);

  const [sound, setSound] = useState<Howl | null>(null);

  const soundId = useRef<number | undefined>(undefined);
  const soundSeek = useRef<number | undefined>(undefined);

  const dataArrayRef = useRef<Uint8Array | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  
  const handleLoad = function (this: Howl) {
    if (typeof onload === 'function') {
      onload.call(this);
    }

    if (isMounted()) {
      setDuration(this.duration() * 1000);
    }
    setSound(this);
    stopLoading();
  };

  const createSound = (src: string | string[]) => {
    if (HowlConstructor.current) {
      startLoading();
      return new HowlConstructor.current({
        src: Array.isArray(src) ? src : [src],
        volume,
        rate: playbackRate,
        onload: handleLoad,
        ...delegated,
      });
    }
    return null;
  }

  // We want to lazy-load Howler, since sounds can't play on load anyway.
  useEffectOnce(() => {
    import('howler').then(mod => {
      if (isMounted()) {
        // Depending on the module system used, `mod` might hold
        // the export directly, or it might be under `default`.
        HowlConstructor.current = mod.Howl ?? mod.default.Howl;
        HowlerGlobal.current = mod.Howler ?? mod.default.Howler;

        if (src) {
          setSound(createSound(src));
        }
      }
    });
  });

  useUpdateEffect(() => {
    const ctx = HowlerGlobal.current?.ctx;
    if (!ctx) return;
    const analyser = ctx?.createAnalyser();
    HowlerGlobal.current?.masterGain.connect(analyser);
    dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
    analyserRef.current = analyser;


  }, [HowlerGlobal.current?.ctx])



  // When the `src` changes, we have to do a whole thing where we recreate
  // the Howl instance. This is because Howler doesn't expose a way to
  // tweak the sound
  useEffect(() => {
    if (HowlConstructor.current && sound) {
      if(src && src.length) {
        sound.stop(soundId.current);
        soundId.current = undefined;
        setSound(createSound(src));
      }
    }
    // The linter wants to run this effect whenever ANYTHING changes,
    // but very specifically I only want to recreate the Howl instance
    // when the `src` changes. Other changes should have no effect.
    // Passing array to the useEffect dependencies list will result in
    // ifinite loop so we need to stringify it, for more details check
    // https://github.com/facebook/react/issues/14476#issuecomment-471199055
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(src)]);

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
      if(!soundId.current) {
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

  }

  return returnedValue;
}

export { useAudioControl };

export default useAudioControl;