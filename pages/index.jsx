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
import { saveToLocalStorage } from '../src/utils';
import PenelopeLogo from '../src/components/PenelopeLogo';
import Hmmm from '../src/components/Hmmm';

const Home = () => {
  const defaultMode = DASHBOARD;
  const globalState = useContext(store);
  const [appMode, setAppMode] = useState(defaultMode);
  const [navIndex, setNavIndex] = useState(0);
  const { dispatch, state: { currentEntryIndex, entries, disco } } = globalState;

  const handleSelectImage = (index) => {
    dispatch({
      type: 'SET_ENTRY',
      payload: {
        data: index
      }
    });
    saveToLocalStorage('entryIndex', index);
  }

  const initSignOut = () => {
    const warningCopy = {
      title: 'Sign out?',
      text: 'Are you sure you want to sign out of your account?',
    };

    const leave = () => {
      window.localStorage.removeItem('contentfulCreds');
      // window.localStorage.removeItem('axidrawCreds');
      window.localStorage.removeItem('axiSvgContent');
      window.localStorage.removeItem('entryIndex');
      window.sessionStorage.removeItem('navIndex');
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

  useEffect(() => {
    // Go to most recent tab from session on page load
    let index;
    if (typeof window !== 'undefined') {
      index = window.sessionStorage.getItem('navIndex') || 0;
    }
    setNavIndex(JSON.parse(index));
  }, []);

  useEffect(() => {
    dispatch({
      type: 'SET_HOST',
      payload: {
        data: window.location.hostname,
      },
    });
  }, [dispatch]);

  const updateAppMode = (mode) => {
    setAppMode(mode);
  }

  const LogoBlock = () => {
    return (
      <div className="logo-block">
        <PenelopeLogo height={40} fill="var(--dark-purple)" />
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
          leave: () => { },
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
    window.sessionStorage.setItem('navIndex', index);
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
        </div>
        {entries.length ? <ImagePreview thumbnail={entries[currentEntryIndex].images.thumbnail} /> : <Hmmm />}
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
