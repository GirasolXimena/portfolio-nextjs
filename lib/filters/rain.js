import { calculateRelativeBrightness } from "../util/image";

export default (canvas, image) => {
  const { width, height } = canvas;
  const ctx = canvas.getContext("2d");

  async function init() {
    for (let i = 0; i < numberOfParticles; i++) {
      await particlesArray.push(new Particle());
    }
  }

  function animate() {
    ctx.globalAlpha = 0.05;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);
    ctx.globalAlpha = 0.2
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      ctx.globalAlpha = particlesArray[i].speed / 2;
      particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
  }

  ctx.drawImage(image, 0, 0);
  const pixels = ctx.getImageData(0, 0, width, height);
  ctx.clearRect(0, 0, width, height);

  let particlesArray = [];
  const numberOfParticles = width;

  let mappedImage = [];

  for (let y = 0; y < height; y++) {
    let row = [];
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;
      const r = pixels.data[index];
      const g = pixels.data[index + 1];
      const b = pixels.data[index + 2];
      const cellBrightness = calculateRelativeBrightness(r, g, b);
      const cell = [
        cellBrightness
      ]
      row.push(cell);
    }
    mappedImage.push(row);
  }

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = 0;
      this.speed = 0;
      this.velocity = Math.random() * 0.5;
    }
    get position1() {
      return Math.floor(this.y)
    }
    get position2() {
      return Math.floor(this.x)
    }
    get size() {
      return Math.random() * 1.5 + 1
    }
    update() {
      this.speed = mappedImage[this.position1][this.position2][0]
      let movement = (2.5 - this.speed) + this.velocity
      this.y += movement;
      if (this.y >= height) {
        this.y = 0;
        this.x = Math.random() * width;
      }
    }
    draw() {
      ctx.beginPath()
      ctx.fillStyle = 'white'
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
      ctx.fill()
    }
  }

  init();
  animate();
}