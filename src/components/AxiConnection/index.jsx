import { useContext, useState } from 'react';
import { ControlsContainer, InputContainer, InputsWrapper, StyledAxiConnection } from './styles';
import { ClearBtn, IconButton, InputLabel, OutlineBtn, SessionInfoCont } from '../StyledUiCommon/styles';
import { getFromLocalStorage, saveToLocalStorage } from '../../utils';
import { NetworkWiredIcon } from '../Icons';
import { store } from '../../providers/store';

export default function AxiConnection({
  axiWebsocket,
  deviceName,
  initDisconnect,
}) {
  const globalState = useContext(store);
  const { dispatch, state: { isConnected, axiAddress, axiConnectionError } } = globalState;
  const penUp = true;
  const RAISE = 'Raise Pen';
  const LOWER = 'Lower Pen';
  // const [deviceName, setDeviceName] = useState();

  const handleChangeInput = (e) => {
    if (axiConnectionError) {
      // clear the error…
      dispatch({
        type: 'SET_CONNECTION_ERROR',
        payload: {
          data: ''
        },
      });
    }

    const updatedaxiAddress = {
      ...axiAddress,
      [e.target.name]: e.target.value,
    };

    dispatch({
      type: 'SET_AXI_ADDRESS',
      payload: {
        data: updatedaxiAddress
      },
    });
  };

  if (isConnected) {
    return (
      <StyledAxiConnection>
        <div>
          <p className="info">Connected to AxiDraw</p>
          <SessionInfoCont>
            <NetworkWiredIcon width={40} height={40} fill={'#4400A3'} />
            <div className="specs">
              {deviceName && <p>{deviceName}</p>}
              <p>{axiAddress.host} : {axiAddress.port}</p>
              <ClearBtn onClick={initDisconnect}>disconnect</ClearBtn>
            </div>
          </SessionInfoCont>
          <ControlsContainer>
            <InputLabel>Pen Controls</InputLabel>
            <div className="button-group">
              <OutlineBtn onClick={() => axiWebsocket.send('toggle')}>{penUp ? LOWER : RAISE }</OutlineBtn>
              <OutlineBtn onClick={() => axiWebsocket.send('align')}>Align Pen</OutlineBtn>
            </div>
          </ControlsContainer>
        </div>
      </StyledAxiConnection>
    );
  }

  return (
    <StyledAxiConnection>
      <div>
        <p className="info">AxiDraw Connection</p>
        <InputsWrapper>
          <InputContainer fieldWidth={11.5}>
            <InputLabel htmlFor="axi-ip-address">host ip address</InputLabel>
            <input name="host" className="input-field" type="text" placeholder='000.000.000.000' onChange={handleChangeInput} value={axiAddress.host} />
          </InputContainer>

          <InputContainer fieldWidth={4.75}>
            <InputLabel htmlFor="axi-port">port</InputLabel>
            <input name="port" className="input-field" type="text" placeholder='0000' onChange={handleChangeInput} value={axiAddress.port} />
          </InputContainer>
        </InputsWrapper>

        {axiConnectionError && <p className="input-field-error">{axiConnectionError}</p>}

        <small>
          To begin plotting, enter the IP address and port of your Axi server. You’ll need to be running the server in the background. Click here to download the server and read the documentation.
        </small>
      </div>
    </StyledAxiConnection>
  );
};
