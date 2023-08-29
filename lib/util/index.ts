import { animate } from "framer-motion"

export const toCartesianCoords = ({ x, y }) => {
  const { width, height } = document.documentElement.getBoundingClientRect()
  const halfWidth = width / 2
  const halfHeight = height / 2
  const xPos = x - halfWidth
  const yPos = y - halfHeight
  return {
    x: xPos / width,
    y: yPos / height
  }
}

export const toPolarCoords = ({ x, y }) => {
  const { width, height } = document.documentElement.getBoundingClientRect()
  const halfWidth = width / 2
  const halfHeight = height / 2
  const xPos = x - halfWidth
  const yPos = y - halfHeight
  const distance = Math.sqrt(xPos * xPos + yPos * yPos)
  const angle = Math.atan2(yPos, xPos)
  return {
    distance: distance / Math.min(width, height),
    angle
  }
}

export const setCustomProperties = (
  properties: Record<string, string>,
  element?: HTMLElement
) => {
  const targetElement = element || document.documentElement;

  Object.entries(properties).forEach(([key, value]) => {
    const formattedKey = key.startsWith('--') ? key : `--${key}`;
    targetElement.style.setProperty(formattedKey, value);
  });
}

export const getCustomProperty = (property: string, element?: HTMLElement) => {
  const targetElement = element || document.documentElement;
  return getComputedStyle(targetElement).getPropertyValue(property);
}

export const animateProperties = (from, to, property) => {
  animate(from, to, {
    duration: 2,
    onUpdate: (latest) => utilities.setCustomProperties({ [property]: latest }),
  });
}

export const utilities = {
  toCartesianCoords,
  toPolarCoords,
  setCustomProperties,
  getCustomProperty,
  animateProperties
}

export default utilities