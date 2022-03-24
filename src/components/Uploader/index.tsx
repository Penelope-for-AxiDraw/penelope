import { useState } from "react";
import { createClient } from "contentful-management";

const Uploader = () => {
  const [fileData, setFileData] = useState();
  const [fileName, setFileName] = useState("");
  const client = createClient({
    accessToken: process.env.NEXT_PUBLIC_PERSONAL_ACCESS_TOKEN || "",
  });

  const spaceID = process.env.NEXT_PUBLIC_SPACE || "";
  const contentType = "axiSvgData";
  const fields = {
    title: {
      "en-US": `This is a new entry ${Math.round(Math.random() * 100000)}`,
    },
    description: {
      "en-US": `Description of this entry`,
    },
    width: {
      "en-US": 432,
    },
    height: {
      "en-US": 432,
    },
  };

  const createNewEntry = () => {
    // Create entry
    client
      .getSpace(spaceID)
      .then((space) => space.getEnvironment("master"))
      .then((environment) => environment.createEntry(contentType, { fields }))
      .then((entry) => console.log(entry))
      .catch(console.error);

    // // Update entry
    // client
    //   .getSpace("<space_id>")
    //   .then((space) => space.getEnvironment("<environment-id>"))
    //   .then((environment) => environment.getEntry("<entry_id>"))
    //   .then((entry) => {
    //     entry.fields.title["en-US"] = "New entry title";
    //     return entry.update();
    //   })
    //   .then((entry) => console.log(`Entry ${entry.sys.id} updated.`))
    //   .catch(console.error);
  };

  const uploadTxt = () => {
    const rando = Math.round(Math.random() * 10000);
    const randomNumbers = new Array(10)
      .fill(0)
      .map((_item) => Math.round(Math.random() * 1000))
      .join(" ");

    client
      .getSpace(spaceID)
      .then((space) => space.getEnvironment("master"))
      .then((environment) =>
        environment.createAssetFromFiles({
          fields: {
            title: {
              "en-US": `text file ${rando}`,
            },
            description: {
              "en-US": "Asset description",
            },
            file: {
              "en-US": {
                contentType: "text/plain",
                fileName: `text-file-${rando}.txt`,
                file: randomNumbers,
              },
            },
          },
        })
      )
      .then((asset) => asset.processForAllLocales())
      .then((asset) => asset.publish())
      .then((blah) => console.log("response:", blah))
      .catch(console.error);
  };

  // const uploadSvg = () => {
  //   client.getSpace(spaceID)
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
        .getSpace(spaceID)
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

  const fetchAxiSvgContent = async () => {
    const { items: entries } = await client
      .getSpace(spaceID)
      .then((space) => space.getEnvironment("master"))
      .then((environment) =>
        environment.getEntries({ content_type: "axiSvgData" })
      );

    const { items: assets } = await client
      .getSpace(spaceID)
      .then((space) => space.getEnvironment("master"))
      .then((environment) => environment.getAssets());

    const imageAssetUrls = entries.map(item => {
      const thumbnailID = item.fields.thumbnail['en-US'].sys.id;
      const thumbnailAsset = assets.find(asset => asset.sys.id === thumbnailID);
      const svgID = item.fields.svgFile['en-US'].sys.id;
      const svgAsset = assets.find(asset => asset.sys.id === svgID);
      return ({
        id: item.sys.id,
        urls: {
          thumbnail: `https:${thumbnailAsset.fields.file['en-US'].url}`,
          svg: `https:${svgAsset.fields.file['en-US'].url}`
        },
        fileName: svgAsset?.fields.file['en-US'].fileName,
      });
    });

    console.log('imageAssetUrls', imageAssetUrls);
  };

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
    // client.getSpace(spaceID)
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
        <button onClick={createNewEntry}>create new entry</button>
        <input
          onChange={queueFile}
          type="file"
          id="svgUpload"
          name="svgUpload"
          accept="image/svg+xml"
        />
        <button onClick={uploadSvg} disabled={!fileData}>
          Upload SVG File
        </button>
        <button onClick={uploadTxt}>Upload Text File</button>
        <button onClick={fetchAxiSvgContent}>Fetch Content</button>
      </div>
    </main>
  );
};

export default Uploader;
