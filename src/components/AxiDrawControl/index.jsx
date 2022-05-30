import { useContext, useState } from "react";

import { store } from '../../providers/store';
import AxiConnection from '../AxiConnection';
import { PanelSectionHeading } from "../StyledUiCommon/styles";

const AxiDrawControl = (props) => {
  const { currentSvgData } = props;
  const [isConnected, setIsConnected] = useState(false);
  const [connection, setConnection] = useState();
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const registerConnection = (ws) => {
    setIsConnected(true);
    ws.send('get_name');
    setConnection(ws);
  };

  const initDisconnect = () => {
    const warningCopy = {
      title: 'Disconnect?',
      text: 'Are you sure you want to disconnect from AxiDraw?',
    };

    const leave = () => {
      if (isConnected) {
        connection.close();
      }
      setIsConnected(false);
    };

    dispatch({
      type: 'SET_DEPART',
      payload: {
        data: {
          showWarning: true,
          warningCopy,
          leave,
        }
      }
    });
  }

  const handleConnectionError = (evt) => {
    console.log("Websocket error:", evt);
  }

  function sendCommand(cmd) {
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
    <AxiConnection
      handleConnected={registerConnection}
      initDisconnect={initDisconnect}
      handleConnectionError={handleConnectionError}
      isConnected={isConnected}
      sendCommand={sendCommand}
    />
  );
};

export default AxiDrawControl;
