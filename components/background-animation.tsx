import usePrefersReducedMotion from "@/hooks/usePreferesReducedMotion";
import utilities from "@/utils/index";
import { useAudioContext } from "app/providers"
import { useAnimationFrame } from "framer-motion";
import { useCallback } from "react";

function BackgroundAnimation({ children, className }) {
  const { playing, audioData } = useAudioContext()
  // do this next!
  // const { currentPalette } = usePaletteContext()

  const audioAnimation = useCallback((audioData) => {
    // create a new array of 32 bit floating point numbers
    if (!audioData.current) return
    let data = new Float32Array(audioData.current.frequencyBinCount)
    // draw the audio data
    const draw = (data: number) => {
      const val = 0.33 + data / 3
      utilities.setCustomProperties({
        '--amp-primary': String(val),
        '--amp-secondary': String(val),
        '--amp-tertiary': String(val),
      })
    }
    if (!audioData.current) return
    audioData.current.getFloatTimeDomainData(data)
    let sumQuares = 0.0
    for (const ampliltude of data) {
      sumQuares += ampliltude * ampliltude
    }
    const amp = Math.sqrt(sumQuares / data.length)
    draw(amp)
  }, [])

  const noAudioAnimation = useCallback((time: number) => {
    const now = time / 1000

    // Normalize sin and cosine values to [0, 1] range
    const primaryAmp = (Math.sin(2 * Math.PI * now / 15) + 1) / 2;
    const secondaryAmp = (Math.sin(2 * Math.PI * now / 30) + 1) / 2;
    const tertiaryAmp = (Math.sin(2 * Math.PI * now / 60) + 1) / 2;

    // Scale and translate to desired range, for example, [1, 1.5]
    const primaryValue = primaryAmp / 2;
    const secondaryValue = secondaryAmp / 2;
    const tertiaryValue = tertiaryAmp / 2;
    utilities.setCustomProperties({
      '--amp-primary': String(primaryValue),
      '--amp-secondary': String(secondaryValue),
      '--amp-tertiary': String(tertiaryValue),
    })
  }, [])

  const shouldAnimate = !usePrefersReducedMotion()
  useAnimationFrame((time) => {
    if (!shouldAnimate) return
    if (playing) {
      audioAnimation(audioData)
    } else {
      // noAudioAnimation(time)
    }
  })
  return (
    <div
      className={className}
      style={{
        // backgroundColor: 'black'

      }}
    >
      {children}
    </div>
  )
}

export default BackgroundAnimation