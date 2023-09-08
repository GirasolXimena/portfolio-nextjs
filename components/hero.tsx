'use client'
import { useMouseInput } from 'hooks/useMouseInput'
import styles from '../styles/hero.module.scss'
import Navbar from './navbar'
import AudioMotionAnalyzer, { EnergyPreset } from 'audiomotion-analyzer'
import { useEffect, useMemo, useRef } from 'react'
import useAudioContext from 'hooks/useAudioContext'
import { useElementSize, useUpdateEffect } from 'usehooks-ts'
import { mergeRefs } from 'react-merge-refs'
import usePaletteContext from 'hooks/usePaletteContext'
import convert from 'color-convert'
import { PaletteProperties } from 'types'
type HSLEntries = {
  [K in keyof PaletteProperties]: number[];
};

const toColorString = (color: number[]) => `hsl(${color[0]}, ${color[1]}%, ${color[2]}%)`

function isHexColor(value: string): boolean {
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value);
}

const hexToHsl = (hex: string): number[] => {
  const [r, g, b] = convert.hex.rgb(hex)
  const [h, s, l] = convert.rgb.hsl(r, g, b)
  return [h, s, l]
}

function drawGradients(ctx: CanvasRenderingContext2D, width: number, height: number, colors: string[]) {


  const positions = [
    { x: 0, y: 0 },         // Top-left
    { x: width, y: 0 },     // Top-right
    { x: width / 2, y: height }  // Bottom-center
  ];

  colors.forEach((color, index) => {
    const center = positions[index];
    let maxRadius;

    if (index === 2) { // For the gradient at (width/2, height)
      // Farthest-Side
      const distances = [
        center.y,  // Top
        width - center.x,  // Right
        center.x  // Left
      ];
      maxRadius = Math.max(...distances);
    } else {
      // For the gradients at (0,0) and (width,0)
      // Farthest-Corner
      const radii = positions.map(c => Math.sqrt((c.x - center.x) ** 2 + (c.y - center.y) ** 2));
      maxRadius = Math.max(...radii);
    }

    const gradient = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, maxRadius);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, 'transparent');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  });
}


const convertHexToHsl = (paletteProperties: PaletteProperties) => Object.entries(paletteProperties)
  .reduce((acc, [k, v]) => ({
    ...acc,
    [k as keyof PaletteProperties]: isHexColor(v) ? hexToHsl(v) : v
  }), {} as HSLEntries);


export default function Hero({ name }: { name: string }) {
  const frameCount = useRef(0)
  const lastTime = useRef(performance.now())
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { playing, audioNode } = useAudioContext()
  const { currentPalette } = usePaletteContext()
  const motionAnalyzerRef = useRef<AudioMotionAnalyzer>()
  const heightRef = useRef<number | undefined>(undefined)
  const widthRef = useRef<number | undefined>(undefined)
  useMouseInput()
  const containerRef = useRef<HTMLDivElement>(null)
  const [sizeRef, { width, height }] = useElementSize()
  const { primary, secondary, tertiary } = convertHexToHsl(currentPalette.palette.properties)

  useEffect(() => {
    if (audioNode && containerRef.current) {
      console.log('audio node', audioNode)
      if (motionAnalyzerRef.current) {
        console.log('disconnecting old analyzer')
        motionAnalyzerRef.current.disconnectInput()
        console.log('connecting new analyzer to: ', audioNode)
        motionAnalyzerRef.current.connectInput(audioNode)
      } else {
        console.log('creating new analyzer with size', widthRef.current, heightRef.current)

      }
    } else {
      console.log('no audio node')
    }
  }, [audioNode])

  useUpdateEffect(() => {
    console.log('playing changed', playing)
    if (!containerRef.current) return console.error('no container')
    if (playing) {
      // if it's playing there should always be an audio node because
      // that's the thing that is playing
      if (!audioNode) return console.error('no audio node')
      if (motionAnalyzerRef.current) {
        motionAnalyzerRef.current.disconnectInput()
        motionAnalyzerRef.current.connectInput(audioNode)
        motionAnalyzerRef.current.toggleAnalyzer(true)
      } else {
        console.log('creating new analyzer')
        motionAnalyzerRef.current = new AudioMotionAnalyzer(containerRef.current, {
          source: audioNode,
          fftSize: 2048,
          barSpace: 0,
          // start: false,
          useCanvas: false,
          smoothing: 0.9,
          ansiBands: false,
          frequencyScale: 'bark',
          mode: 10,
          radial: true,
          showFPS: true,
          mirror: 1,
          overlay: true,
          showBgColor: false,
          onCanvasDraw: () => {
            const currentTime = performance.now();
            frameCount.current++;

            // Check if a second has passed
            if (currentTime - lastTime.current >= 1000) {
              console.log(`FPS: ${frameCount.current}`);
              frameCount.current = 0;
              lastTime.current = currentTime;
            }
            if (motionAnalyzerRef.current && canvasRef.current) {

              const ctx = canvasRef.current.getContext('2d')
              if (!ctx) return console.error('no context')
              ctx.globalCompositeOperation = 'xor'
              const { width, height } = canvasRef.current
              ctx.clearRect(0, 0, width, height)
              const instance = motionAnalyzerRef.current
              const energies = ['bass', 'mid', 'treble'].map((band) => instance.getEnergy(band as EnergyPreset))
              // console.log('energies', energies)
              const colors = [primary, secondary, tertiary].map((color, index) => {
                const energy = energies[index]
                const [h, s, l] = color
                const adjustedSaturation = s * (2/3 + energy * 1/3);
                const adjustedLightness = l * (2/3 + energy * 1/3);
                return toColorString([h, adjustedSaturation, adjustedLightness])
              })
              drawGradients(ctx, width, height, colors)
            }
          }
        })

      }
    } else {
      if (motionAnalyzerRef.current) {
        console.log('turning off analyzer')
        motionAnalyzerRef.current.toggleAnalyzer(false)
      }
    }
  }, [playing])

  useEffect(() => {
    heightRef.current = height
    widthRef.current = width
    if (motionAnalyzerRef.current) {
      motionAnalyzerRef.current.setCanvasSize(width, height)
      motionAnalyzerRef.current.setOptions({
        onCanvasDraw: () => {
          console.log('poop')
        }
      })
    }
  }, [width, height])
  return (
    <div className={styles.hero} ref={mergeRefs([sizeRef, containerRef])}>
      <div className={styles.title}>
        <h1 id="name">
          {name}
        </h1>
        <Navbar segment='home' />
      </div>
      <canvas
        ref={canvasRef}
      ></canvas>
    </div>
  )
}