import { useContext, useState } from 'react';
import Image from 'next/image';

// import ModalContainer from "../ModalContainer";
import { store } from '../../providers/store';
import Uploader from '../Uploader';

const ImageExplorer = ({ dismiss, handleSelect }) => {
  const globalState = useContext(store);
  const { state: { entries } } = globalState;
  const [uploaderIsOpen, setUploaderIsOpen] = useState(false);

  return (
    <>
      <div className="explore-header">
        <h4>Explorer</h4>
        <button onClick={dismiss}>×</button>
      </div>
      {uploaderIsOpen ? (
        <div>
          <Uploader cancel={() => setUploaderIsOpen(false)} />
        </div>
      ) : (
        <div className="explore-grid">
          {entries.map((data, index) => (
            <ImageBlock
              key={data.images.thumbnail.id}
              imageData={data}
              handleClick={() => handleSelect(index)}
            />
          ))}
          <button onClick={() => setUploaderIsOpen(true)}>Upload New</button>
        </div>
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
