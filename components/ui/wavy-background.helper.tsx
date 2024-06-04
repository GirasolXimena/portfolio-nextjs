import { createNoise3D } from "simplex-noise";

export type WavyBackgroundProps = {
  canvas: HTMLCanvasElement;
  width?: number;
  height?: number;
  waveOpacity?: number;
  backgroundFill?: string;
  speed?: "slow" | "fast";
  colors?: string[];
  waveWidth?: number;
  blur?: number;
};

const noise = createNoise3D();
const getSpeed = (speed: string) => {
  switch (speed) {
    case "slow":
      return 0.001;
    case "fast":
      return 0.002;
    default:
      return 0.001;
  }
};

export const defaultWaveColors = ["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"]

export class WavyBackgroundAnimation {
  ctx: CanvasRenderingContext2D;
  backgroundFill: string;
  waveOpacity: number;
  nt: number;
  speed: string;
  colors: string[];
  waveWidth: number;
  animationId: number;
  blur: number;
  height: number;
  width: number;

  constructor({
    canvas,
    width = 300,
    height = 150,
    backgroundFill = "black",
    waveOpacity = 0.5,
    speed = "fast",
    colors = ["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"],
    waveWidth = 50,
    blur = 10,
  }: WavyBackgroundProps) {
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.width = width;
    this.height = height;
    this.backgroundFill = backgroundFill;
    this.waveOpacity = waveOpacity;
    this.nt = 0;
    this.speed = speed;
    this.colors = colors;
    this.waveWidth = waveWidth;
    this.animationId = 0;
    this.blur = blur;
  }

  drawWave = () => {
    this.nt += getSpeed(this.speed);
    for (let i = 0; i < this.colors.length; i++) {
      this.ctx.beginPath();
      this.ctx.lineWidth = this.waveWidth;
      this.ctx.strokeStyle = this.colors[i % this.colors.length];
      for (let x = 0; x < this.width; x += this.colors.length) {
        var y = noise(x / 800, 0.3 * i, this.nt) * 100;
        this.ctx.lineTo(x, y + this.height * 0.5); // adjust for height, currently at 50% of the container
      }
      this.ctx.stroke();
      this.ctx.closePath();
    }
  };

  animate = () => {
    // console.log("animate", this.animationId);
    this.ctx.fillStyle = this.backgroundFill;
    this.ctx.globalAlpha = this.waveOpacity;
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.drawWave();
    this.animationId = requestAnimationFrame(this.animate);
  };

  resize = () => {
    this.ctx.canvas.width = this.width;
    this.ctx.canvas.height = this.height;
  };

  setup = () => {
    this.resize();
    this.ctx.filter = `blur(${this.blur}px)`;
    if(this.animationId === 0) {
      console.log('start anim')      
      this.animate();
    }
  };

  destroy = () => {
    console.log("destroy", this.animationId);
    cancelAnimationFrame(this.animationId);
    this.animationId = 0
  };
}
