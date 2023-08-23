import {
  motion,
  useAnimationFrame,

} from "framer-motion";
import { useState } from "react";

const ORBIT_RADIUS = 20; // Control how far the gradient moves from the center
const customComputeX = (i) => 50 + (ORBIT_RADIUS * Math.sin(i + (Math.PI / 2 * i))); // Add phase shifts for variation
const customComputeY = (i) => 50 + (ORBIT_RADIUS * Math.cos(i + (Math.PI / 3 * i))); // Add phase shifts for variation


function Gradient({ index, time, color }) {
  const x = customComputeX(time + index);
  const y = customComputeY(time + index);
  console.log({ x, y })
  return (
    <motion.div
      transition={{ duration: 0.05 }}
      style={{
        backgroundImage: `radial-gradient(farthest-corner at ${x}% ${y}%, var(--${color}), transparent)`,
        // display: 'none',
        zIndex: -5,
        originX: 0,
        originY: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    />
  );

}

function BackgroundAnimation({ children, className }) {
  const [time, setTime] = useState(0);

  useAnimationFrame((time) => {
    const adjustedTime = time / 3000;
    setTime(adjustedTime);
  })

  return (
    <>
      <motion.div
        className={className}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -1,
          width: '100vw',
          height: '100vh',
          backgroundImage: 'linear-gradient(var(--background), var(--background)), var(--noise-1)',
          backgroundSize: 'cover',
          mixBlendMode: 'soft-light',
          opacity: 1,
        }}
      />
      <Gradient
        index={0}
        time={time}
        color="primary"
      />
      <Gradient
        index={1}
        time={time}
        color="secondary"
      />
      <Gradient
        index={2}
        time={time}
        color="tertiary"
      />
      {children}
    </>
  )
}

export default BackgroundAnimation