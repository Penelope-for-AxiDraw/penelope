import { useContext, useState } from 'react';
import { createClient } from 'contentful-management';
import Image from 'next/image';

import { Button, ClearBtn } from '../StyledUiCommon/styles';
import { ExplorerContainer } from './styles';
import { fetchAxiSvgContent, getFromLocalStorage, saveToLocalStorage } from '../../utils';
import { store } from '../../providers/store';
import ImageBlock from '../ImageCard';
import Uploader from '../Uploader';

const ImageExplorer = ({ dismiss, handleSelect, currentIndex }) => {
  const globalState = useContext(store);
  const { dispatch, state: { entries } } = globalState;
  const [uploaderIsOpen, setUploaderIsOpen] = useState(false);

  const initDelete = async (index) => {
    // console.log(index);
    // console.log(entries[index]);

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

  return (
    <ExplorerContainer>
        <div className="explorer-header">
          <div>
            <h4>SVG Explorer</h4>
            <ClearBtn onClick={dismiss}>
              <Image alt="temp" src={"/icn-square.svg"} width={24} height={24} />
            </ClearBtn>
          </div>
          <p>Upload and manage your SVG images</p>
        </div>
        <div className="explorer-body">
            {uploaderIsOpen ? (
              <div>
                <Uploader dismiss={() => setUploaderIsOpen(false)} />
              </div>
            ) : (
              <>
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
              </>
            )}
        </div>
        <div className="explorer-footer">
          {/* <button onClick={() => setUploaderIsOpen(true)}>Upload an SVG</button> */}
          <Button onClick={() => setUploaderIsOpen(true)} wd={24}>Upload an SVG</Button>
        </div>
    </ExplorerContainer>
  )
};

export default ImageExplorer;
