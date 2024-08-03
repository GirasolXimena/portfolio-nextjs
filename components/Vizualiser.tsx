"use client";

import { useEffect, useRef } from "react";
import Hydra from "hydra-synth";

const initHydra = ({ makeGlobal, canvas }) => {
  canvas.width = 800;
  canvas.height = 800;
  const hydra = new Hydra({
    canvas: canvas,
    detectAudio: false,
    enableStreamCapture: false,
    makeGlobal,
    autoLoop: false, // important!!
  });
  return hydra;
};

export const Vizualiser = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let start = 0;
    let previous = 0;
    let animationId = 0;

    const hydra = initHydra({
      makeGlobal: false,
      canvas: canvasRef.current,
    });

    const step = (timestamp: number) => {
      const dt = timestamp - previous;

      if (start === 0) {
        start = timestamp;
      }

      hydra.tick(dt);

      previous = timestamp;
      animationId = requestAnimationFrame(step);
    };

    const synth = hydra.synth;

    synth
      .noise(18)
      .colorama(1)
      .posterize(2)
      .kaleid(50)
      .mask(synth.shape(25, 0.25).modulateScale(synth.noise(400.5, 0.5)))
      .mask(synth.shape(400, 1, 2.125))
      .modulateScale(synth.osc(6, 0.125, 0.05).kaleid(50))
      .mult(synth.osc(20, 0.05, 2.4).kaleid(50), 0.25)
      .scale(1.75, 0.65, 0.5)
      .modulate(synth.noise(0.5))
      .saturate(6)
      .posterize(4, 0.2)
      .scale(1.5)
      .out();

    animationId = requestAnimationFrame(step);

    return () => {
      console.log("cnacnnen");
      return cancelAnimationFrame(animationId);
    };
  }, [canvasRef]);

  return (
    <div
      style={{
        backgroundColor: "black",
        position: "fixed",
        zIndex: "1000",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "2em",
        border: "1em solid gold",
      }}
    >
      <canvas ref={canvasRef} id="canvas"></canvas>
    </div>
  );
};
