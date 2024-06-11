import { animate } from "framer-motion";
import convert from "color-convert";
import { PaletteProperties } from "types";
import palettes from "styles/palettes";
import { Palette } from "types";

type InputCoords = {
  x?: number;
  y?: number;
};

type ConvertedCoords = {
  x?: number;
  y?: number;
};

type PolarCoords = {
  distance?: number;
  angle?: number;
};

export const getNextPaletteKey = (current: string, offset: number): string => {
  const paletteNames = Object.keys(palettes);
  const currentIndex = paletteNames.indexOf(current);
  return paletteNames[(currentIndex + offset) % paletteNames.length];
};

export const getPaletteData = (
  key: string,
): { palette: Palette; key: string } => ({
  palette: palettes[key],
  key: key,
});

export const applyPaletteAnimation = (
  sourceProps: PaletteProperties,
  targetProps: PaletteProperties,
  element?: HTMLElement,
): Promise<void[]> => {
  const animations = Object.entries(sourceProps).map(
    ([propertyKey, sourceValue]) => {
      if (propertyKey === "font") return Promise.resolve();
      const targetValue = targetProps[propertyKey];
      return animateColorTransition(
        [sourceValue, targetValue],
        propertyKey,
        element,
      );
    },
  );

  // Return a promise that resolves when all animations have completed
  return Promise.all(animations);
};

export const animateColorTransition = async (
  colors: string[],
  propertyKey: string,
  element?: HTMLElement,
) => {
  for (let i = 0; i < colors.length - 1; i++) {
    const startColor = convert.hex.hsl(colors[i]);
    const endColor = convert.hex.hsl(colors[i + 1]);
    const midpoint = [
      (startColor[0] + endColor[0]) / 2,
      (startColor[1] + endColor[1]) / 2,
      (startColor[2] + endColor[2]) / 2,
    ];

    const startString = `hsl(${startColor.join(", ")})`;
    const midpointString = `hsl(${midpoint.join(", ")})`;
    const endString = `hsl(${endColor.join(", ")})`;

    // Animate to the midpoint
    await animate(startString, midpointString, {
      duration: 1 / 2,
      ease: "easeIn",
      onUpdate: (latest) =>
        setCustomProperties({ [propertyKey]: latest }, element),
    });

    // Animate from the midpoint to the next color
    await animate(midpointString, endString, {
      duration: 1 / 2,
      ease: "easeOut",
      onUpdate: (latest) =>
        setCustomProperties({ [propertyKey]: latest }, element),
    });
  }
};

export const animateMultipleColorGroups = async (
  colorGroups: string[][],
  propertyKey: string,
  element?: HTMLElement,
) => {
  for (let colorArray of colorGroups) {
    await animateColorTransition(colorArray, propertyKey, element);
  }
};

export const toCartesianCoords = ({ x, y }: InputCoords): ConvertedCoords => {
  if (typeof document === "undefined") return {};
  const { width, height } = document.documentElement.getBoundingClientRect();
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  let result: ConvertedCoords = {};

  if (typeof x !== "undefined") {
    const xPos = x - halfWidth;
    result.x = xPos / width;
  }

  if (typeof y !== "undefined") {
    const yPos = y - halfHeight;
    result.y = yPos / height;
  }

  return result;
};

export const toPolarCoords = ({ x, y }: InputCoords): PolarCoords => {
  const { width, height } = document.documentElement.getBoundingClientRect();
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  let result: PolarCoords = {};

  // If both x and y are provided, compute both distance and angle.
  if (typeof x !== "undefined" && typeof y !== "undefined") {
    const xPos = x - halfWidth;
    const yPos = y - halfHeight;
    const distance = Math.sqrt(xPos * xPos + yPos * yPos);
    const angle = Math.atan2(yPos, xPos);
    result = {
      distance: distance / Math.min(width, height),
      angle,
    };
  }
  // If only x is provided, compute its related polar coordinate.
  else if (typeof x !== "undefined") {
    const xPos = x - halfWidth;
    result.distance = Math.abs(xPos) / Math.min(width, height);
    result.angle = xPos >= 0 ? 0 : Math.PI; // 0 for positive x, π for negative x
  }
  // If only y is provided, compute its related polar coordinate.
  else if (typeof y !== "undefined") {
    const yPos = y - halfHeight;
    result.distance = Math.abs(yPos) / Math.min(width, height);
    result.angle = yPos >= 0 ? Math.PI / 2 : -Math.PI / 2; // π/2 for positive y, -π/2 for negative y
  }

  return result;
};

export const formatCssCustomPropertyKey = (key: string) => key.startsWith("--") ? key : `--${key}`;

export const setCustomProperties = (
  properties: Record<string, string>,
  element?: HTMLElement,
) => {
  const targetElement = element || document.documentElement;

  Object.entries(properties).forEach(([key, value]) => {
    const formattedKey = formatCssCustomPropertyKey(key);
    targetElement.style.setProperty(formattedKey, value);
  });
};

export const getCustomProperty = (property: string, element?: HTMLElement) => {
  const key = formatCssCustomPropertyKey(property)
  const targetElement = element || document.documentElement;
  return getComputedStyle(targetElement).getPropertyValue(key);
};

export const utilities = {
  toCartesianCoords,
  toPolarCoords,
  setCustomProperties,
  getCustomProperty,
};

export default utilities;
