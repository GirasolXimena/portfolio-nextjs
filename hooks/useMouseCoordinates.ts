import { useEffect, useState } from "react"

function useMouseCoordinates(cartesian = false, prefersReducedMotion = false) {
  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 })
  useEffect(() => {
    console.log('setting up mouse coordinates')
    const handleMouseMove = (event: MouseEvent) => {
      console.log('mouse move')
      if (cartesian) {
        setMouseCoordinates({
          x: (event.clientX - (window.innerWidth / 2)) / (window.innerWidth / 2),
          y: (event.clientY - (window.innerHeight / 2)) / (window.innerHeight / 2)
        })
      } else {
        setMouseCoordinates({
          x: event.clientX,
          y: event.clientY
        })
      }
    }
    if (!prefersReducedMotion) {
      document.addEventListener("mousemove", handleMouseMove)
    }
    return () => {
      if (!prefersReducedMotion) {
        document.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [prefersReducedMotion, cartesian])

  return mouseCoordinates
}


export default useMouseCoordinates