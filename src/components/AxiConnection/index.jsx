import { useState } from 'react';

export default function AxiConnection({ handleConnected, handleDisconnected, handleConnectionError, isConnected }) {
  const [address, setAddress] = useState('');
  const [connectionError, setConnectionError] = useState('');
  // const [connection, setConnection] = useState();

  const handleChangeInput = (e) => {
    if (connectionError) {
      setConnectionError('');
    }
    setAddress(e.target.value);
  };

  const startWebsocketThings = () => {
    const [host, port] = address.split(':');

    const co = new WebSocket(`ws://${host}:${port}/`);
    // co.onmessage = function (event) {
    //     console.log("Server says: " + event.data);
    // };

    co.onopen = function (event) {
      console.log(`Websocket is now open on ${host}:${port}!`);
      handleConnected(co);
      // setConnection(co);
    };

    co.onerror = function (event) {
      handleConnectionError(event);
      setConnectionError('Could not connect! Is this address correct?');
    };

    co.onclose = function (event) {
      console.log("WebSocket is now closed.");
      handleDisconnected();
    };

    return co;
  };

  // This Regex test for host should be double-checked
  const validateHost = (address) => {
    let pattern = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return pattern.test(address);
  }
  
  // This Regex test for port should be double-checked
  const validatePort = (portNumber) => {
    let pattern = /^((6553[0-5])|(655[0-2][0-9])|(65[0-4][0-9]{2})|(6[0-4][0-9]{3})|([1-5][0-9]{4})|([0-5]{0,5})|([0-9]{1,4}))$/;
      return pattern.test(portNumber);
  }

  const validateConnectionParams = () => {
    const [host, port] = address.split(':');

    if (!host || !port) {
      return false;
    }

    return validateHost(host) && validatePort(port);
  }

  const handleClickConnect = () => {
    const isValid = validateConnectionParams(address);
    if (isValid) {
      const ws = startWebsocketThings();
    } else {
      setConnectionError('Address is badly formatted');
    }
  };

  // const handleClickDisconnect = () => {
  //   console.log('Disconnect from AxiDraw...');
  //   // Insert logic to disconnect Websocket and do any related clean-up
  //   // connection.close();
  // };

  const buttonText = isConnected ? 'Disconnect' : 'Connect';

  const plotterNickname = "Temporary Nickname";

  return (
    <div className="connection-container">
      <div className="address-label">Connection</div>
      {isConnected ? (
        <div className="connection-details">
          <p>Plotter / <span className="muted">{plotterNickname}</span></p>
          <p>Address / <span className="muted">{address}</span></p>
          <button className="mt0" onClick={handleDisconnected}>{buttonText}</button>
        </div>
      ) : (
        <>
          {/* <div className="address-label">Connection</div> */}
          <div className="field-cont">
            <input className="address-field" type="text" placeholder='IP address and port' onChange={handleChangeInput} value={address} />
            <button className="connect-btn" onClick={handleClickConnect}>{buttonText}</button>
          </div>
          {connectionError && <p className="input-field-error">{connectionError}</p>}
        </>
      )}
    </div>
  );
};
