import { useContext, useState } from "react";
import { createClient } from "contentful-management";

import Dropzone from '../Dropzone';
import { getFromLocalStorage, svgToImage } from "../../utils";

const Uploader = ({ cancel }) => {
  const [svgFileData, setSvgFileData] = useState();
  const [pngFileData, setPngFileData] = useState();
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

  const createNewEntry = async () => {
    setIsUploading(true);

    // Upload SVG
    const svgAssetId = await uploadSvg();
    // console.log(svgAssetId);

    // Upload PNG thumbnail
    const pngAssetId = await uploadPng();

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

    const newEntry = await client
      .getSpace(spaceId)
      .then((space) => space.getEnvironment("master"))
      .then((environment) => environment.createEntry(contentType, { fields }))
      .then((entry) => entry.publish())
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

  const queueSvgFile = (file) => {
    const fname = file.name.substring(0, fileName.length - 4);
    setFileName(fname);
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
    // setFileName(file.name);
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
          img.src = base64image;
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
  const { values: { title, description }} = imageInfo;
  const readyToUpload = !isTitleError && svgFileData && imageInfo.values[TITLE].trim().length !== 0;

  // const createPreviewImage = () => {
  //   console.log('svgFileData', svgFileData);
  //   // svgToImage({
  //   //     // 1. Provide the SVG
  //   //     // svg: `<svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"> <path d="M1585 1215q-39 125-123 250-129 196-257 196-49 0-140-32-86-32-151-32-61 0-142 33-81 34-132 34-152 0-301-259-147-261-147-503 0-228 113-374 113-144 284-144 72 0 177 30 104 30 138 30 45 0 143-34 102-34 173-34 119 0 213 65 52 36 104 100-79 67-114 118-65 94-65 207 0 124 69 223t158 126zm-376-1173q0 61-29 136-30 75-93 138-54 54-108 72-37 11-104 17 3-149 78-257 74-107 250-148 1 3 2.5 11t2.5 11q0 4 .5 10t.5 10z"/> </svg>`,
  //   //     svg: svgFileData,
  //   //     // 2. Provide the format of the output image
  //   //     mimetype: 'image/png',
  //   //     // 3. Provide the dimensions of the image if you want a specific size.
  //   //     //  - if they remain in auto, the width and height attribute of the svg will be used
  //   //     //  - You can provide a single dimension and the other one will be automatically calculated
  //   //     // width: "auto",
  //   //     // height: "auto",
  //   //     width: 500,
  //   //     height: 500,
  //   //     // 4. Specify the quality of the image
  //   //     quality: 1,
  //   //     // 5. Define the format of the output (base64 or blob)
  //   //     outputFormat: 'base64'
  //   // }).then(function(outputData){
  //   //     // If using base64 (outputs a DataURL)
  //   //     //  data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0...
  //   //     // Or with Blob (Blob)
  //   //     //  Blob {size: 14353, type: "image/png"}
  //   //     console.log(outputData);
  //   // }).catch(function(err){
  //   //     // Log any error
  //   //     console.log('Oh no!', err);
  //   // });
  // }

  const handleFileAdded = (file) => {
    queueSvgFile(file);
    queuePngFile(file);
    generateUploadPreview(file);
  }

  return (
    <div>
      <Dropzone
        onFileAdded={handleFileAdded}
        disabled={false}
        acceptedTypes={['.svg']}
      />
      <div id="preview-container"></div>

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
      {/* <button onClick={createPreviewImage}>Create Preview</button> */}
      <button onClick={() => cancel()}>You Know What, Never Mind</button>
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

  // const queueSvgFile = (e) => {
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
  //     setSvgFileData(rawData);
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