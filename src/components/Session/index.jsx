import { useContext, useState } from 'react';
import { store } from '../../providers/store';
import { ClearBtn, NavSection, SessionInfoCont, PanelSectionHeading, Divider, IconButton } from '../StyledUiCommon/styles';
import { PlugIcon, UserCircleIcon } from '../Icons';
import AxiDrawControl from '../AxiDrawControl';
import { validateConnectionParams } from '../../utils/axiConnectFormValidation';
import { saveToLocalStorage } from '../../utils';

export default function Session({
  signOut,
  title,
}) {
  const [deviceName, setDeviceName] = useState('');
  const [axiConnection, setAxiConnection] = useState();
  const globalState = useContext(store);
  const {
    dispatch,
    state: {
      axiAddress,
      currentEntryIndex,
      entries,
      isConnected,
      user
    }} = globalState;

  // const initConnect = () => {
  //   console.log('placeholder to initiate connection…');
  // }

  const { host, port } = axiAddress;

  function sendCommand(cmd) {
    const currentSvgData = entries[currentEntryIndex];
    if (connection) {
      if (cmd === "plot") {
        const pattern = /^(.*[\\/])/;
        const [root_url] = currentSvgData.images.svg.url.match(pattern);
        const fileName = currentSvgData.images.svg.fileName;
        connection.send(`${cmd}|${root_url}|${fileName}`);
      } else {
        connection.send(cmd);
      }
    }
  }

  const registerConnection = (websocketConnection) => {
    dispatch({
      type: 'SET_CONNECTED',
      payload: {
        data: true,
      }
    });
    websocketConnection.send('get_name');
    setAxiConnection(websocketConnection);
    // window.sessionStorage.setItem('axiConnection', websocketConnection);
  };
    
  const getAxiSocket = () => {
    const co = new WebSocket(`ws://${host}:${port}/`);
    co.onmessage = function (event) {
      const message = JSON.parse(event.data);
      if (message.hasOwnProperty('deviceName')) {
        setDeviceName(message.deviceName);
      }
    };

    co.onopen = function (event) {
      // console.log(`Websocket is now open on ${co.url}!`);
      registerConnection(co);
      // console.log({ host, port });
      saveToLocalStorage('axidrawCreds', { host, port });
    };

    co.onerror = function (event) {
      // setConnectionError('Yikes! Please double-check the address and make sure the server is running.');
      dispatch({
        type: 'SET_CONNECTION_ERROR',
        payload: {
          data: 'Yikes! Please double-check the address and make sure the server is running.'
        },
      });
      console.warn("Websocket error:", event);
    };

    co.onclose = function (event) {
      console.log("WebSocket is now closed.");
      // window.sessionStorage.removeItem('axiConnection');
    };
  };

  const handleClickConnect = () => {
    const isValid = validateConnectionParams(axiAddress);
    if (isValid) {
      getAxiSocket();
    } else {
      // setConnectionError('Address is incorrectly formatted');
      dispatch({
        type: 'SET_CONNECTION_ERROR',
        payload: {
          data: 'Address is incorrectly formatted'
        },
      });
      console.warn('Address is incorrectly formatted');
    }
  };

  const initPlot = () => {
    console.log('placeholder to initiate plotting…');
  }

  return (
    <>
      <NavSection>
        <PanelSectionHeading>{title}</PanelSectionHeading>
      </NavSection>
      <NavSection className="main-area">
        <div>
          <p className="info">Signed-in to Contentful</p>
          <SessionInfoCont>
            <UserCircleIcon width="2.5rem" height="2.5rem" fill='#4400A3' />
            <div className="specs">
              <p>{user.email}</p>
              <ClearBtn onClick={signOut}>sign out</ClearBtn>
            </div>
          </SessionInfoCont>
        </div>
        <Divider />
        <AxiDrawControl deviceName={deviceName} axiWebsocket={axiConnection} />
      </NavSection>
      {isConnected ? (
        <NavSection>
          <IconButton className="cta" variant="alternate" onClick={initPlot} wide>
            <PlugIcon width="1.5rem" height="1.5rem" fill='#fff' />
            <span>Plot It!</span>
          </IconButton>
        </NavSection>
      ) : (
        <NavSection>
          <IconButton className="cta" variant="alternate" onClick={handleClickConnect} wide>
            <PlugIcon width="1.5rem" height="1.5rem" fill='#fff' />
            <span>Connect!</span>
          </IconButton>
        </NavSection>
      )}
    </>
  );
}
