import { useContext, useState } from 'react';
import { store } from '../../providers/store';
import { ControlsContainer, InputContainer, InputsWrapper, StyledAxiConnection } from './styles';
import { ClearBtn, InputLabel, OutlineBtn, SessionInfoCont } from '../StyledUiCommon/styles';
import { NetworkWiredIcon } from '../Icons';

const AxiDrawControl = (props) => {
  const { deviceName } = props;
  const globalState = useContext(store);
  const { dispatch, state: { axiConnection, isConnected, axiAddress, axiConnectionError } } = globalState;
  const penUp = true;
  const RAISE = 'Raise Pen';
  const LOWER = 'Lower Pen';

  const initDisconnect = () => {
    const warningCopy = {
      title: 'Disconnect?',
      text: 'Are you sure you want to disconnect from AxiDraw?',
    };

    const leave = () => {
      if (isConnected) {
        axiConnection.close();
        dispatch({
          type: 'SET_CONNECTED',
          payload: {
            data: false,
          }
        });
        dispatch({
          type: 'SET_AXI_CONNECTION',
          payload: {
            data: {},
          }
        });
      }
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
              <OutlineBtn onClick={() => axiConnection.send('toggle')}>{penUp ? LOWER : RAISE }</OutlineBtn>
              <OutlineBtn onClick={() => axiConnection.send('align')}>Align Pen</OutlineBtn>
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

        <p className="smallText">
          To begin plotting, enter the IP address and port of your Axi server. You’ll need to be running the server in the background. Click here to download the server and read the documentation.
        </p>
      </div>
    </StyledAxiConnection>
  );
};

export default AxiDrawControl;
