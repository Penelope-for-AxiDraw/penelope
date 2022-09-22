const getAxiInfo = async (infoType, apiPrefix) => {
  const requestUrl = `${apiPrefix}/info?q=${infoType}`;

  const response = await fetch(requestUrl, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    referrerPolicy: 'no-referrer'
  }).then(res => res.json());

  return response;
};

const _sendAxiCommand = async (requestBody, apiPrefix) => {
  const requestUrl = `${apiPrefix}/command`;

  const result = await fetch(requestUrl, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: requestBody,
  });

  return result;
}

const penToggle = async (apiPrefix) => {
  const requestBody = JSON.stringify({ action: 'toggle' });
  const response = await _sendAxiCommand(requestBody, apiPrefix);
  return response.json();
};

const penAlign = async (apiPrefix) => {
  const requestBody = JSON.stringify({ action: 'align' });
  const response = await _sendAxiCommand(requestBody, apiPrefix);
  return response.json();
};

const plotDrawing = async (currentSvgData, apiPrefix) => {
  const action = 'plot';
  const pattern = /^(.*[\\/])/;
  const fileName = currentSvgData.images.svg.fileName;
  const [fileUrl] = currentSvgData.images.svg.url.match(pattern);

  const requestBody = JSON.stringify({
    action,
    fileName,
    fileUrl,
  });

  const response = await _sendAxiCommand(requestBody, apiPrefix);
  return response.json();
};

export {
  getAxiInfo,
  penAlign,
  penToggle,
  plotDrawing
};
