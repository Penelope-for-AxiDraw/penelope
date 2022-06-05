import { randomValueBetween } from "./helpers";
import { SPINNER_CANVAS_HT, SPINNER_CANVAS_WD, TWO_PI } from "../../constants";

const minDist = 60;
const maxDist = 150;
const minSize = 1;
const maxSize = 6;

class Circle {
  constructor(duration) {
    this.duration = duration;
    this.radius = randomValueBetween(minSize, maxSize);
    this.angle = Math.random() * TWO_PI;
    this.t0 = Math.random() * duration;
    this.x = 0;
    this.y = 0;
    this.opacity = 1;
    // this.fadeCount = 0;
  }

  update(elapsed, cX, cY, fadeAmount) {
    // if (this.fadeCount < 240) {
    //   this.fadeCount++;
    // }
    const t = ((this.t0 + elapsed) % this.duration) / this.duration;
    const distance = minDist + t * (maxDist + this.radius - minDist);
    this.x = cX + distance * Math.cos(this.angle);
    this.y = cY + distance * Math.sin(this.angle);
    this.opacity = fadeAmount * (t <= 0.75 ? 1 : 1 - (t - 0.75) / 0.25);
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, TWO_PI, false);
    // ctx.fillStyle = '#222222';
    // ctx.fillStyle = 'rgb(68 0 163)';
    ctx.fillStyle = `rgb(68 0 163 / ${this.opacity})`;
    ctx.fill();
    ctx.strokeStyle = '#ffffff'; // `rgb(255 255 255 / ${this.opacity})`;
    ctx.lineWidth = 2 * this.opacity;
    ctx.stroke();
  }
}

export default Circle;
