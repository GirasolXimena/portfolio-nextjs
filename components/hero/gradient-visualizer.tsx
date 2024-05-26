import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useRef } from 'react'
import styles from 'styles/hero.module.scss'
type Gradient = {
    name: string,
    colors: string[]
}

type GradientVisualizerProps = {
    sizeRef: any,
    columns: any,
    canvasRef: any,
    canvasOpacity: any
}
const GradientVisualizer = ({ sizeRef, columns, canvasRef, canvasOpacity }: GradientVisualizerProps) => {
  // const canvasOpacity = useMotionValue(0)
  const cols = useMotionValue(1)
  const scaleUpCols = useTransform(cols, [1, 10], [0.75, 1])
  const scaleDownCols = useTransform(cols, [1, 10], [1.05, 1])
  return (
    <motion.div
    className={styles.visualizer} ref={sizeRef}
  >
    <motion.canvas
      initial={false}
      style={{
        opacity: canvasOpacity,
        '--scale-up': scaleDownCols,
        '--scale-down': scaleUpCols,
      } as any}
      whileHover={{
        // zIndex: 100,
        scale: 'var(--scale-up)'
      }}
      whileTap={{
        scale: 'var(--scale-down)'
      }}
      ref={canvasRef}
      onClick={() => {
        const next = columns.current + 1
        if (next > 10) return columns.current = 1
        columns.current = next
        cols.set(next)
      }}
    />
  </motion.div>
  )
}

export default GradientVisualizer