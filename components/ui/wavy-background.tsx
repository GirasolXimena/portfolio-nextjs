"use client";
import clsx from "clsx";
import { cn } from "../../lib/util/cn";
import React, { useEffect, useRef, useState } from "react";
import { useDebounceCallback, useResizeObserver } from "usehooks-ts";
import useTransitionContext from "hooks/useTransitionContext";
import { createNoise3D } from "simplex-noise";
import { useAnimationFrame } from "framer-motion";
import usePrefersReducedMotion from "hooks/usePreferesReducedMotion";

const noise = createNoise3D();

const getSpeed = (speed: string | number) => {
  switch (speed) {
    case "slow":
      return 0.001;
    case "fast":
      return 0.002;
    default:
      return typeof speed === 'number' ? speed : 0.001;
  }
};

let nt = 0;
export const WavyBackground = ({
  children,
  className,
  containerClassName,
  waveWidth = 50,
  blur = 10,
  speed = "slow",
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
  const { currentThemeColorsRef } = useTransitionContext();
  const ctx = canvasRef.current?.getContext("2d");
  if (ctx) ctx.filter = `blur(${blur}px)`;
  const prefersReducedMotion = usePrefersReducedMotion();

  const [isSafari, setIsSafari] = useState(false);
  const colorKeys = Object.keys(currentThemeColorsRef.current);

  useAnimationFrame(() => {
    if (prefersReducedMotion || !ctx) return;
    ctx.filter = `blur(${blur}px)`;
    ctx.fillStyle = "transparent";
    ctx.globalAlpha = waveOpacity;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawWave();
  });

  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  const onResize = ({ height = 0, width = 0 }) => {
    console.log("resized");
    if (!canvasRef.current) return;
    console.log("resized 2");
    canvasRef.current.height = height;
    canvasRef.current.width = width;
  };

  const drawWave = () => {
    const width = canvasRef.current?.width || 0;
    const height = canvasRef.current?.height || 0;
    if (!ctx) return;
    nt += getSpeed(speed);
    const beamNumber = colorKeys.length;
    for (let i = 0; i < beamNumber; i++) {
      ctx.beginPath();
      ctx.lineWidth = waveWidth;
      ctx.strokeStyle = currentThemeColorsRef.current[colorKeys[i]];
      for (let x = 0; x < width; x += beamNumber) {
        var y = noise(x / 800, 0.3 * i, nt) * 100;
        ctx.lineTo(x, y + height * 0.5); // adjust for height, currently at 50% of the container
      }
      ctx.stroke();
      ctx.closePath();
    }
  };

  useResizeObserver({
    ref: containerRef,
    onResize: useDebounceCallback(onResize, 50),
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
