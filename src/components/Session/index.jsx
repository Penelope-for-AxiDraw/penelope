import { useContext } from 'react';
import { store } from '../../providers/store';
import { ClearBtn, NavSection, SessionInfoCont, PanelSectionHeading, Divider, IconButton } from '../StyledUiCommon/styles';
import { PlugIcon, UserCircleIcon } from '../Icons';
import AxiDrawControl from '../AxiDrawControl';

export default function Session({
  signOut,
  title,
}) {
  const globalState = useContext(store);
  const { state: { currentEntryIndex, entries, isConnected, user } } = globalState;

  const initConnect = () => {
    console.log('placeholder to initiate connection…');
  }

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
        <AxiDrawControl currentSvgData={entries[currentEntryIndex]} />
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
          <IconButton className="cta" variant="alternate" onClick={initConnect} wide>
            <PlugIcon width="1.5rem" height="1.5rem" fill='#fff' />
            <span>Connect!</span>
          </IconButton>
        </NavSection>
      )}
    </>
  );
}
