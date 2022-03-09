import { useEffect, useState } from 'react';
import { createClient } from 'contentful-management';
import type { NextPage } from "next";
// import AxiDrawConnection from "../src/components/Connection";
import AxiDrawControl from "../src/components/AxiDrawControl";
import ImageControls from "../src/components/ImageControls";
import Viewer from "../src/components/Viewer";
import ImageExplorer from "../src/components/ImageExplorer";

const Home: NextPage = () => {
  const [entries, setEntries] = useState([]);
  // const [pathToSvg, setPathToSvg] = useState('https://gist.githubusercontent.com/computershawn/e2c0d36897524afc2dbdf20adc8525b3/raw/2f91dc4b6bfa6ca1a10c6190dbb89ad5e0f2ec55/bezibezi1643786499-plot.svg');
  const [thumbnailUrl, setThumbnailUrl] = useState('https://gist.githubusercontent.com/computershawn/e2c0d36897524afc2dbdf20adc8525b3/raw/2f91dc4b6bfa6ca1a10c6190dbb89ad5e0f2ec55/bezibezi1643786499-plot.svg');
  const [listIndex, setlistIndex] = useState(0);
  const [selectingImage, setSelectingImage] = useState(false);

  const handleSelectImage = (index: number) => {
    setlistIndex(index);
    // const url = entries[index].images.svg.url;
    // setPathToSvg(url);
    const url = entries[index].images.thumbnail.url;
    setThumbnailUrl(url);
  }

  const openImageSelectionModal = () => {
    setSelectingImage(true);
  }

  const client = createClient({
    // This is the access token for this space. Normally you get the token in the Contentful web app
    accessToken: process.env.NEXT_PUBLIC_PERSONAL_ACCESS_TOKEN || ''
  });

  useEffect(() => {
    if (entries.length) {
      return;
    }
    const spaceID = process.env.NEXT_PUBLIC_SPACE || '';
    const fieldsToGet = ['title', 'description', 'thumbnail', 'svgFile'];
    const fetchData = async () => {
      const { items: entries } = await client
        .getSpace(spaceID)
        .then((space) => space.getEnvironment("master"))
        .then((environment) =>
          environment.getEntries({
            content_type: 'axiSvgData',
            select: fieldsToGet.map(f => `fields.${f}`).join(',')
          })
        );
  
      const { items: assets } = await client
        .getSpace(spaceID)
        .then((space) => space.getEnvironment("master"))
        .then((environment) => environment.getAssets());
  
      const entriesWithImageUrls = entries.map(item => {
        const thumbnailID = item.fields.thumbnail['en-US'].sys.id;
        const thumbnailAsset = assets.find(asset => asset.sys.id === thumbnailID);
        const svgID = item.fields.svgFile['en-US'].sys.id;
        const svgAsset = assets.find(asset => asset.sys.id === svgID);

        return ({
          description: item.fields.description['en-US'],
          title: item.fields.title['en-US'],
          images: {
            thumbnail: {
              id: thumbnailAsset?.sys.id,
              url: `https:${thumbnailAsset.fields.file['en-US'].url}`,
              fileName: thumbnailAsset?.fields.file['en-US'].fileName,
              width: thumbnailAsset?.fields.file['en-US'].details.image.width,
              height: thumbnailAsset?.fields.file['en-US'].details.image.height,
            },
            svg: {
              id: svgAsset?.sys.id,
              url: `https:${svgAsset.fields.file['en-US'].url}`,
              fileName: svgAsset?.fields.file['en-US'].fileName,
              width: svgAsset?.fields.file['en-US'].details.image.width,
              height: svgAsset?.fields.file['en-US'].details.image.height,
            }
          },
          uploadDate: item.sys.publishedAt,
        });
      });

      setEntries(entriesWithImageUrls);
      setThumbnailUrl(entriesWithImageUrls[0].images.thumbnail.url);
    }

    fetchData();
  }, [client, entries]);

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
          <h4>(╯°□°)╯︵ ┻━┻</h4>
        ) : (
          <>
            {entries.length && (<ImageControls
              currentEntry={entries[listIndex]}
              initImageSelection={openImageSelectionModal}
              />)}
            <AxiDrawControl
              currentSvgData={entries[listIndex]}
            />
          </>
        )}
      </div>
      <Viewer thumbnailUrl={thumbnailUrl} />
    </main>
  );
};

export default Home;
