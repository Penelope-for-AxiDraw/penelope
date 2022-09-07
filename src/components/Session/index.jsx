import { useContext, useEffect, useState } from 'react';

import { store } from '../../providers/store';
import { ClearBtn, NavSection, SessionInfoCont, PanelSectionHeading, Divider, IconButton } from '../StyledUiCommon/styles';
import { PlugIcon, UserCircleIcon } from '../Icons';
import AxiDrawControl from '../AxiDrawControl';
import { PORT } from '../../constants';
import PlotButton from '../PlotButton';

export default function Session({
  signOut,
  title,
}) {
  const [readyToConnect, setReadyToConnect] = useState(true);
  const globalState = useContext(store);
  const {
    dispatch,
    state: {
      isConnected,
      penelopeAppHost,
      user,
    } } = globalState;

  useEffect(() => {
    const registerConnection = (websocketConnection) => {
      dispatch({
        type: 'SET_CONNECTED',
        payload: {
          data: true,
        }
      });
      dispatch({
        type: 'SET_AXI_CONNECTION',
        payload: {
          data: websocketConnection,
        }
      });

      websocketConnection.send('get_name');
      websocketConnection.send('get_pen_state');
    };

    const registerError = (err, msg) => {
      dispatch({
        type: 'SET_CONNECTION_ERROR',
        payload: {
          data: msg
        },
      });
      console.warn("Websocket error:", err);
    };

    const getAxiSocket = () => {
      const co = new WebSocket(`ws://${penelopeAppHost}:${PORT}/`);
      co.onmessage = function (event) {
        const message = JSON.parse(event.data);
        if (message.hasOwnProperty('deviceName')) {
          dispatch({
            type: 'SET_DEVICE_NAME',
            payload: {
              data: message.deviceName,
            }
          });
        }

        if (message.hasOwnProperty('penUp')) {
          dispatch({
            type: 'SET_PEN_UP',
            payload: {
              data: message.penUp === 'True',
            }
          });
        }
      };

      co.onopen = function (event) {
        registerConnection(co);
        console.info(`Websocket is now open on ${co.url}`);
      };

      co.onerror = function (error) {
        registerError(error, 'Yikes! Please double-check the address and make sure the server is running.');
      };

      co.onclose = function (event) {
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
        dispatch({
          type: 'SET_DEVICE_NAME',
          payload: {
            data: '…',
          }
        });
        console.info("WebSocket is now closed.");
      };
    };

    if (!isConnected && readyToConnect) {
      setReadyToConnect(false);
      getAxiSocket();
    }
  }, [dispatch, isConnected, penelopeAppHost, readyToConnect]);

  const handleClickConnect = () => {
    setReadyToConnect(true);
  };

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
        <AxiDrawControl />
      </NavSection>
      {isConnected ? (
        <NavSection>
          <PlotButton />
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
