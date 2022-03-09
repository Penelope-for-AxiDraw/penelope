import { useState } from 'react';
import Image from 'next/image';

import ModalContainer from "../ModalContainer";

const ImageExplorer = ({ dismiss, entries, handleSelect }) => {
  const [isGridView, setIsGridView] = useState(true);

  return (
    <ModalContainer title="Image Explorer" dismiss={dismiss}>
      {isGridView ? (
        <div className="explorer-grid">
          {/* {listOfImages.map((data, index) => (
            <ImageBlock
              key={data.filename}
              imageData={data}
              handleClick={() => handleSelect(index)}
            />
          ))} */}
          {entries.map((data, index) => (
            <ImageBlock
              key={data.images.thumbnail.id}
              imageData={data}
              handleClick={() => handleSelect(index)}
            />
          ))}
        </div>
      ) : (
        <div>list view goes here</div>
      )}
    </ModalContainer>
  )
};

export default ImageExplorer;

const ImageBlock = ({imageData, handleClick}) => {
  const dim = 192;
  const {width, height} = imageData.images.thumbnail;

  const wd = width >= height ? dim : width / height * dim;
  const ht = height >= width ? dim : height / width * dim;

  return (
    <div className="image-block-cont" onClick={handleClick}>
      <div className="explorer-cell" >
        {/* <img src="https://via.placeholder.com/192x108" /> */}
        <Image src={imageData.images.thumbnail.url} alt="" width={wd} height={ht} />
      </div>
      <p>{imageData.title}</p>
    </div>
  );
};
