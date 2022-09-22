import { useContext } from 'react';
import { store } from '../../providers/store';
import { ControlsContainer, StyledAxiConnection } from './styles';
import { ClearBtn, InputLabel, OutlineBtn, SessionInfoCont } from '../StyledUiCommon/styles';
import { NetworkWiredIcon } from '../Icons';
import { LOWER, PORT, RAISE } from '../../constants';
import { getFromLocalStorage, penAlign, penToggle } from '../../utils';

const AxiDrawControl = () => {
  const globalState = useContext(store);
  const {
    dispatch,
    state: {
      axiConnection,
      axiConnectionError,
      deviceName,
      isConnected,
      penelopeAppHost,
      penUp
    } } = globalState;

  const host = getFromLocalStorage('penelopeAppHost') || '';
  const apiPrefix = `http://${host}:5000/api`;

  const initDisconnect = () => {
    const warningCopy = {
      title: 'Disconnect?',
      text: 'Are you sure you want to disconnect from AxiDraw?',
    };

    const leave = () => {
      if (isConnected) {
        axiConnection.close();
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

  // const handleToggle = () => {
  //   axiConnection.send('toggle');

  //   dispatch({
  //     type: 'SET_PEN_UP',
  //     payload: {
  //       data: !penUp
  //     },
  //   });
  // }

  const handleClickToggle = () => {
    penToggle(apiPrefix);
    dispatch({
      type: 'SET_PEN_UP',
      payload: {
        data: !penUp
      },
    });
  }

  const handleClickAlign = () => {
    penAlign(apiPrefix);
  }

  if (isConnected) {
    return (
      <StyledAxiConnection>
        <div>
          <p className="info">Connected to AxiDraw</p>
          <SessionInfoCont>
            <NetworkWiredIcon width={40} height={40} fill={'#4400A3'} />
            <div className="specs">
              <p>{deviceName}</p>
              <p>{penelopeAppHost} : {PORT}</p>
              <ClearBtn onClick={initDisconnect}>disconnect</ClearBtn>
            </div>
          </SessionInfoCont>
          <ControlsContainer>
            <InputLabel>Pen Controls</InputLabel>
            <div className="button-group">
              <OutlineBtn onClick={handleClickToggle}>{penUp ? LOWER : RAISE}</OutlineBtn>
              <OutlineBtn onClick={handleClickAlign}>Align Pen</OutlineBtn>
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
        <p className="smallText">
          To begin plotting to AxiDraw, you&apos;ll need to connect to your local instance of Penelope server. Note that you should be running the server in the background.{' '}
          <a href="https://github.com/computershawn/penelope-server" target="_blank" rel="noreferrer">Click here</a> to download the server and read the documentation.
        </p>

        {axiConnectionError && <p className="input-field-error">{axiConnectionError}</p>}
      </div>
    </StyledAxiConnection>
  );
};

export default AxiDrawControl;
