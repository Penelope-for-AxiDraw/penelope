// Load Axi SVG content from Contentful
  const fetchAxiSvgContent = async (space) => {
    const fieldsToGet = ['title', 'description', 'thumbnail', 'svgFile'];
    const { items: entries } = await space.getEnvironment("master")
      .then((environment) =>
        environment.getEntries({
          content_type: 'axiSvgData',
          select: fieldsToGet.map(f => `fields.${f}`).join(',')
        })
      );
    
    const publishedEntries = entries.filter(item => item.isPublished());
    const { items: assets } = await space.getEnvironment("master")
      .then((environment) => environment.getAssets());
    // TODO: Add some error handling for the above API calls

    const entriesWithImageUrls = publishedEntries.filter((item) => {
      // console.log(item);
      // return true;
      return item.fields.hasOwnProperty('svgFile') && item.fields.hasOwnProperty('thumbnail');
    }).map((item) => {
      const thumbnailID = item.fields.thumbnail["en-US"].sys.id;
      const thumbnailAsset = assets.find(
        (asset) => asset.sys.id === thumbnailID
      );
      const svgID = item.fields.svgFile["en-US"].sys.id;
      const svgAsset = assets.find((asset) => asset.sys.id === svgID);

      return {
        id: item.sys.id,
        description: item.fields.description["en-US"],
        title: item.fields.title["en-US"],
        images: {
          thumbnail: {
            id: thumbnailAsset?.sys.id,
            url: `https:${thumbnailAsset.fields.file["en-US"].url}`,
            fileName: thumbnailAsset?.fields.file["en-US"].fileName,
            width: thumbnailAsset?.fields.file["en-US"].details.image.width / 2,
            height:
              thumbnailAsset?.fields.file["en-US"].details.image.height / 2,
          },
          svg: {
            id: svgAsset?.sys.id,
            url: `https:${svgAsset.fields.file["en-US"].url}`,
            fileName: svgAsset?.fields.file["en-US"].fileName,
            width: svgAsset?.fields.file["en-US"].details.image.width,
            height: svgAsset?.fields.file["en-US"].details.image.height,
          },
        },
        uploadDate: item.sys.publishedAt,
      };
    });

    return entriesWithImageUrls;
  }

  export default fetchAxiSvgContent;
