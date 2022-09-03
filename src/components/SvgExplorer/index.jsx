import { useContext, useState } from 'react';
import { createClient } from 'contentful-management';
// import Image from 'next/image';

import { ClearBtn, IconButton, NavSection, OutlineBtn, PanelSectionHeading } from '../StyledUiCommon/styles';
import { ExplorerGrid } from './styles';
import { fetchAxiSvgContent, getFromLocalStorage, plot, saveToLocalStorage } from '../../utils';
import { store } from '../../providers/store';
import ImageBlock from '../ImageCard';
import Uploader from '../Uploader';
import { PlayIcon } from '../Icons';
import { CONTENT_TYPE_ID, CONTENT_TYPE_NAME } from '../../constants';

const SvgExplorer = ({ goToConnect, handleSelect, title }) => {
  const globalState = useContext(store);
  const { dispatch, state: { axiConnection, currentEntryIndex, entries, isConnected } } = globalState;
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

  const blankHeightStyle = isConnected ? {} : { height: '8rem' };

  // Move this process to after sign-in and before fetching content
  const initCheckContentTypes = async () => {
    // console.log('Checking if content types already exist');
    const credentialsLocalStorage = getFromLocalStorage('contentfulCreds');
    if (!credentialsLocalStorage) {
      return;
    }

    const { accessToken, spaceId } = credentialsLocalStorage;

    const client = createClient({
      accessToken: accessToken,
    });

    const space = await client.getSpace(spaceId);

    const contentTypeExists = await space.getEnvironment('master')
      .then((environment) => environment.getContentTypes())
      .then((response) => {
        const contentTypeIds = response.items.map(item => item.sys.id);
        return contentTypeIds.includes(CONTENT_TYPE_NAME);
      })
      .catch(console.error);

    if (contentTypeExists) {
      return null;
    }

    // console.info(`Content type "${CONTENT_TYPE_NAME}" does not yet exist. Creating it now…`);

    // Create the new content type for AxiDraw SVG data
    await space.getEnvironment('master')
      .then((environment) => environment.createContentTypeWithId(CONTENT_TYPE_ID, {
        name: CONTENT_TYPE_NAME,
        fields: [
          {
            id: 'title',
            name: 'Title',
            type: 'Symbol',
            localized: false,
            required: true,
          },
          {
            id: 'description',
            name: 'Description',
            type: 'Symbol',
            localized: false,
            required: false,
          },
          {
            id: 'thumbnail',
            name: 'Thumbnail',
            type: 'Link',
            localized: false,
            required: false,
            linkType: 'Asset'
          },
          {
            id: 'svgFile',
            name: 'SVG File',
            type: 'Link',
            localized: false,
            required: false,
            linkType: 'Asset'
          }
        ]
      }))
      .catch(console.error);

      // Activate (publish) the new axiSvgData content type
      await space.getEnvironment('master')
        .then((environment) => environment.getContentType(CONTENT_TYPE_ID))
        .then((contentType) => contentType.publish())
        .then((contentType) => console.info(`Content type ${contentType.sys.id} was created and activated.`))
        .catch(console.error);
  };
  

  return (
    <>
      {uploaderIsOpen && <Uploader dismiss={() => setUploaderIsOpen(false)} />}
      <NavSection className="gallery-section-header">
        <div>
          <button onClick={initCheckContentTypes}>create content types</button>
        </div>
        <PanelSectionHeading>{title}</PanelSectionHeading>
        <OutlineBtn onClick={() => setUploaderIsOpen(true)}>Upload a New SVG</OutlineBtn>
      </NavSection>
      <NavSection className="main-area gallery">
        <ExplorerGrid>
          {entries.map((data, index) => (
            <ImageBlock
              key={data.images.thumbnail.id}
              imageData={data}
              handleClick={() => handleSelect(index)}
              initDelete={() => initDelete(index)}
              isActive={index === currentEntryIndex}
            />
          ))}
        </ExplorerGrid>
      </NavSection>
      <NavSection className="gallery-cta-footer" style={blankHeightStyle}>
        {isConnected ? (
          <IconButton className="cta" variant="alternate" onClick={() => plot(entries[currentEntryIndex], axiConnection)} wide>
            <PlayIcon width={24} height={24} fill='#fff' />
            <span>Plot It!</span>
          </IconButton>
        ) : (
          <p className="blurb">To begin plotting, <ClearBtn onClick={goToConnect}>connect to AxiDraw</ClearBtn>.</p>
        )}
      </NavSection>
    </>
  )
};

export default SvgExplorer;
