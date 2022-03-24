import { useContext, useState } from 'react';
import Image from 'next/image';

// import ModalContainer from "../ModalContainer";
import { store } from '../../providers/store';

const ImageExplorer = ({ dismiss, handleSelect }) => {
  const [isGridView, setIsGridView] = useState(true);
  const globalState = useContext(store);
  const { state: { entries } } = globalState;

  return (
    <>
      {isGridView ? (
        <>
          <div className="explore-header">
            <h4>Image Explorer</h4>
            <button onClick={dismiss}>×</button>
          </div>
          <div className="explore-grid">
            {entries.map((data, index) => (
              <ImageBlock
                key={data.images.thumbnail.id}
                imageData={data}
                handleClick={() => handleSelect(index)}
              />
            ))}
          </div>
        </>
      ) : (
        <div>list view goes here</div>
      )}
    </>
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
      <div className="explore-cell" >
        <Image src={imageData.images.thumbnail.url} alt="" width={wd} height={ht} />
      </div>
      <p>{imageData.title}</p>
    </div>
  );
};
