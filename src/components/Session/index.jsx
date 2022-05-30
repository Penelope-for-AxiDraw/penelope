import { useContext } from 'react';
import { store } from '../../providers/store';
import { ClearBtn, NavSection, SessionInfoCont, PanelSectionHeading, Divider } from '../StyledUiCommon/styles';
import { UserCircleIcon } from '../Icons';
import AxiDrawControl from '../AxiDrawControl';

export default function Session({
  signOut,
  title,
}) {
  const globalState = useContext(store);
  const { state: { currentEntryIndex, entries, user } } = globalState;

  return (
    <NavSection>
      <PanelSectionHeading>{title}</PanelSectionHeading>
      <div>
        <p className="info">Signed-in to Contentful</p>
        <SessionInfoCont>
          <UserCircleIcon width={40} height={40} fill={'#4400A3'} />
          <div className="specs">
            <p>{user.email}</p>
            <ClearBtn onClick={signOut}>sign out</ClearBtn>
          </div>
        </SessionInfoCont>
      </div>

      <Divider />

      <AxiDrawControl currentSvgData={entries[currentEntryIndex]} />
    </NavSection>
  );
}
