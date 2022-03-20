import { useContext, useEffect, useState } from 'react';
import { createClient } from 'contentful-management';
import type { NextPage } from "next";
import AxiDrawControl from "../src/components/AxiDrawControl";
import ImageControls from "../src/components//ImageControls";
import ImagePreview from "../src/components/ImagePreview";
import ImageExplorer from "../src/components/ImageExplorer";
import { useRouter } from 'next/router';
import { store } from '../src/providers/store';

const Home: NextPage = () => {
  const [listIndex, setlistIndex] = useState(0);
  const [selectingImage, setSelectingImage] = useState(false);
  const router = useRouter();
  const globalState = useContext(store);
  const { state: { entries } } = globalState;

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
    router.push('/start');
  }

  const client = createClient({
    // This is the access token for this space. Normally you get the token in the Contentful web app
    accessToken: process.env.NEXT_PUBLIC_PERSONAL_ACCESS_TOKEN || ''
  });

  const placeholder = {
    url: 'fun-pattern.png',
    width: 288,
    height: 432,
  };

  return (
    <main>
      {selectingImage &&
        <ImageExplorer
          dismiss={() => setSelectingImage(false)}
          entries={entries}
          handleSelect={handleSelectImage}
        />
      }
      <div className="column-left">
        {entries.length === 0 ? (
          <TableFlip />
        ) : (
          <>
            {entries.length && (<ImageControls
              currentEntry={entries[listIndex]}
              initImageSelection={openImageSelectionModal}
              signOut={initSignOut}
              />)}
            <AxiDrawControl
              currentSvgData={entries[listIndex]}
            />
          </>
        )}
      </div>
      {entries.length ? <ImagePreview thumbnail={entries[listIndex].images.thumbnail} /> : <ImagePreview thumbnail={placeholder} />}
    </main>
  );
};

export default Home;


const TableFlip = () => {
  const tableFlipStyle = {
    margin: '1rem',
  };

  return (
    <div style={tableFlipStyle}>
      <span>(╯°□°)╯︵ ┻━┻</span>
    </div>
  );
}