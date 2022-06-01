import { useContext } from "react";
import { store } from '../../providers/store';
import AxiConnection from '../AxiConnection';

const AxiDrawControl = (props) => {
  const { axiWebsocket, deviceName } = props;
  const globalState = useContext(store);
  const { dispatch, state: { isConnected} } = globalState;

  const initDisconnect = () => {
    const warningCopy = {
      title: 'Disconnect?',
      text: 'Are you sure you want to disconnect from AxiDraw?',
    };

    const leave = () => {
      if (isConnected) {
        axiWebsocket.close();
      }
      dispatch({
        type: 'SET_CONNECTED',
        payload: {
          data: false,
        }
      });  
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

  return (
    <AxiConnection
      deviceName={deviceName}
      initDisconnect={initDisconnect}
      axiWebsocket={axiWebsocket}
    />
  );
};

export default AxiDrawControl;
