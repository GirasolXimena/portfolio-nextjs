import { useRef, useEffect } from 'react'
import drawArrow from './drawArrow'

const Canvas = props => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    canvas.height = props.height
    canvas.width = props.width
    drawArrow(context, props.fromx, props.fromy, props.tox, props.toy, props.headlen)

  }, [props.fromx, props.fromy, props.tox, props.toy, props.headlen, props.height, props.width])

  return <canvas ref={canvasRef} {...props} />
}

export default Canvas