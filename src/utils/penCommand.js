import { PORT } from "../constants";
import { getFromLocalStorage } from "./storage";

const getAxiInfo = async (infoType) => {
  const penelopeAppHost = getFromLocalStorage('penelopeAppHost') || '';
  const apiPrefix = `http://${penelopeAppHost}:${PORT}/api`;
  const requestUrl = `${apiPrefix}/info?q=${infoType}`;
  const mode = 'cors';
  const headers = {
    'Content-Type': 'application/json'
  };

  const response = await fetch(requestUrl, {
    method: 'GET',
    mode,
    headers,
  }).then(res => res.json());

  return response;
};

const _sendAxiCommand = async (requestBody) => {
  const penelopeAppHost = getFromLocalStorage('penelopeAppHost') || '';
  const apiPrefix = `http://${penelopeAppHost}:${PORT}/api`;
  const requestUrl = `${apiPrefix}/command`;
  const mode = 'cors';
  const headers = {
    'Content-Type': 'application/json'
  };

  const response = await fetch(requestUrl, {
    method: 'POST',
    mode,
    headers,
    body: requestBody,
  });

  return response;
}

const penToggle = async () => {
  const requestBody = JSON.stringify({ action: 'toggle' });
  const response = await _sendAxiCommand(requestBody);
  return response.json();
};

const penAlign = async () => {
  const requestBody = JSON.stringify({ action: 'align' });
  const response = await _sendAxiCommand(requestBody);
  return response.json();
};

const plotDrawing = async (currentSvgData) => {
  const action = 'plot';
  const pattern = /^(.*[\\/])/;
  const fileName = currentSvgData.images.svg.fileName;
  const [fileUrl] = currentSvgData.images.svg.url.match(pattern);

  const requestBody = JSON.stringify({
    action,
    fileName,
    fileUrl,
  });

  const response = await _sendAxiCommand(requestBody);
  return response.json();
};

export {
  getAxiInfo,
  penAlign,
  penToggle,
  plotDrawing
};
