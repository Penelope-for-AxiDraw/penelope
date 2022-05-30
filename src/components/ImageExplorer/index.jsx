import { useContext, useState } from 'react';
import { createClient } from 'contentful-management';
import Image from 'next/image';

import { Button, ClearBtn, IconButton, NavSection, OutlineBtn, PanelSectionHeading } from '../StyledUiCommon/styles';
import { ExplorerContainer } from './styles';
import { fetchAxiSvgContent, getFromLocalStorage, saveToLocalStorage } from '../../utils';
import { store } from '../../providers/store';
import ImageBlock from '../ImageCard';
import Uploader from '../Uploader';
import { PlugIcon } from '../Icons';

const ImageExplorer = ({ currentIndex, handleSelect, title, sendCommand }) => {
  const globalState = useContext(store);
  const { dispatch, state: { entries } } = globalState;
  const [uploaderIsOpen, setUploaderIsOpen] = useState(false);

  const initDelete = async (index) => {
    const credentialsLocalStorage = getFromLocalStorage('contentfulCreds');
    if (!credentialsLocalStorage) {
      return;
    }

    const entryId = entries[index].id;
    const svgId = entries[index].images.svg.id;
    const thumbnailId = entries[index].images.thumbnail.id;

    const { accessToken, spaceId } = credentialsLocalStorage;
    const client = createClient({ accessToken });
    const space = await client.getSpace(spaceId);

    await space.getEnvironment('master')
      .then((environment) => environment.getEntry(entryId))
      .then((entry) => entry.unpublish())
      .then((entry) => entry.delete())
      .catch(console.error)    

    await space.getEnvironment('master')
      .then((environment) => environment.getAsset(thumbnailId))
      .then((asset) => asset.unpublish())
      .then((asset) => asset.delete())
      .catch(console.error)

    await space.getEnvironment('master')
      .then((environment) => environment.getAsset(svgId))
      .then((asset) => asset.unpublish())
      .then((asset) => asset.delete())
      .catch(console.error)

    console.log(`Entry ${entryId} and its assets were unpublished and deleted.`);
    const data = await fetchAxiSvgContent(space);

    // Save content into local storage
    saveToLocalStorage('axiSvgContent', data);

    // Save content to store
    dispatch({
      type: 'SET_ENTRIES_DATA',
      payload: {
        data,
      },
    });
  }

  // return (
  //   <NavSection>
  //     <PanelSectionHeading>
  //       {title}
  //       <OutlineBtn onClick={() => setUploaderIsOpen(true)}>Upload a New SVG</OutlineBtn>
  //     </PanelSectionHeading>
  //     <ExplorerContainer>
  //       {uploaderIsOpen ? (
  //         <div className="explorer-body">
  //           <Uploader dismiss={() => setUploaderIsOpen(false)} />
  //         </div>
  //       ) : (
  //         <>
  //           <div className="explorer-body">
  //             <div className="explorer-grid">
  //               {entries.map((data, index) => (
  //                 <ImageBlock
  //                   key={data.images.thumbnail.id}
  //                   imageData={data}
  //                   handleClick={() => handleSelect(index)}
  //                   initDelete={() => initDelete(index)}
  //                   isActive={index === currentIndex}
  //                 />
  //               ))}
  //             </div>
  //           </div>
  //           <div className="explorer-footer">
  //             <Button onClick={() => setUploaderIsOpen(true)} wd={24}>Upload an SVG</Button>
  //           </div>
  //         </>
  //       )}
  //     </ExplorerContainer>
  //   </NavSection>
  // )

  // THIS IS DUPLICATED, YOU SHOULD CONSOLIDATE
  const cmdBeginPlot = () => {
    console.log('begin plotting yay!');
    sendCommand('plot');
  }

  return (
    <>
      <NavSection>
        <PanelSectionHeading>{title}</PanelSectionHeading>
        <OutlineBtn onClick={() => setUploaderIsOpen(true)}>Upload a New SVG</OutlineBtn>
      </NavSection>

      <NavSection>
        <ExplorerContainer>
          {uploaderIsOpen ? (
            <div className="explorer-body">
              <Uploader dismiss={() => setUploaderIsOpen(false)} />
            </div>
          ) : (
            <>
              <div className="explorer-body">
                <div className="explorer-grid">
                  {entries.map((data, index) => (
                    <ImageBlock
                      key={data.images.thumbnail.id}
                      imageData={data}
                      handleClick={() => handleSelect(index)}
                      initDelete={() => initDelete(index)}
                      isActive={index === currentIndex}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </ExplorerContainer>
      </NavSection>
      <NavSection>
        <IconButton className="cta" variant="alternate" onClick={cmdBeginPlot} wide>
            <PlugIcon width={24} height={24} fill='#fff' />
            <span>Plot It!</span>
        </IconButton>
      </NavSection>
    </>
  )
};

export default ImageExplorer;
