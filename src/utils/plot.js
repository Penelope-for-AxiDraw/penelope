const plot = (currentSvgData, axiWebsocket) => {
  if (currentSvgData && axiWebsocket) {
    const pattern = /^(.*[\\/])/;
    const [root_url] = currentSvgData.images.svg.url.match(pattern);
    const fileName = currentSvgData.images.svg.fileName;
    axiWebsocket.send(`plot|${root_url}|${fileName}`);
  }
}

export default plot;
