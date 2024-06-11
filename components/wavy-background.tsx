"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDebounceCallback, useResizeObserver } from "usehooks-ts";
import useTransitionContext from "hooks/useTransitionContext";
import { createNoise3D } from "simplex-noise";
import { useAnimationFrame } from "framer-motion";
import usePrefersReducedMotion from "hooks/usePreferesReducedMotion";
import styles from "styles/wavy-background.module.css";

const noise = createNoise3D();

const getSpeed = (speed: string | number) => {
  switch (speed) {
    case "slow":
      return 0.001;
    case "fast":
      return 0.002;
    default:
      return typeof speed === "number" ? speed : 0.001;
  }
};

let nt = new Date().getSeconds();
export const WavyBackground = ({
  waveWidth = 25,
  blur = 10,
  speed = "slow",
  waveOpacity = 0.5,
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
  useAnimationFrame((time, delta) => {
    if (prefersReducedMotion || !ctx) return;
    ctx.filter = `blur(${blur}px)`;
    ctx.fillStyle = "transparent";
    ctx.globalAlpha = waveOpacity;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawWave(delta);
  });

  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome"),
    );
  }, []);

  const onResize = ({ height = 0, width = 0 }) => {
    if (!canvasRef.current) return;
    canvasRef.current.height = window.innerHeight;
    canvasRef.current.width = window.innerWidth;
    if (!ctx) return;
    ctx.canvas.width = width;
    ctx.canvas.height = height;
  };

  const drawWave = (delta: number) => {
    if (!ctx) return;

    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    nt += getSpeed(speed) * (delta / 4);
    const beamNumber = colorKeys.length;
    for (let i = 0; i < beamNumber; i++) {
      ctx.beginPath();
      ctx.lineWidth = waveWidth;
      ctx.strokeStyle = currentThemeColorsRef.current[colorKeys[i]];
      for (let x = 0; x < width; x += beamNumber) {
        var y = noise(x / 400, i, nt) * 100;
        ctx.lineTo(x, y + height * 0.5); // adjust for height, currently at 50% of the container
      }
      ctx.stroke();
      ctx.closePath();
    }
  };

  useResizeObserver({
    ref: containerRef,
    onResize: useDebounceCallback(onResize),
  });

  useEffect(() => {
    if (!canvasRef.current) return;
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <canvas
        className={styles.canvas}
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      ></canvas>
    </div>
  );
};
