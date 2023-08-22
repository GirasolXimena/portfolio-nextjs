'use client'
import { useContext, useRef, ReactNode, createContext, useState, useCallback } from 'react'
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context'
import { ThemeProvider } from "next-themes"
import { useEffect } from "react";
import utilities from 'lib/util';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
const { setCustomProperties, toCartesianCoords } = utilities

const handleInput = (event: MouseEvent | TouchEvent) => {
  let x: number;
  let y: number;

  if (event instanceof TouchEvent && event.touches.length > 0) {
    x = event.touches[0].clientX;
    y = event.touches[0].clientY;
  } else if (event instanceof MouseEvent) {
    x = event.clientX;
    y = event.clientY;
  } else {
    return;  // Early return if neither condition met
  }

  const coords = toCartesianCoords({ x, y });
  setCustomProperties({
    'mouse-x': `${coords.x}`,
    'mouse-y': `${coords.y}`,
  });
}


function FrozenRouter({ children }: { children: ReactNode }) {
  const context = useContext(LayoutRouterContext)
  const frozen = useRef(context).current;
  return (
  <LayoutRouterContext.Provider value={frozen}>
    {children}
  </LayoutRouterContext.Provider>
  )
}

interface AudioContextType {
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  audioData: React.MutableRefObject<AnalyserNode | null>;
  startPlaying: () => void;
  stopPlaying: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function useAudioContext() {
  const context = useContext(AudioContext);
  if (!context) {
    // This error will be thrown if the component is not a child of AudioProvider.
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}

function AudioProvider({ children }: { children: ReactNode }) {
  const audioElement = useRef<HTMLAudioElement>(null);
  const audioData = useRef<AnalyserNode | null>(null);
  const [playing, setPlaying] = useState(false)
  const audioContext = useRef<AudioContext | null>(null);
  const musicType = '/audio/raingurl.mp3'

  const startPlaying = () => {
    if (playing || !musicType) return
    // if there is no audio element or audio context, create them
    if (!audioContext.current) {
      createAudioContext()
    }
    // audioData is created in createAudioContext
    if (!audioElement.current || !audioData.current) return
    // set the source of the audio element to the music type
    audioElement.current.src = musicType
    // 
    audioElement.current.play()
    setPlaying(true)
  }

  const stopPlaying = useCallback(() => {
    if (!audioElement.current) return
    audioElement.current.pause()
    setPlaying(false)
  }, [setPlaying])

  const createAudioContext = () => {
    audioContext.current = new window.AudioContext();
    if (!audioElement.current) return
    const source = audioContext.current.createMediaElementSource(audioElement.current)
    const analyzer = audioContext.current.createAnalyser()
    analyzer.fftSize = 2048
    source.connect(audioContext.current.destination)
    source.connect(analyzer)
    audioData.current = analyzer
  }
  const value = {
    playing,
    setPlaying,
    audioData,
    startPlaying,
    stopPlaying,
  }
  return (
    <AudioContext.Provider value={value}>
      {children}
    <audio id="audio" ref={audioElement}></audio>
    </AudioContext.Provider>
  )
}


export function Providers({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    const { body } = document;

    body.addEventListener('mousemove', handleInput);
    body.addEventListener('touchmove', handleInput);

    return () => {
      body.removeEventListener('mousemove', handleInput);
      body.removeEventListener('touchmove', handleInput);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, type: 'tween' }}
      >
        <FrozenRouter>
          <ThemeProvider>
            <AudioProvider>
            {children}
            </AudioProvider>
          </ThemeProvider>
        </FrozenRouter>
      </motion.div>
    </AnimatePresence>
  )
}