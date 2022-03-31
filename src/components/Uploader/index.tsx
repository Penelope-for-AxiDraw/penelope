import { useContext, useState } from "react";
import { createClient } from "contentful-management";

import Dropzone from '../Dropzone';
import { getFromLocalStorage } from "../../utils";

const Uploader = ({ cancel }) => {
  const [fileData, setFileData] = useState();
  const [fileName, setFileName] = useState("");
  const [isTitleError, setIsTitleError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const TITLE = 'title';
  const DESCRIPTION = 'description';

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

  // const createNewEntry = () => {
  //   // Create entry
  //   client
  //     .getSpace(spaceId)
  //     .then((space) => space.getEnvironment("master"))
  //     .then((environment) => environment.createEntry(contentType, { fields }))
  //     .then((entry) => console.log(entry))
  //     .catch(console.error);
  // };

  const createNewEntry = async () => {
    setIsUploading(true);

    // Upload SVG
    const svgAssetId = await uploadSvg();
    // console.log(svgAssetId);

    // Upload PNG thumbnail
    // const pngAssetId = await uploadPng();

    // Create entry
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
      }
      // svgFile: svgAssetId,
      // thumbnail: {
      //   "en-US": svgAssetId,
      // }
    };

    const newEntry = await client
      .getSpace(spaceId)
      .then((space) => space.getEnvironment("master"))
      .then((environment) => environment.createEntry(contentType, { fields }))
      // .then((entry) => entry.publish())
      .catch(console.error);
    
    console.log('newEntry is', newEntry);

    // Associate SVG ID with the new entry    
    // newEntry.fields['svgFile']['en-US'] = {'sys': {'id': svgAssetId, 'linkType': 'Asset', 'type': 'Link'}};
    // Object.defineProperty(newEntry.fields, 'svgFile', { value: { 'en-US': {'sys': {'id': svgAssetId, 'linkType': 'Asset', 'type': 'Link'}} }});
    // Associate PNG ID with the new entry
    // newEntry.fields['thumbnail']['en-US'] = {'sys': {'id': thumbnailId, 'linkType': 'Asset', 'type': 'Link'}};
    // await newEntry.update();

    // Update entries in local storage and context
    // … saveToLocalStorage(…)
    // … dispatch(…)
  };

  const queueFile = (file) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = function (readEvt) {
      const rawData = readEvt.target.result;
      setFileData(rawData);
    };
    reader.readAsArrayBuffer(file);
  };

  const uploadSvg = async () => {
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
                fileName,
                file: fileData,
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
  const { values: { title, description }} = imageInfo;
  const readyToUpload = !isTitleError && fileData && imageInfo.values[TITLE].trim().length !== 0;

  return (
    <div>
      <Dropzone
        onFileAdded={queueFile}
        disabled={false}
        acceptedTypes={['.svg']}
      />

      <div className="field-cont">
        <input
          className="input-field"
          placeholder="Image title"
          onChange={handleChangeInput}
          value={title}
          name={TITLE}
          // disabled={isUploading}
        />
      </div>

      {titleError && (
        <p className="input-field-error">{titleError}</p>
      )}

      {/* <div className="field-cont">
        <input
          className="input-field"
          placeholder="Description of this work"
          // onChange={doHandleChangeInput}
          // value={description}
          name="imageDescription"
          // disabled={isSigningIn}
        />
      </div> */}

      <div className="field-cont">
        <textarea
          rows={5}
          cols={33}
          maxLength={256}
          placeholder="Description of this work"
          onChange={handleChangeInput}
          value={description}
          name={DESCRIPTION}
          disabled={isUploading}
        ></textarea>
      </div>

      <button onClick={createNewEntry} disabled={!readyToUpload || isUploading}>Upload this SVG</button>
      {/* <button onClick={() => cancel()}>Cancel</button> */}
      {/* {spaceError && (
        <p className="input-field-error">{spaceError}</p>
      )}

      {anyBlankFields && (
        <p className="input-field-error">Please enter both an access token and a space ID</p>
      )} */}

    </div>
  );
};

