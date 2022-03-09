import { useState } from "react";

import AxiConnection from '../AxiConnection';
import AxiActions from '../AxiActions';

interface ControlProps {
  currentSvgData: object;
};

const AxiDrawControl = (props:ControlProps) => {
  const { currentSvgData } = props;
  const [isConnected, setIsConnected] = useState(false);
  const [connection, setConnection] = useState();

  const registerConnection = (ws) => {
    setIsConnected(true);
    ws.send('get_name');
    setConnection(ws);
  };

  const handleDisconnected = () => {
    if (isConnected) {
      connection.close();
    }
    setIsConnected(false);
  }

  const handleConnectionError = (evt: Event) => {
    console.log("Websocket error:", evt);
  }

  // const pattern = /^(.*[\\/])/;
  // const [root_url] = currentSvgData.raw_url.match(pattern);
  // function sendCommand(cmd: String) {
  //   if (cmd === "plot") {
  //     const pattern = /^(.*[\\/])/;
  //     const [root_url] = currentSvgData.raw_url.match(pattern);
  //     const { filename } = currentSvgData;
  //     connection.send(`${cmd}|${root_url}|${filename}`);
  //     // console.log("command is 'plot'");
  //   } else {
  //     connection.send(cmd);
  //   }
  // }

  function sendCommand(cmd: String) {
    const tempCurrentSvgData = {
      id: 12345,
      urls: {
        thumbnail: 'https://images.ctfassets.net/fnhoxf3mr423/6mXCtHRhYY67VugyLfwzXD/4e45eb2f8fd513d54df15521992a2219/triangles-1641524291-plot-layer2.png',
        svg: 'https://images.ctfassets.net/fnhoxf3mr423/2VVVd1zPuqdoqKtjEto8Cs/74a93f596bdbc73dee5e63de0a56a65f/triangles-1641524291-plot-layer2.svg'
      },
      fileName: 'triangles-1641524291-plot-layer2.svg',
    };

    if (cmd === "plot") {
      const pattern = /^(.*[\\/])/;
      const [root_url] = tempCurrentSvgData.urls.svg.match(pattern);
      const { fileName } = tempCurrentSvgData;
      // connection.send(`${cmd}|${root_url}|${filename}`);
      // const complete_url = new URL('https:' + '//images.ctfassets.net/fnhoxf3mr423/2VVVd1zPuqdoqKtjEto8Cs/74a93f596bdbc73dee5e63de0a56a65f/triangles-1641524291-plot-layer2.svg');
      // const temp_filename = 'triangles-1641524291-plot-layer2.svg';
      // 'httpimages.ctfassets.net/fnhoxf3mr423/2VVVd1zPuqdoqKtjEto8Cs/74a93f596bdbc73dee5e63de0a56a65f/triangles-1641524291-plot-layer2.svg';
      connection.send(`${cmd}|${root_url}|${fileName}`);
    } else {
      connection.send(cmd);
    }
  }

  return (
    <section>
      <h3 className="mt0">AxiDraw</h3>
      <AxiConnection
        handleConnected={registerConnection}
        handleDisconnected={handleDisconnected}
        handleConnectionError={handleConnectionError}
        isConnected={isConnected}
      />
      {isConnected && <AxiActions sendCommand={sendCommand} />}
    </section>
  );
};

export default AxiDrawControl;
