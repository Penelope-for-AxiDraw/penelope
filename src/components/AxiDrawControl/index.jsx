import { useContext } from 'react';
import { store } from '../../providers/store';
import { ControlsContainer, StyledAxiConnection } from './styles';
import { InputLabel, OutlineBtn, SessionInfoCont } from '../StyledUiCommon/styles';
import { NetworkWiredIcon } from '../Icons';
import { LOWER, PORT, RAISE } from '../../constants';
import { getFromLocalStorage, penAlign, penToggle } from '../../utils';

const AxiDrawControl = () => {
  const globalState = useContext(store);
  const {
    dispatch,
    state: {
      deviceName,
      axiConnection,
      penUp
    } } = globalState;

  const penelopeAppHost = getFromLocalStorage('penelopeAppHost') || '';

  const handleClickToggle = () => {
    penToggle();
    dispatch({
      type: 'SET_PEN_UP',
      payload: {
        data: !penUp
      },
    });
  }

  const handleClickAlign = () => {
    penAlign();
  }

  return (
    <StyledAxiConnection>
      {axiConnection ? (
        <div>
          <p className="info">Connected to AxiDraw</p>
          <SessionInfoCont>
            <NetworkWiredIcon width={40} height={40} fill={'#4400A3'} />
            <div className="specs">
              <p>{deviceName || 'no device name'}</p>
              <p>{penelopeAppHost} : {PORT}</p>
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
      ) : (
        <div>
          <p className="info alert">Not connected to AxiDraw. Is the server running?</p>
        </div>
      )}
    </StyledAxiConnection>
  );
};

export default AxiDrawControl;