export default Uploader;








  // const updateEntry = (entryId: string) => {
  //   // Update entry
  //   client
  //     .getSpace(spaceId)
  //     .then((space) => space.getEnvironment("master"))
  //     .then((environment) => environment.getEntry(entryId))
  //     .then((entry) => {
  //       entry.fields.title["en-US"] = "New entry title";
  //       return entry.update();
  //     })
  //     .then((entry) => console.log(`Entry ${entry.sys.id} updated.`))
  //     .catch(console.error);
  // };

  // const uploadText = () => {
  //   const rando = Math.round(Math.random() * 10000);
  //   const randomNumbers = new Array(10)
  //     .fill(0)
  //     .map((_item) => Math.round(Math.random() * 1000))
  //     .join(" ");

  //   client
  //     .getSpace(spaceId)
  //     .then((space) => space.getEnvironment("master"))
  //     .then((environment) =>
  //       environment.createAssetFromFiles({
  //         fields: {
  //           title: {
  //             "en-US": `text file ${rando}`,
  //           },
  //           description: {
  //             "en-US": "Asset description",
  //           },
  //           file: {
  //             "en-US": {
  //               contentType: "text/plain",
  //               fileName: `text-file-${rando}.txt`,
  //               file: randomNumbers,
  //             },
  //           },
  //         },
  //       })
  //     )
  //     .then((asset) => asset.processForAllLocales())
  //     .then((asset) => asset.publish())
  //     .then((blah) => console.log("response:", blah))
  //     .catch(console.error);
  // };

  // const uploadSvg = () => {
  //   client.getSpace(spaceId)
  //   .then((space) => space.getEnvironment('master'))
  //   .then((environment) => environment.createAssetFromFiles({
  //     fields: {
  //       title: {
  //         'en-US': `image-${Math.round(Math.random() * 10000)}`
  //       },
  //       description: {
  //         'en-US': 'Asset description'
  //       },
  //       file: {
  //         'en-US': {
  //           contentType: 'image/svg+xml',
  //           fileName: 'circle.svg',
  //           file: '<svg><path fill="red" d="M50 50h150v50H50z"/></svg>'
  //         }
  //       }
  //     }
  //   }))
  //   .then((asset) => asset.processForAllLocales())
  //   .then((asset) => asset.publish())
  //   .then((blah) => console.log('response:', blah))
  //   .catch(console.error)
  // }

  // const fetchAxiSvgContent = async () => {
  //   const { items: entries } = await client
  //     .getSpace(spaceId)
  //     .then((space) => space.getEnvironment("master"))
  //     .then((environment) =>
  //       environment.getEntries({ content_type: "axiSvgData" })
  //     );

  //   const { items: assets } = await client
  //     .getSpace(spaceId)
  //     .then((space) => space.getEnvironment("master"))
  //     .then((environment) => environment.getAssets());

  //   const imageAssetUrls = entries.map(item => {
  //     const thumbnailID = item.fields.thumbnail['en-US'].sys.id;
  //     const thumbnailAsset = assets.find(asset => asset.sys.id === thumbnailID);
  //     const svgID = item.fields.svgFile['en-US'].sys.id;
  //     const svgAsset = assets.find(asset => asset.sys.id === svgID);
  //     return ({
  //       id: item.sys.id,
  //       urls: {
  //         thumbnail: `https:${thumbnailAsset.fields.file['en-US'].url}`,
  //         svg: `https:${svgAsset.fields.file['en-US'].url}`
  //       },
  //       fileName: svgAsset?.fields.file['en-US'].fileName,
  //     });
  //   });

  //   console.log('imageAssetUrls', imageAssetUrls);
  // };

  // const queueFile = (e) => {
  //   // console.log('event', e);
  //   // console.log(e.target);
  //   // console.log(e.target.files[0]);
  //   // const fileRef = e.target.value;
  //   // console.log(fileRef.name, fileRef.size);
  //   const file = e.target.files[0];
  //   setFileName(file.name);
  //   const reader = new FileReader();
  //   // // let rawData = new ArrayBuffer();
  //   reader.onload = function (readEvt) {
  //     let rawData = readEvt.target.result;
  //     // console.log('file', file);
  //     // console.log('fileName', file.name);
  //     setFileData(rawData);
  //   };
  //   reader.readAsArrayBuffer(file);
  //   // client.getSpace(spaceId)
  //   // .then((space) => space.getEnvironment('master'))
  //   // .then((environment) => environment.createAssetFromFiles({
  //   //   fields: {
  //   //     title: {
  //   //       'en-US': `image-${Math.round(Math.random() * 10000)}`
  //   //     },
  //   //     description: {
  //   //       'en-US': 'Asset description'
  //   //     },
  //   //     file: {
  //   //       'en-US': {
  //   //         contentType: 'image/svg+xml',
  //   //         fileName: 'circle.svg',
  //   //         file: '<svg><path fill="red" d="M50 50h150v50H50z"/></svg>'
  //   //       }
  //   //     }
  //   //   }
  //   // }))
  //   // .then((asset) => asset.processForAllLocales())
  //   // .then((asset) => asset.publish())
  //   // .then((blah) => console.log('response:', blah))
  //   // .catch(console.error)
  // };