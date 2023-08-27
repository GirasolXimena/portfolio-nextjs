
export const utilities = {
  toCartesianCoords: ({ x, y }) => {
    const { width, height } = document.documentElement.getBoundingClientRect()
    const halfWidth = width / 2
    const halfHeight = height / 2
    const xPos = x - halfWidth
    const yPos = y - halfHeight
    return {
      x: xPos / width,
      y: yPos / height
    }
  },
  toPolarCoords: ({ x, y }) => {
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
  },
  setCustomProperties: (
    properties: Record<string, string>,
    element?: HTMLElement
  ) => {
    const targetElement = element || document.documentElement;
  
    Object.entries(properties).forEach(([key, value]) => {
      const formattedKey = key.startsWith('--') ? key : `--${key}`;
      targetElement.style.setProperty(formattedKey, value);
    });
  },
  getCustomProperty: (property: string, element?: HTMLElement) => {
    const targetElement = element || document.documentElement;
    return getComputedStyle(targetElement).getPropertyValue(property);
  }
}

export default utilities