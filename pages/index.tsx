import { useContext, useEffect, useState } from 'react';
import type { NextPage } from "next";
import AxiDrawControl from "../src/components/AxiDrawControl";
import ImageControls from "../src/components//ImageControls";
import ImagePreview from "../src/components/ImagePreview";
import ImageExplorer from "../src/components/ImageExplorer";
import Dashboard from '../src/components/Dashboard';
import { useRouter } from 'next/router';

import { store } from '../src/providers/store';
import { DASHBOARD, PLOT } from '../src/constants';

const Home: NextPage = () => {
  // const authMode = 'AUTH';
  // const plotMode = 'PLOT';
  const defaultMode = DASHBOARD;
  const [listIndex, setlistIndex] = useState(0);
  const [selectingImage, setSelectingImage] = useState(false);
  const router = useRouter();
  const globalState = useContext(store);
  const { state: { entries, user } } = globalState;
  const [appMode, setAppMode] = useState(defaultMode);

  // useEffect(() => {
  //   // function onScroll() {
  //   //   console.log("scroll!");
  //   // }

  //   // window.addEventListener("scroll", onScroll);
  //   const axiSvgContentSessionStorage = window.sessionStorage.getItem('axiSvgContento');
  //   console.log('axiSvgContentSessionStorage', axiSvgContentSessionStorage);

  //   // return function unMount() {
  //   //   window.removeEventListener("scroll", onScroll);
  //   // };
  // }, []);

  const handleSelectImage = (index: number) => {
    setlistIndex(index);
  }

  const openImageSelectionModal = () => {
    setSelectingImage(true);
  }

  const initSignOut = () => {
    window.localStorage.removeItem('contentfulCreds');
    window.localStorage.removeItem('axiSvgContent');
    setAppMode(DASHBOARD);
    // router.push('/start');
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

  }, [hasEntries, router, user]);

  const updateAppMode = (mode) => {
    setAppMode(mode);
  }

  if (appMode === PLOT) {
    return (
      <main>
        {/* {selectingImage &&
          <ImageExplorer
            dismiss={() => setSelectingImage(false)}
            handleSelect={handleSelectImage}
          />
        } */}
        <div className="column-left">
          {hasEntries ? (
            <>
              <ImageControls
                currentEntry={entries[listIndex]}
                initImageSelection={openImageSelectionModal}
                selectingImage={selectingImage}
                signOut={initSignOut}
              />
              <AxiDrawControl
                currentSvgData={entries[listIndex]}
              />
            </>
          ) : (
            <NoEntriesNotification initImageSelection={openImageSelectionModal} signOut={initSignOut} selectingImage={selectingImage} />
          )}
        </div>
        {selectingImage && (
          <div className="column-explore">
            <section>
              <ImageExplorer
                dismiss={() => setSelectingImage(false)}
                handleSelect={handleSelectImage}
              />
            </section>
          </div>
        )}
        {entries.length ? <ImagePreview thumbnail={entries[listIndex].images.thumbnail} /> : <ImagePreview thumbnail={placeholder} />}
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
  // const tableFlipStyle = {
  //   margin: '1rem',
  // };

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
