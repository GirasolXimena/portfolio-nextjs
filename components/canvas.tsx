import { useRef, useEffect, CanvasHTMLAttributes, RefObject } from 'react'
import drawArrow from './drawArrow'
type CanvasProps = CanvasHTMLAttributes<HTMLCanvasElement> & {
  fromx: number;
  fromy: number;
  tox: number;
  toy: number;
  headlen: number;
  height?: number;
  width?: number;
  ref?: RefObject<HTMLCanvasElement>
  
};

const Canvas = (props: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = props.ref?.current || canvasRef.current
    if (!canvas) return
    const { height, width } = canvas.getBoundingClientRect()
    const context = canvas.getContext('2d')
    canvas.height = props.height || height
    canvas.width = props.width || width
    drawArrow(context, props.fromx, props.fromy, props.tox, props.toy, props.headlen)

  }, [props.fromx, props.fromy, props.tox, props.toy, props.headlen, props.height, props.width, props.ref])

export default Canvas;
