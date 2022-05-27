import { useEffect, useRef, useState } from "react";
import useAnimationFrame from "../../../hooks/useAnimationFrame";
import Circle from "./Circle";
import { SPINNER_CANVAS_HT, SPINNER_CANVAS_WD, TWO_PI } from "../../constants";

const cX = SPINNER_CANVAS_WD / 2;
const cY = SPINNER_CANVAS_HT / 2;
const duration = 4000;

const defaultCircles = [];
for (let i = 0; i < 48; i++) {
  defaultCircles.push(new Circle(duration));
}

const BurstSpinner = () => {
  const canvasRef = useRef(null)  


  const [time, setTime] = useState(0);
  const [circles, setCircles] = useState(defaultCircles);

  useEffect(() => {
    const spinnerCanvas = canvasRef.current
    const ctx = spinnerCanvas.getContext('2d');
    //Our first draw
    // ctx.fillStyle = '#222222';
    // ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.clearRect(0, 0, SPINNER_CANVAS_WD, SPINNER_CANVAS_HT);

    const elapsed = Date.now() % duration;
    circles.forEach(circ => {
      circ.update(elapsed, cX, cY);
      circ.render(ctx);
    });
  }, [circles])
  
  useAnimationFrame(deltaTime => {
    // Pass on a function to the setter of the state
    // to make sure we always have the latest state
    setTime(prevTime => (prevTime + deltaTime));

    const spinnerCanvas = canvasRef.current;
    const ctx = spinnerCanvas.getContext('2d');

    // ctx.fillStyle = '#222222';
    // ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.clearRect(0, 0, SPINNER_CANVAS_WD, SPINNER_CANVAS_HT);

    const elapsed = Date.now() % duration;
    circles.forEach(circ => {
      circ.update(elapsed, cX, cY);
      circ.render(ctx);
    });

    ctx.beginPath();
    ctx.arc(cX, cY, 60 + 100 * elapsed / duration, 0, TWO_PI, false);
    ctx.strokeStyle = `rgb(255 255 255 / ${1 - elapsed / duration})`;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cX, cY, 60 + 80 * elapsed / duration, 0, TWO_PI, false);
    ctx.strokeStyle = `rgb(255 255 255 / ${1 - elapsed / duration})`;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cX, cY, 60, 0, TWO_PI, false);
    // ctx.fillStyle = '#222222';
    ctx.fillStyle = 'rgb(68 0 163 / 0.25)';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.stroke();
  });

  return (
    <div className="burstSpinnerContainer">
      <canvas ref={canvasRef} id="burst-spinner" width={SPINNER_CANVAS_WD} height={SPINNER_CANVAS_HT}></canvas>
    </div>
  );
}

export default BurstSpinner;
