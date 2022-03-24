import { useContext, useState } from "react";
import { createClient } from "contentful-management";
import { getFromLocalStorage } from "../../utils";

const Uploader = ({ cancel }) => {
  const [fileData, setFileData] = useState();
  const [fileName, setFileName] = useState("");

  const credentialsLocalStorage = getFromLocalStorage('contentfulCreds');
  const { accessToken, spaceId } = credentialsLocalStorage;

  const client = createClient({
    accessToken,
  });

  // const spaceId = process.env.NEXT_PUBLIC_SPACE || "";
  const contentType = "axiSvgData";
  const fields = {
    title: {
      "en-US": `This is a new entry ${Math.round(Math.random() * 100000)}`,
    },
    description: {
      "en-US": `Description of this entry`,
    },
  };

  const createNewEntry = () => {
    // Create entry
    client
      .getSpace(spaceId)
      .then((space) => space.getEnvironment("master"))
      .then((environment) => environment.createEntry(contentType, { fields }))
      .then((entry) => console.log(entry))
      .catch(console.error);
  };

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

  const uploadSvg = () => {
    if (fileData) {
      client
        .getSpace(spaceId)
        .then((space) => space.getEnvironment("master"))
        .then((environment) =>
          environment.createAssetFromFiles({
            fields: {
              title: {
                "en-US": `image-${Math.round(Math.random() * 10000)}`,
              },
              description: {
                "en-US": "Asset description",
              },
              file: {
                "en-US": {
                  contentType: "image/svg+xml",
                  fileName,
                  file: fileData,
                },
              },
            },
          })
        )
        .then((asset) => asset.processForAllLocales())
        .then((asset) => asset.publish())
        .then((blah) => console.log("response:", blah))
        .catch(console.error);
    }
  };

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

  const queueFile = (e) => {
    // console.log('event', e);
    // console.log(e.target);
    // console.log(e.target.files[0]);
    // const fileRef = e.target.value;
    // console.log(fileRef.name, fileRef.size);
    const file = e.target.files[0];
    setFileName(file.name);
    const reader = new FileReader();
    // // let rawData = new ArrayBuffer();
    reader.onload = function (readEvt) {
      let rawData = readEvt.target.result;
      // console.log('file', file);
      // console.log('fileName', file.name);
      setFileData(rawData);
    };
    reader.readAsArrayBuffer(file);
    // client.getSpace(spaceId)
    // .then((space) => space.getEnvironment('master'))
    // .then((environment) => environment.createAssetFromFiles({
    //   fields: {
    //     title: {
    //       'en-US': `image-${Math.round(Math.random() * 10000)}`
    //     },
    //     description: {
    //       'en-US': 'Asset description'
    //     },
    //     file: {
    //       'en-US': {
    //         contentType: 'image/svg+xml',
    //         fileName: 'circle.svg',
    //         file: '<svg><path fill="red" d="M50 50h150v50H50z"/></svg>'
    //       }
    //     }
    //   }
    // }))
    // .then((asset) => asset.processForAllLocales())
    // .then((asset) => asset.publish())
    // .then((blah) => console.log('response:', blah))
    // .catch(console.error)
  };

  return (
    <main>
      <div>
        <input
          onChange={queueFile}
          type="file"
          id="svgUpload"
          name="svgUpload"
          accept="image/svg+xml"
        />
        {/* <button onClick={uploadSvg} disabled={!fileData}>
          Upload SVG File
        </button> */}

        <div className="field-cont">
          <input
            className="login-field"
            placeholder="Image title"
            // onChange={doHandleChangeInput}
            // value={fieldCreds.values[TOKEN]}
            name="imageTitle"
            // disabled={isSigningIn}
          />
        </div>
        {/* {tokenError && (
          <p className="input-field-error">{tokenError}</p>
        )} */}

        <div className="field-cont">
          <input
            className="login-field"
            placeholder="Description of this work"
            // onChange={doHandleChangeInput}
            // value={fieldCreds.values[SPACE_ID]}
            name="imageDescription"
            // disabled={isSigningIn}
          />
        </div>

        <button onClick={createNewEntry}>Upload this SVG</button>
        <button onClick={() => cancel()}>Cancel</button>
        {/* {spaceError && (
          <p className="input-field-error">{spaceError}</p>
        )}

        {anyBlankFields && (
          <p className="input-field-error">Please enter both an access token and a space ID</p>
        )} */}

      </div>
    </main>
  );
};

export default Uploader;
