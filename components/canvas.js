import { useRef, useEffect } from 'react'
import drawArrow from './drawArrow'

const Canvas = props => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    drawArrow(context)

  }, [])

  return <canvas ref={canvasRef} {...props} />
}

export default Canvas