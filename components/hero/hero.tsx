"use client";
import styles from "styles/hero.module.scss";
import AudioMotionAnalyzer from "audiomotion-analyzer";
import { useEffect, useRef } from "react";
import useAudioContext from "hooks/useAudioContext";
import { useEffectOnce, useElementSize, useUpdateEffect } from "usehooks-ts";
import { mergeRefs } from "react-merge-refs";
import usePaletteContext from "hooks/usePaletteContext";
import convert from "color-convert";
import { PaletteProperties } from "types";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import useTransitionContext from "hooks/useTransitionContext";
import { setCustomProperties } from "lib/util";
import { normalizeToSum } from "lib/util/number";
import { hslStringToArray, isHexColor, toColorString } from "lib/util/color";
import { getImageDataFromDrawingFunction } from "lib/util/image";
import GradientVisualizer from "./gradient-visualizer";
import ColorPicker from "./color-picker";
import TitleContent from "./title-content";

function drawGradients(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  colors: string[],
  energies?: number[],
  image?: HTMLImageElement
) {
  // Set the center at the bottom-right corner of the canvas
  const centerX = width;
  const centerY = height;
  // console.log('drawing gradients', width, height, centerX, centerY)
  // The radius will be the width (or height, since it's a square) of the canvas

  console.log(image);
  if (image) {
    ctx.globalAlpha = 0.75;
    ctx.drawImage(image, 0, 0, width, height);
    ctx.globalAlpha = 1;
  }
  // const gradient = ctx.createRadialGradient(0, 0, 0,  width,height , 0, 100)
  const x0 = 0;
  const y0 = 0;
  const x1 = width;
  const y1 = height;
  const r0 = 0;
  const r1 = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
  const gradient = ctx.createRadialGradient(
    width,
    height,
    0,
    width,
    height,
    r1
  );
  ctx.globalAlpha = 0.9;
  if (
    energies &&
    energies.length === 3 &&
    energies.every((energy) => energy > 0)
  ) {
    const [low, mid, high] = normalizeToSum(energies);
    gradient.addColorStop(0, colors[0]);

    gradient.addColorStop(low + mid * 0.25, colors[1]);

    gradient.addColorStop(1 - high / 4, colors[2]);
  } else {
    gradient.addColorStop(0, colors[0]);
    gradient.addColorStop(0.5, colors[1]);
    gradient.addColorStop(1, colors[2]);
  }

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  ctx.globalAlpha = 1;
}

export const shuffle = (columns) => {
  const totalCells = columns * columns;
  const cells = Array.from(
    { length: totalCells },
    (_, i) => totalCells - (i + 1)
  );
  return cells;
};

function drawShuffledGradients(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  imageData: HTMLCanvasElement,
  columns: number
) {
  const cellWidth = Math.floor(width / columns);
  const cellHeight = Math.floor(height / columns);
  const totalCells = columns * columns;
  const shuffledIndexes = shuffle(columns);
  // console.log('drawing', width, height, columns, cellWidth, cellHeight, totalCells)

  // console.log('Shuffled indexes:', shuffledIndexes, height, columns, cellWidth, cellHeight);

  for (let i = 0; i < totalCells; i++) {
    const x = i % columns;
    const y = Math.floor(i / columns);

    const shuffledIndex = shuffledIndexes[i];
    const sx = shuffledIndex % columns;
    const sy = Math.floor(shuffledIndex / columns);

    // const cellImageData = extractImageData(imageData, sx * cellWidth, sy * cellHeight, cellWidth, cellHeight);
    const dx = x * cellWidth;
    const dy = y * cellHeight;

    let destCellWidth = cellWidth;
    let destCellHeight = cellHeight;

    // Adjust the width and height for the last column and row
    if (x === columns - 1) {
      destCellWidth = width + dx;
      // destCellWidth = 0
    }
    if (y === columns - 1) {
      destCellHeight = height + dy;
      // destCellHeight = 0
    }

    ctx.save(); // save the current canvas state
    if (columns > 1) {
      ctx.setTransform(
        true ? -1 : 1,
        0, // set the direction of x axis
        0,
        true ? -1 : 1, // set the direction of y axis
        x + (true ? width : 0), // set the x origin
        y + (true ? height : 0) // set the y origin
      );
    }

    ctx.globalCompositeOperation = "color-dodge";

    ctx.drawImage(
      imageData,
      sx * cellWidth,
      sy * cellHeight,
      cellWidth,
      cellHeight,
      dx,
      dy,
      destCellWidth,
      destCellHeight
    );

    ctx.restore();
    // if(columns > 1) {
    //   mirrorImage(ctx, imageData, dx, dy, true, true);
    // }
  }
}

