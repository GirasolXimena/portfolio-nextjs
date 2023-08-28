import { useEffect, useRef, useState } from "react";

function useMouseCoordinates(cartesian = false, prefersReducedMotion = false, causesRerender = true) {
  const mouseCoordinatesRef = useRef({ x: 0, y: 0 });
  const [mouseCoordinatesState, setMouseCoordinatesState] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.log('setting up mouse coordinates')

    const handleMouseMove = (event) => {
      let newCoordinates;

      if (cartesian) {
        newCoordinates = {
          x: (event.clientX - (window.innerWidth / 2)) / (window.innerWidth / 2),
          y: (event.clientY - (window.innerHeight / 2)) / (window.innerHeight / 2)
        };
      } else {
        newCoordinates = {
          x: event.clientX,
          y: event.clientY
        };
      }

      mouseCoordinatesRef.current = newCoordinates;
      if (causesRerender) {
        setMouseCoordinatesState(newCoordinates);
      }
    };

    if (!prefersReducedMotion) {
      document.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (!prefersReducedMotion) {
        document.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [prefersReducedMotion, cartesian, causesRerender]);

  return causesRerender ? mouseCoordinatesState : mouseCoordinatesRef.current;
}

export default useMouseCoordinates;
