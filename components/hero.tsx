'use client'
import { useMouseInput } from 'hooks/useMouseInput'
import styles from '../styles/hero.module.scss'
import Navbar from './navbar'
import AudioMotionAnalyzer from 'audiomotion-analyzer'
import { useEffect, useRef } from 'react'
import useAudioContext from 'hooks/useAudioContext'
import { useElementSize } from 'usehooks-ts'
import { mergeRefs } from 'react-merge-refs'

export default function Hero({ name }: { name: string }) {
  const { audioNode } = useAudioContext()
  const motionAnalyzerRef = useRef<AudioMotionAnalyzer>()
  const heightRef = useRef<number | undefined>(undefined)
  const widthRef = useRef<number | undefined>(undefined)
  useMouseInput()
  const containerRef = useRef<HTMLDivElement>(null)
  const [sizeRef, { width, height }] = useElementSize()
  useEffect(() => {
    if (audioNode && containerRef.current) {
      console.log('audio node', audioNode)
      if (motionAnalyzerRef.current) motionAnalyzerRef.current.disconnectInput()
      console.log('creating new analyzer with size', widthRef.current, heightRef.current)
      motionAnalyzerRef.current = new AudioMotionAnalyzer(containerRef.current, {
        source: audioNode,
        fftSize: 2048,
        height: heightRef.current,
        width: widthRef.current,
      })
    } else {
      console.log('no audio node')
    }
  }, [audioNode])

  useEffect(() => {
    heightRef.current = height
    widthRef.current = width
    if (motionAnalyzerRef.current) {
      motionAnalyzerRef.current.setCanvasSize(width, height)
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
    </div>
  )
}