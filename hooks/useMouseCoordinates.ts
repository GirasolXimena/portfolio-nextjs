import { useEffect, useState } from "react"

function useMouseCoordinates(cartesian = false, prefersReducedMotion = false) {
  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const {
      matches: prefersReducedMotion
    } = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMouseMove = (event: MouseEvent) => {
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
  })

  return mouseCoordinates
}


export default useMouseCoordinates