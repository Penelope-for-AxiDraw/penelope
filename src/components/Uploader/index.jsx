import { useContext, useState } from "react";
import styled from 'styled-components';
import { createClient } from "contentful-management";

import { Button, Input, OutlineBtn, ScreenShade, TextArea } from '../StyledUiCommon/styles';
import { FieldsContainer, UploaderContainer } from './styles';
import Dropzone from '../Dropzone';
import { store } from '../../providers/store';
import {
  fetchAxiSvgContent,
  getFromLocalStorage,
  saveToLocalStorage,
  svgToImage
} from "../../utils";
import BurstSpinner from "../BurstSpinner";
import { BASELINE_DIMENSION } from "../../constants";

const Uploader = ({ dismiss }) => {
  const TITLE = 'title';
  const DESCRIPTION = 'description';
  const UPLOAD_ERROR_MESSAGE = 'We encountered an error while trying to upload your image. Please try again in a moment.';

  const globalState = useContext(store);
  const { dispatch } = globalState;

  const [svgFileData, setSvgFileData] = useState();
  const [pngFileData, setPngFileData] = useState();
  const [fileName, setFileName] = useState('');
  const [isTitleError, setIsTitleError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const [imageInfo, setImageInfo] = useState({
    values: {
      [TITLE]: '',
      [DESCRIPTION]: '',
    },
    errors: {
      [TITLE]: '',
    }
  });

  const credentialsLocalStorage = getFromLocalStorage('contentfulCreds');
  const { accessToken, spaceId } = credentialsLocalStorage;

  const client = createClient({
    accessToken,
  });

  const createNewEntry = async () => {
    setUploadError('');
    setIsUploading(true);

    // Upload SVG
    const svgAssetId = await uploadSvg();

    // Upload PNG thumbnail
    const pngAssetId = await uploadPng();

    // Configure the new entry
    const contentType = "axiSvgData";
    const fields = {
      title: {
        'en-US': imageInfo.values[TITLE],
      },
      description: {
        'en-US': imageInfo.values[DESCRIPTION],
      },
      svgFile: {
        'en-US': {
          sys: {
            id: svgAssetId,
            linkType: 'Asset',
            type: 'Link'
          }
        }
      },
      thumbnail: {
        'en-US': {
          sys: {
            id: pngAssetId,
            linkType: 'Asset',
            type: 'Link'
          }
        }
      }
    };

    // Create the new entry
    const newEntry = await client
      .getSpace(spaceId)
      .then((space) => space.getEnvironment('master'))
      .then((environment) => environment.createEntry(contentType, { fields }))
      .then((entry) => entry.publish())
      .catch((e) => {
        console.error(e);
        setUploadError(UPLOAD_ERROR_MESSAGE);
      });

    // Refresh entries data
    const space = await client.getSpace(spaceId);
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
    dispatch({
      type: 'SET_ENTRY',
      payload: {
        data: 0
      }
    });
    saveToLocalStorage('entryIndex', 0);

    // Dismiss uploader UI
    dismiss();
  };

  const queueSvgFile = (file) => {
    const reader = new FileReader();
    reader.onload = function (readEvt) {
      const rawData = readEvt.target.result;
      setSvgFileData(rawData);
    };
    reader.readAsArrayBuffer(file);
  };

  const queuePngFile = (file) => {
    const reader = new FileReader();
    reader.onload = (readEvt) => {
      const svgXml = readEvt.target.result;

      svgToImage({ svg: svgXml, scale: 2, outputFormat: 'blob' })
        .then((base64image) => {
          setPngFileData(base64image);
        })
        .catch(function (err) {
          // Log any error
          console.log(err);
        });

      return;
    };

    reader.readAsText(file);
  };

  const generateUploadPreview = (file) => {
    const reader = new FileReader();
    reader.onload = (readEvt) => {
      const svgXml = readEvt.target.result;

      svgToImage({ svg: svgXml, scale: 2 })
        .then((base64image) => {
          const elem = document.getElementById('preview-container');
          while (elem.firstChild) {
            elem.removeChild(elem.firstChild);
          }

          const img = document.createElement('img');
          img.src = base64image.dataUrl;
          const wd = base64image.width;
          const ht = base64image.height;
          const size = BASELINE_DIMENSION * 15;
          if (wd > ht) {
            img.setAttribute('width', size);
          } else {
            img.setAttribute('height', size);
          }

          document.getElementById('preview-container').appendChild(img);
        })
        .catch(function (err) {
          // Log any error
          console.log(err);
        });

      return;
    };

    reader.readAsText(file);
  };

  const uploadSvg = async () => {
    const svgFileName = `${fileName}.svg`;
    const id = await client
      .getSpace(spaceId)
      .then((space) => space.getEnvironment('master'))
      .then((environment) =>
        environment.createAssetFromFiles({
          fields: {
            title: {
              'en-US': imageInfo.values[TITLE],
            },
            file: {
              'en-US': {
                contentType: 'image/svg+xml',
                fileName: svgFileName,
                file: svgFileData,
              },
            },
          },
        })
      )
      .then((asset) => asset.processForAllLocales())
      .then((asset) => asset.publish())
      .then(response => response.sys.id)
      .catch(console.error);

    return id;
  };

  const uploadPng = async () => {
    const pngFileName = `${fileName}.png`;
    const id = await client
      .getSpace(spaceId)
      .then((space) => space.getEnvironment('master'))
      .then((environment) =>
        environment.createAssetFromFiles({
          fields: {
            title: {
              'en-US': imageInfo.values[TITLE],
            },
            file: {
              'en-US': {
                contentType: 'image/png',
                fileName: pngFileName,
                file: pngFileData,
              },
            },
          },
        })
      )
      .then((asset) => asset.processForAllLocales())
      .then((asset) => asset.publish())
      .then(response => response.sys.id)
      .catch(console.error);

    return id;
  };

  const handleChangeInput = (e) => {
    let blankTitle = false;
    if (e.target.name === TITLE) {
      blankTitle = e.target.value.trim() === '';
    }
    setIsTitleError(blankTitle);

    const updatedInfo = {
      ...imageInfo,
      values: {
        ...imageInfo.values,
        [e.target.name]: e.target.value,
      },
      errors: {
        [TITLE]: blankTitle ? 'Image title should be at least 3 characters' : '',
      }
    };

    setImageInfo(updatedInfo);
  };

  const titleError = imageInfo.errors[TITLE];
  const { values: { title, description } } = imageInfo;
  const readyToUpload = !isTitleError && svgFileData && imageInfo.values[TITLE].trim().length !== 0;

  const handleFileAdded = (file) => {
    const fname = file.name.substring(0, file.name.length - 4);
    const updatedInfo = {
      ...imageInfo,
      values: {
        [TITLE]: fname,
        [DESCRIPTION]: '',
      },
      errors: {
        [TITLE]: '',
      }
    };

    setImageInfo(updatedInfo);
    setFileName(fname);
    queueSvgFile(file);
    queuePngFile(file);
    generateUploadPreview(file);
  }

  const fileQueued = !!svgFileData;

  // return (
  //   <>
  //     {isUploading && (
  //       <LoadingOverlay>
  //         <Spinner fillColor="white" scale={0.75} />
  //       </LoadingOverlay>
  //     )}
  //     <div>
  //       <Dropzone
  //         onFileAdded={handleFileAdded}
  //         disabled={false}
  //         acceptedTypes={['.svg']}
  //       />
  //       <div id="preview-container"></div>

  //       <div className="field-cont">
  //         <input
  //           className="input-field"
  //           placeholder="Image title"
  //           onChange={handleChangeInput}
  //           value={title}
  //           name={TITLE}
  //           disabled={isUploading}
  //         />
  //       </div>

  //       {titleError && (
  //         <p className="input-field-error">{titleError}</p>
  //       )}

  //       <div className="field-cont">
  //         <textarea
  //           rows={5}
  //           cols={33}
  //           maxLength={256}
  //           placeholder="Description of this work"
  //           onChange={handleChangeInput}
  //           value={description}
  //           name={DESCRIPTION}
  //           disabled={isUploading}
  //         ></textarea>
  //       </div>

  //       <button onClick={createNewEntry} disabled={!readyToUpload || isUploading}>Upload this SVG</button>
  //       <button onClick={() => dismiss()}>You Know What, Never Mind</button>
  //     </div>
  //   </>
  // );

  return (
    <ScreenShade>
      {fileQueued ? (
        <UploaderContainer>
          <div style={{ position: 'relative' }}>
            {/* <FolderButton>x</FolderButton> */}
            {isUploading && (
              <BurstSpinner />
            )}
            <div id="preview-container"></div>
          </div>
          <FieldsContainer>
            <p className="fields-title">File Info</p>
            <Input
              className="input-field"
              placeholder="Image Title"
              onChange={handleChangeInput}
              value={title}
              name={TITLE}
              disabled={isUploading}
              // fieldWidth={24 - 0.5 - 0.125}
            />

            {titleError && (
              <p className="input-field-error">{titleError}</p>
            )}

            <TextArea
              rows={5}
              cols={33}
              // fieldWidth={24 - 0.5 - 0.125}
              maxLength={256}
              placeholder="Description of this artwork"
              onChange={handleChangeInput}
              value={description}
              name={DESCRIPTION}
              disabled={isUploading}
            />
            
            {uploadError && <p className="input-field-error">{uploadError}</p>}

            <div className="button-bar">
              {/* <Button variant="secondary" onClick={dismiss}>Cancel</Button> */}
              <OutlineBtn onClick={dismiss} disabled={isUploading}>Cancel</OutlineBtn>
              <Button onClick={createNewEntry} disabled={!readyToUpload || isUploading}>Upload</Button>
            </div>

          </FieldsContainer>
        </UploaderContainer>
      ) : (
        <div className="dropzone-wrapper">
          <Dropzone
            onFileAdded={handleFileAdded}
            disabled={false}
            acceptedTypes={['.svg']}
            dismiss={dismiss}
          />
        </div>
      )}
    </ScreenShade>
  );
};

export default Uploader;

const LoadingOverlay = styled.div`
  position: absolute;
  width: calc(424px - 2rem);
  height: 100%;
  background: #0000006e;
  display: flex;
  align-items: center;
  justify-content: center;
`;