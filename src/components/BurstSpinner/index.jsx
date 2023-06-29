import { useEffect, useRef, useState } from "react";
import useAnimationFrame from "../../../hooks/useAnimationFrame";
import Circle from "./Circle";
import { SPINNER_CANVAS_HT, SPINNER_CANVAS_WD, TWO_PI } from "../../constants";
import { drawBackground } from "./helpers";

const cX = SPINNER_CANVAS_WD / 2;
const cY = SPINNER_CANVAS_HT / 2;
const duration = 4000;
const fadeDuration = 320;

const defaultCircles = [];
for (let i = 0; i < 48; i++) {
  defaultCircles.push(new Circle(duration));
}

const defaultBgColor = [68, 0, 163];
const defaultRingColor = [255, 255, 255];

const BurstSpinner = ({
  bgCo = defaultBgColor,
  ringCo = defaultRingColor,
}) => {
  const canvasRef = useRef(null)
  const circles = defaultCircles;
  const fadeInStart = Date.now();

  useEffect(() => {
    const spinnerCanvas = canvasRef.current
    const ctx = spinnerCanvas.getContext('2d');
    //Our first draw
    ctx.clearRect(0, 0, SPINNER_CANVAS_WD, SPINNER_CANVAS_HT);

    const elapsed = Date.now() % duration;
    circles.forEach(circ => {
      circ.update(elapsed, cX, cY, 0);
      circ.render(ctx);
    });
  }, [circles]);

  const renderEverythingEverywhere = () => {
    // Pass on a function to the setter of the state
    // to make sure we always have the latest state
    // setTime(prevTime => (prevTime + deltaTime));

    const spinnerCanvas = canvasRef.current;
    const ctx = spinnerCanvas.getContext('2d');
    // TODO: This getContext causes a null error occasionally.

    const fadeTimer = Date.now() - fadeInStart;
    const opa = fadeTimer < fadeDuration ? 0.86 * fadeTimer / fadeDuration : 0.86;

    ctx.clearRect(0, 0, SPINNER_CANVAS_WD, SPINNER_CANVAS_HT);
    // drawBackground(ctx, `rgb(68 0 163 / ${opa})`);
    drawBackground(ctx, `rgb(${bgCo[0]} ${bgCo[1]} ${bgCo[2]} / ${opa})`);

    const elapsed = Date.now() % duration;
    circles.forEach(circ => {
      circ.update(elapsed, cX, cY, opa);
      circ.render(ctx);
    });

    // Render animated rings
    ctx.beginPath();
    ctx.arc(cX, cY, 60 + 100 * elapsed / duration, 0, TWO_PI, false);
    ctx.strokeStyle = `rgb(${ringCo[0]} ${ringCo[1]} ${ringCo[2]} / ${opa * (1 - elapsed / duration)})`;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cX, cY, 60 + 80 * elapsed / duration, 0, TWO_PI, false);
    ctx.strokeStyle = `rgb(${ringCo[0]} ${ringCo[1]} ${ringCo[2]} / ${opa * (1 - elapsed / duration)})`;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cX, cY, 60, 0, TWO_PI, false);
    ctx.fillStyle = `rgb(68 0 163 / ${opa * 0.25})`;
    ctx.fill();
    ctx.strokeStyle = `rgb(${ringCo[0]} ${ringCo[1]} ${ringCo[2]} / ${opa})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  useAnimationFrame(deltaTime => {
    // NOTE this check of canvasRef.current is a workaround for a `Cannot
    // read property 'getContext' of Null` error. We should re-evaluate
    // this entire animation to see if there's a better approach
    if (canvasRef.current) {
      renderEverythingEverywhere();
    }
  });

  return (
    <div className="burstSpinnerContainer">
      <canvas ref={canvasRef} id="burst-spinner" width={SPINNER_CANVAS_WD} height={SPINNER_CANVAS_HT}></canvas>
    </div>
  );
}

export default BurstSpinner;
