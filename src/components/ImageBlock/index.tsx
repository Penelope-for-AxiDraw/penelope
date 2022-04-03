import { useState } from 'react';
import Image from 'next/image';

const ImageBlock = ({imageData, handleClick, initDelete}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isBeginDelete, setIsBeginDelete] = useState(false);

  const dim = 192;
  const {width, height} = imageData.images.thumbnail;

  const wd = width >= height ? dim : width / height * dim;
  const ht = height >= width ? dim : height / width * dim;

  const handleDelete = () => {
    initDelete();
    setIsBeginDelete(false);
    setIsDeleting(true);
  }

  return (
    <div className="image-block-cont" onClick={handleClick}>
      <div className="explore-cell" >
        <Image src={imageData.images.thumbnail.url} alt="" width={wd} height={ht} />
      </div>
      <div>
        {isBeginDelete ? (
          <>
            <button onClick={handleDelete}>confirm</button>
            <button onClick={() => setIsBeginDelete(false)}>cancel</button>
          </>
        ) : (
          <button onClick={() => setIsBeginDelete(true)} disabled={isDeleting}>delete</button>
        )}
      </div>
      <p>{imageData.title}</p>
    </div>
  );
};

export default ImageBlock;
