function randomValueBetween(minValue, maxValue) {
  return minValue + Math.random() * (maxValue - minValue);
}

function drawBackground(context, bgColor) {
  // to set a background, we create a rect and fill it
  context.fillStyle = bgColor;
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
}

function easeInQuart(t) {
  return t * t * t * t;
}

export {
  randomValueBetween,
  drawBackground,
  easeInQuart,
}
