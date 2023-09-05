import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Howler, Howl, HowlerGlobal } from 'howler';
import { useBoolean, useEffectOnce, useIsMounted, useUpdateEffect } from 'usehooks-ts';

export type SpriteMap = {
  [key: string]: [number, number];
};

export type HookOptions<T = any> = T & {
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


export type ExposedData = {
  sound: Howl | null;
  stop: (id?: string) => void;
  pause: (id?: string) => void;
  duration: number | null;
  ctx?: AudioContext;
  playing: boolean;
  audioData: AnalyserNode | null;
}

export type UseAudioControlReturn = [PlayFunction, ExposedData];

function useAudioControl<T = any>(
  src: string | string[],
  {
    id,
    volume = 1,
    playbackRate = 1,
    soundEnabled = true,
    interrupt = false,
    onload,
    ...delegated
  }: HookOptions<T> = {} as HookOptions
) {
  const HowlConstructor = React.useRef<any | null>(null);
  const HowlerGlobal = React.useRef<HowlerGlobal | null>(null);
  const isMounted = React.useRef(false);
  const { value: playing, setTrue: setPlayingTrue, setFalse: setPlayingFalse } = useBoolean(false);
  const [duration, setDuration] = React.useState<number | null>(null);

  const [sound, setSound] = React.useState<Howl | null>(null);

  const dataArrayRef = React.useRef<Uint8Array | null>(null);
  const analyserRef = React.useRef<AnalyserNode | null>(null);
  const handleLoad = function () {
    if (typeof onload === 'function') {
      // @ts-ignore
      onload.call(this);
    }

    if (isMounted.current) {
      // @ts-ignore
      setDuration(this.duration() * 1000);
    }

    // @ts-ignore
    setSound(this);
  };

  // We want to lazy-load Howler, since sounds can't play on load anyway.
  useEffectOnce(() => {
    import('howler').then(mod => {
      if (!isMounted.current) {
        // Depending on the module system used, `mod` might hold
        // the export directly, or it might be under `default`.
        HowlConstructor.current = mod.Howl ?? mod.default.Howl;
        HowlerGlobal.current = mod.Howler ?? mod.default.Howler;

        isMounted.current = true;

        new HowlConstructor.current({
          src: Array.isArray(src) ? src : [src],
          volume,
          rate: playbackRate,
          onload: handleLoad,
          ...delegated,
        });
      }
    });

    return () => {
      isMounted.current = false;
    };
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
  React.useEffect(() => {
    if (HowlConstructor.current && sound) {
      setSound(
        new HowlConstructor.current({
          src: Array.isArray(src) ? src : [src],
          volume,
          onload: handleLoad,
          ...delegated,
        })
      );
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
  React.useEffect(() => {
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

  useUpdateEffect(() => {
    console.log('playing UAC', playing)
    analyserRef.current?.getByteTimeDomainData(dataArrayRef.current!);
    console.log('dataArrayRef.current', dataArrayRef.current)


  }, [playing])

  useUpdateEffect(() => {
    console.log('dataArrayRef.current', dataArrayRef.current)
    analyserRef.current?.getByteTimeDomainData(dataArrayRef.current!);
  }, [dataArrayRef.current])

  const play: PlayFunction = React.useCallback(
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

      sound.play(options.id);
      setPlayingTrue()
    },
    [sound, soundEnabled, interrupt, setPlayingTrue]
  );

  const stop = React.useCallback(
    id => {
      if (!sound) {
        return;
      }
      sound.stop(id);
      setPlayingFalse()
    },
    [sound, setPlayingFalse]
  );

  const pause = React.useCallback(
    id => {
      if (!sound) {
        return;
      }
      sound.pause(id);
      setPlayingFalse()
    },
    [sound, setPlayingFalse]
  );

  const returnedValue: UseAudioControlReturn = [
    play,
    {
      playing,
      sound,
      stop,
      pause,
      duration,
      ctx: HowlerGlobal.current?.ctx,
      audioData: analyserRef.current,
    },
  ];

  return returnedValue;
}

export { useAudioControl };

export default useAudioControl;