"use client";
import clsx from "clsx";
import { cn } from "../../lib/util/cn";
import React, { useEffect, useRef, useState } from "react";
// import { useResizeObserver } from "usehooks-ts";
import { WavyBackgroundAnimation } from "./wavy-background.helper";
import { useDebounceCallback, useResizeObserver } from "usehooks-ts";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors = ["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"],
  waveWidth = 50,
  backgroundFill = "Black",
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: any;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: any;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<WavyBackgroundAnimation | null>(null);
  useEffect(() => {
    if (!canvasRef.current || !!animationRef.current) return;
    animationRef.current = new WavyBackgroundAnimation({
      canvas: canvasRef.current
    });
    animationRef.current.setup();

    return () => {
      animationRef.current?.destroy();
    };
  }, []);


  useEffect(() => {
    if(!animationRef.current) return
    console.log('setting stuff')
    animationRef.current.waveOpacity = waveOpacity
    animationRef.current.waveWidth = waveWidth
    animationRef.current.colors = colors
    animationRef.current.backgroundFill = backgroundFill
    animationRef.current.speed = speed
  }, [backgroundFill, colors, speed, waveOpacity, waveWidth])

  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    // I'm sorry but i have got to support it on safari.
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  const onResize = ({ height = 0, width = 0 }) => {
    if (!animationRef.current) return;
    animationRef.current.height = height;
    animationRef.current.width = width;
    animationRef.current.setup();
  };
  useResizeObserver({
    ref: containerRef,
    onResize: useDebounceCallback(onResize, 100),
  });

  return (
    <div className={clsx("relative", containerClassName)} ref={containerRef}>
      <canvas
        className="absolute inset-0 z-0"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      ></canvas>
      <div className={cn("relative z-10 grow", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
