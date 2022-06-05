import { useContext, useEffect, useState } from 'react';
import Session from "../src/components/Session";
import ImagePreview from "../src/components/ImagePreview";
import SvgExplorer from "../src/components/SvgExplorer";
import DepartWarning from '../src/components/DepartWarning';
import Dashboard from '../src/components/Dashboard';

import { store } from '../src/providers/store';
import { DASHBOARD, PLOT } from '../src/constants';
import NavButtonGroup from '../src/components/NavButtonGroup';
import ImageDetails from '../src/components/ImageDetails';

const Home= () => {
  const defaultMode = DASHBOARD;
  const [selectingImage, setSelectingImage] = useState(false);
  const globalState = useContext(store);
  const [appMode, setAppMode] = useState(defaultMode);
  const [navIndex, setNavIndex] = useState(0);
  const { dispatch, state: { currentEntryIndex, entries, user, disco } } = globalState;

  const handleSelectImage = (index) => {
    dispatch({
      type: 'SET_ENTRY',
      payload: {
        data: index
      }
    });
  }

  const initSignOut = () => {
    const warningCopy = {
      title: 'Sign out?',
      text: 'Are you sure you want to sign out of your account?',
    };

    const leave = () => {
      window.localStorage.removeItem('contentfulCreds');
      window.localStorage.removeItem('axidrawCreds');
      window.localStorage.removeItem('axiSvgContent');
      setAppMode(DASHBOARD);  
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

  const placeholder = {
    url: 'fun-pattern.png',
    width: 288,
    height: 432,
  };

  const hasEntries = entries.length > 0;

  useEffect(() => {
    const noUser = Object.getOwnPropertyNames(user).length === 0;

    if (noUser || !hasEntries) {
      // Either user or entries is empty; Go back to auth screen
      // router.push('/start');
    }

  }, [hasEntries, user]);

  const updateAppMode = (mode) => {
    setAppMode(mode);
  }

  const LogoBlock = () => {
    return (
      <div className="logo-block">
        <h1>penelope</h1>
      </div>
    );
  }

  const dismissDepartModal = () => {
    dispatch({
      type: 'SET_DEPART',
      payload: {
        data: {
          showWarning: false,
          warningCopy: {},
          leave: () => {},
        }
      }
    });
  };

  const initLeave = () => {
    disco.leave();
    dismissDepartModal();
  };

  const selectTab = (index) => {
    setNavIndex(index);
  };

  if (appMode === PLOT) {
    return (
      <main>
        {disco.showWarning && (
          <DepartWarning
            warningCopy={disco.warningCopy}
            dismiss={dismissDepartModal}
            leave={initLeave}
          />
        )}
        <div className="column-left">
          <LogoBlock />
          <NavButtonGroup
            selectTab={selectTab}
            navIndex={navIndex}
           />
           {navIndex === 0 && (
            <Session
              signOut={initSignOut}
              title="Account &amp; Plotter Connection"
            />
           )}
           {navIndex === 1 && (
            <SvgExplorer
              goToConnect={() => selectTab(0)}
              handleSelect={handleSelectImage}
              title="Explore Your SVGs"
            />
           )}
           {navIndex === 2 && (
            <ImageDetails
              title="Image Details"
              goToConnect={() => selectTab(0)}
            />
           )}
          {/* {hasEntries ? (
            <>
              <ImageControls
                currentEntry={entries[currentEntryIndex]}
                initImageSelection={openImageSelectionModal}
                selectingImage={selectingImage}
                signOut={initSignOut}
              />
              <AxiDrawControl
                currentSvgData={entries[currentEntryIndex]}
              />
            </>
          ) : (
            <NoEntriesNotification initImageSelection={openImageSelectionModal} signOut={initSignOut} selectingImage={selectingImage} />
          )} */}
        </div>
        {/* {selectingImage && (
          <SvgExplorer
            dismiss={() => setSelectingImage(false)}
            handleSelect={handleSelectImage}
            currentIndex={currentEntryIndex}
          />
        )} */}
        {entries.length ? <ImagePreview thumbnail={entries[currentEntryIndex].images.thumbnail} shade={selectingImage} /> : <div><h3>¯\_(ツ)_/¯</h3></div>}
      </main>
    );
  }

  return (
    <main>
      <Dashboard updateAppMode={updateAppMode} />
    </main>
  );
};

export default Home;


const NoEntriesNotification = ({ initImageSelection, selectingImage, initSignOut }) => {
  return (
    <section>
      <div>
        <span>(╯°□°)╯︵ ┻━┻</span>
        <p>You haven&apos;t uploaded any SVGs yet</p>
        <button onClick={initImageSelection} disabled={selectingImage}>Let&apos;s Do That!</button>
        <button onClick={initSignOut}>Sign Out</button>
      </div>
    </section>
  );
}
