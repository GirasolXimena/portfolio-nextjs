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
  }
}

export default utilities