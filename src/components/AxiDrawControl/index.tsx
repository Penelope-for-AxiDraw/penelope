import { useRef, useState } from "react";

import AxiConnection from '../AxiConnection';
import AxiActions from '../AxiActions';

interface ControlProps {
  pathToSvg: string;
  svgList: Array<object>;
};

const AxiDrawControl = (props:ControlProps) => {
  const { pathToSvg, svgList } = props;

  const [isConnected, setIsConnected] = useState(false);
  // const [connection, setConnection] = useState();
  // const [pathToSvg, setPathToSvg] = useState(defaultPathToSvg);
  const selectRef = useRef(null);

  const registerConnection = () => {
    setIsConnected(true);
    // setConnection(ws);
  };

  const handleDisconnected = () => {
    setIsConnected(false);
  }

  const handleConnectionError = (evt: Event) => {
    console.log("Websocket error:", evt);
  }

  function sendCommand(cmd: String) {
    if (cmd === "plot") {
      // const pattern = /^(.*[\\/])/;
      // const [root_url] = pathToSvg.match(pattern);
      // const { filename } = svgList[selectRef.current.value];
      // connection.send(`${cmd}|${root_url}|${filename}`);
      console.log("command is 'plot'");
    } else {
      console.log(`command is ${cmd}`);
      // connection.send(cmd);
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
