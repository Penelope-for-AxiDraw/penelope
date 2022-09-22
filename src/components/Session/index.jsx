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
  const { dispatch, state: { deviceName, user } } = globalState;

  useEffect(() => {
    const getDeviceName = async () => {
      const data = await getAxiInfo('deviceName');
      dispatch({
        type: 'SET_DEVICE_NAME',
        payload: {
          data: data.deviceName,
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
        <PlotButton />
      </NavSection>
    </>
  );
}
