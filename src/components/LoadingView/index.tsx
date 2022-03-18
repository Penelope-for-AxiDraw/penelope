import { useEffect } from 'react';
import { createClient } from 'contentful-management';
import { useRouter } from 'next/router';

import Spinner from '../Spinner';
// import { store } from '../../src/providers/store';

const LoadingView = () => {
  const router = useRouter();

  const fetchAxiSvgContent = async (space) => {
    const fieldsToGet = ['title', 'description', 'thumbnail', 'svgFile'];
    const { items: entries } = await space.getEnvironment("master")
      .then((environment) =>
        environment.getEntries({
          content_type: 'axiSvgData',
          select: fieldsToGet.map(f => `fields.${f}`).join(',')
        })
      );

    const { items: assets } = await space.getEnvironment("master")
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
            width: thumbnailAsset?.fields.file['en-US'].details.image.width / 2,
            height: thumbnailAsset?.fields.file['en-US'].details.image.height / 2,
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

    return entriesWithImageUrls;
  }

  const saveToStorage = (data) => {
    window.localStorage.setItem('axiSvgContent', JSON.stringify(data));
  };
  
  useEffect(() => {
    const axiSvgContent = JSON.parse(window.localStorage.getItem('axiSvgContent'));

    const initialize = async () => {
      const credentials = JSON.parse(window.localStorage.getItem("contentfulCreds"));
      const { accessToken, spaceId } = credentials;
      try {
        const client = createClient({ accessToken });
        const space = await client.getSpace(spaceId);

        // 1. Fetch Axi SVG Content
        const data = await fetchAxiSvgContent(space);

        // 2. Save content into local storage
        saveToStorage(data);
        console.log('fetched content and saved to local storage');

        // 3. Go to main app screen
        router.push('/');
      } catch (err) {
        // manageError(err);
        throw err;
      }
    };

    if (axiSvgContent) {
      router.push('/');
    } else {
      initialize();
    }
  }, [router]);

  return (
    <Spinner />
  );
};

export default LoadingView;
