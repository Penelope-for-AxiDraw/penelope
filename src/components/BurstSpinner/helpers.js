function randomValueBetween(minValue, maxValue) {
  return minValue + Math.random() * (maxValue - minValue);
}

function drawBackground() {
  // to set a background, we create a rect and fill it
  ctx2.fillStyle = '#888892';
  ctx2.fillRect(0, 0, c2.width, c2.height);  
}

function easeInQuart(t) {
  return t * t * t * t;
}

export {
  randomValueBetween,
  drawBackground,
  easeInQuart,
}
