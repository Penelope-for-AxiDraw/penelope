import { useState } from 'react';
import Image from 'next/image';

import { InputContainer, InputsWrapper, StyledButton } from './styles';
import { InputLabel, PanelInfoIcon } from '../StyledUiCommon/styles';

export default function AxiConnection({ handleConnected, handleDisconnected, handleConnectionError, isConnected }) {
  const [address, setAddress] = useState({
    axiHost: '',
    axiPort: '',
  });

  const [connectionError, setConnectionError] = useState('');
  const [deviceName, setDeviceName] = useState('Connected');
  let connection;

  const handleChangeInput = (e) => {
    if (connectionError) {
      setConnectionError('');
    }

    setAddress(currentAddress => {
      return {
        ...currentAddress,
        [e.target.name]: e.target.value,
      };
    });
  };

  const getAxiSocket = () => {
    const {axiHost, axiPort} = address;

    const co = new WebSocket(`ws://${axiHost}:${axiPort}/`);
    co.onmessage = function (event) {
        const message = JSON.parse(event.data);
        if (message.hasOwnProperty('deviceName')) {
          setDeviceName(message.deviceName);
        }
    };

    co.onopen = function (event) {
      // console.log(`Websocket is now open on ${co.url}!`);
      handleConnected(co);
    };

    co.onerror = function (event) {
      handleConnectionError(event);
      setConnectionError('Yikes! Please double-check the address and make sure the server is running.');
    };

    co.onclose = function (event) {
      // console.log("WebSocket is now closed.");
      handleDisconnected();
    };

    return co;
  };

  // This Regex test for host should be double-checked
  const validateHost = (host) => {
    let pattern = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return pattern.test(host);
  }
  
  // This Regex test for port should be double-checked
  const validatePort = (port) => {
    let pattern = /^((6553[0-5])|(655[0-2][0-9])|(65[0-4][0-9]{2})|(6[0-4][0-9]{3})|([1-5][0-9]{4})|([0-5]{0,5})|([0-9]{1,4}))$/;
      return pattern.test(port);
  }

  const validateConnectionParams = () => {
    if (!address.axiHost || !address.axiPort) {
      return false;
    }

    return validateHost(address.axiHost) && validatePort(address.axiPort);
  }

  const handleClickConnect = () => {
    const isValid = validateConnectionParams(address);
    if (isValid) {
      connection = getAxiSocket();
    } else {
      setConnectionError('Address is incorrectly formatted');
    }
  };

  const buttonText = isConnected ? 'Disconnect' : 'Connect';
  const connectionInfo = `${deviceName} | ${address.axiHost} : ${address.axiPort}`;

  if (isConnected) {
    return (
      <PanelInfoIcon>
        <div>
          <Image alt="temp" src={"/icn-square.svg"} width={24} height={24} />
          <span>{connectionInfo}</span>
        </div>
        <div onClick={handleDisconnected}>×</div>
      </PanelInfoIcon>
    );
  }

  return (
    <>
      <p className="smallText">
        To begin plotting, enter the IP address and port of your Axi server. You’ll need to be running the server in the background. Click here to download the server and read the documentation.
      </p>

      <InputsWrapper>
        <InputContainer fieldWidth={11.5}>
          <InputLabel htmlFor="axi-ip-address">host</InputLabel>
          <input name="axiHost" className="input-field" type="text" placeholder='000.000.000.000' onChange={handleChangeInput} value={address.axiHost} />
        </InputContainer>

        <InputContainer fieldWidth={4.5}>
          <InputLabel htmlFor="axi-port">port</InputLabel>
          <input name="axiPort" className="input-field" type="text" placeholder='0000' onChange={handleChangeInput} value={address.axiPort} />
        </InputContainer>
      </InputsWrapper>

      {connectionError && <p className="input-field-error">{connectionError}</p>}

      <StyledButton onClick={handleClickConnect} wide>{buttonText}</StyledButton>
    </>
  );
};