export default function Hero({ name }: { name: string }) {
  const maxColumns = 10;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { playing, audioNode } = useAudioContext();
  const columns = useRef(1);

  const { currentPalette } = usePaletteContext();
  const motionAnalyzerRef = useRef<AudioMotionAnalyzer>();
  const background = useRef<string>("");
  const canvasOpacity = useMotionValue(0);
  const backgrounds = [
    "/images/lost.jpg",
    "/images/cute.jpg",
    "/images/wave.jpg",
  ];
  const imageRef = useRef<HTMLImageElement | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [sizeRef, { width = 0, height = 0 }] = useElementSize();
  const light = useRef(
    toColorString(convert.hex.hsl(currentPalette.palette.properties.light))
  );
  const dark = useRef(
    toColorString(convert.hex.hsl(currentPalette.palette.properties.dark))
  );
  const primary = useRef(
    toColorString(convert.hex.hsl(currentPalette.palette.properties.primary))
  );
  const secondary = useRef(
    toColorString(convert.hex.hsl(currentPalette.palette.properties.secondary))
  );
  const tertiary = useRef(
    toColorString(convert.hex.hsl(currentPalette.palette.properties.tertiary))
  );

  const { onUpdate } = useTransitionContext();

  const bgCycle = () => {
    const currentIndex = backgrounds.indexOf(background.current);
    const nextIndex = (currentIndex + 1) % backgrounds.length;
    background.current = backgrounds[nextIndex];
    setCustomProperties(
      {
        "bg-image": `url(${background.current})`,
      },
      canvasRef.current || undefined
    );
  };

  useEffect(() => {
    if (audioNode && containerRef.current) {
      console.log("audio node", audioNode);
      // connect gain node
      if (motionAnalyzerRef.current) {
        console.log("disconnecting old analyzer");
        motionAnalyzerRef.current.disconnectInput();
        console.log("connecting new analyzer to: ", audioNode);
        motionAnalyzerRef.current.connectInput(audioNode);
      }
    } else {
      console.log("no audio node");
    }
  }, [audioNode]);

  useUpdateEffect(() => {
    console.log("playing changed", playing);
    // if (!containerRef.current) return console.error('no container')
    if (playing) {
      // if it's playing there should always be an audio node because
      // that's the thing that is playing
      if (!audioNode) return console.error("no audio node");
      if (motionAnalyzerRef.current) {
        motionAnalyzerRef.current.disconnectInput();
        motionAnalyzerRef.current.connectInput(audioNode);
        motionAnalyzerRef.current.toggleAnalyzer(true);
      } else {
        console.log("creating new analyzer");
        motionAnalyzerRef.current = new AudioMotionAnalyzer(undefined, {
          source: audioNode,
          fftSize: 2048,
          colorMode: "bar-index",
          // lumiBars: true,
          connectSpeakers: false,
          barSpace: 1,
          // linearAmplitude: true,
          // start: false,
          useCanvas: false,
          // smoothing: 0.9,
          showPeaks: true,
          // peakLine: true,
          // ansiBands: false,
          // frequencyScale: 'bark',
          showScaleX: false,
          mode: 10,
          // radial: true,
          fillAlpha: 0,
          lineWidth: 10,
          showFPS: true,
          // mirror: 1,
          overlay: true,
          showBgColor: false,
          onCanvasDraw: (instance) => {
            const ctx = canvasRef.current?.getContext("2d");
            if (!ctx) return console.error("no context");
            ctx.clearRect(0, 0, width, height);
            const highs = instance.getEnergy("mid");
            const mids = instance.getEnergy("lowMid");
            const lows = instance.getEnergy("bass");
            const energies = [lows, mids, highs];
            // console.log('energies', energies)
            const colors = [
              primary.current,
              secondary.current,
              tertiary.current,
            ];
            // drawGradients(tempCtx, width, height, colors, energies, image)
            const drawFunction = (ctx: CanvasRenderingContext2D) =>
              drawGradients(
                ctx,
                width,
                height,
                colors,
                energies,
                imageRef.current
              );
            const gradientImageData = getImageDataFromDrawingFunction(
              width,
              height,
              drawFunction
            );
            if (!gradientImageData)
              return console.error("no gradient image data");
            drawShuffledGradients(
              ctx,
              width,
              height,
              gradientImageData,
              columns.current
            );
          },
        });
      }
    } else {
      if (motionAnalyzerRef.current) {
        console.log("turning off analyzer");
        motionAnalyzerRef.current.toggleAnalyzer(false);
      }
    }
  }, [playing]);

  useEffectOnce(() => {
    onUpdate.current = (latest) => {
      const colors = [
        latest["--primary"],
        latest["--secondary"],
        latest["--tertiary"],
      ];
      primary.current = colors[0];
      secondary.current = colors[1];
      tertiary.current = colors[2];
      if (!canvasRef.current) return console.error("no canvas");
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (!ctx) return console.error("no context");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // console.log('updaded colors', colors, motionAnalyzerRef.current)
      const highs = motionAnalyzerRef.current?.getEnergy("mid");
      const mids = motionAnalyzerRef.current?.getEnergy("lowMid");
      const lows = motionAnalyzerRef.current?.getEnergy("bass");
      const energies = [lows, mids, highs] as number[];
      const drawingFunction = (ctx: CanvasRenderingContext2D) =>
        drawGradients(
          ctx,
          canvas.width,
          canvas.height,
          colors,
          energies,
          imageRef.current
        );
      const gradientImageData = getImageDataFromDrawingFunction(
        canvas.width,
        canvas.height,
        drawingFunction
      );
      if (!gradientImageData) return console.error("no gradient image data");
      drawShuffledGradients(
        ctx,
        canvas.width,
        canvas.height,
        gradientImageData,
        columns.current
      );
    };

    animate(canvasOpacity, 1, {
      duration: 1,
      // delay: 0.5
    });
  });

  useUpdateEffect(() => {
    if (!canvasRef.current) return console.error("no canvas");
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!width || !height) return;
    canvas.width = width;
    canvas.height = height;
    if (!ctx) return console.error("no context");
    const colors = [primary.current, secondary.current, tertiary.current];
    const drawingFunction = (ctx: CanvasRenderingContext2D) =>
      drawGradients(ctx, width, height, colors, undefined, imageRef.current);
    const gradientImageData = getImageDataFromDrawingFunction(
      width,
      height,
      drawingFunction
    );
    if (!gradientImageData) return console.error("no gradient image data");
    drawShuffledGradients(
      ctx,
      width,
      height,
      gradientImageData,
      columns.current
    );
  }, [width, height]);

  return (
    <div className={styles.hero}>
      {/* box A */}
      <GradientVisualizer
        sizeRef={sizeRef}
        columns={columns}
        canvasRef={canvasRef}
        canvasOpacity={canvasOpacity}
      />
      {/* box A */}

      {/* box B */}
      <TitleContent
        name={name}
        columns={columns}
        background={background}
        imageRef={imageRef}
        bgCycle={bgCycle}
      />
      {/* box B */}

      {/* box C */}
      <ColorPicker label="dark" color={dark} />
      {/* box C */}

      {/* box D */}
      <ColorPicker label="light" color={light} />
      {/* box D */}

      {/* box E */}
      <ColorPicker label="primary" color={primary} />
      {/* box E */}

      {/* box F */}
      <ColorPicker label="secondary" color={secondary} />
      {/* box F */}

      {/* box G */}
      <ColorPicker label="tertiary" color={tertiary} />
      {/* box G */}
    </div>
  );
}
