import { useState } from "react";

import AxiConnection from '../AxiConnection';
import AxiActions from '../AxiActions';
import { PanelSectionHeading } from "../StyledUiCommon/styles";

interface ControlProps {
  currentSvgData: {
    images: {
      svg: {
        url: string,
        fileName: string,
      }
    },
  };
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

  function sendCommand(cmd: String) {
    if (cmd === "plot") {
      const pattern = /^(.*[\\/])/;
      const [root_url] = currentSvgData.images.svg.url.match(pattern);
      const fileName = currentSvgData.images.svg.fileName;
      connection.send(`${cmd}|${root_url}|${fileName}`);
    } else {
      connection.send(cmd);
    }
  }

  return (
    <section>
      <PanelSectionHeading>AxiDraw Plotter</PanelSectionHeading>
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
