import { useContext } from 'react';

import { store } from '../../providers/store';
import { ClearBtn, NavSection, SessionInfoCont, PanelSectionHeading, Divider } from '../StyledUiCommon/styles';
import { UserCircleIcon } from '../Icons';
import AxiDrawControl from '../AxiDrawControl';
import PlotButton from '../PlotButton';
import { useEffect } from 'react';
import { getAxiInfo } from '../../utils';

export default function Session({
  signOut,
  title,
}) {
  const globalState = useContext(store);
  const { dispatch, state: { deviceName, user }, axiConnection } = globalState;

  useEffect(() => {
    const getDeviceName = async () => {
      const data = await getAxiInfo('deviceName');
      const t = data?.connected ? 'SET_DEVICE_NAME' : 'SET_AXI_CONNECTION';
      const d = data?.connected ? data?.deviceName : false;
      dispatch({
        type: t,
        payload: {
          data: d,
        }
      });
    };

    if (!deviceName) {
      getDeviceName();
    }
  }, [deviceName, dispatch]);

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
      <NavSection>
        {axiConnection && <PlotButton />}
      </NavSection>
    </>
  );
}
