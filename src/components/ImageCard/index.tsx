import { useState } from 'react';
import Image from 'next/image';

import { DeleteButton, DeleteOverlay, ImageCardContainer } from './styles';
import { Button, ClearBtn } from '../StyledUiCommon/styles';

const ImageCard = ({imageData, handleClick, initDelete, isActive}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isBeginDelete, setIsBeginDelete] = useState(false);

  const dim = 176;
  const imageMargin = 8;
  const {width, height} = imageData.images.thumbnail;

  const wd = width >= height ? dim : width / height * dim;
  const ht = height >= width ? dim : height / width * dim;

  const handleDelete = () => {
    initDelete();
    setIsBeginDelete(false);
    setIsDeleting(true);
  }

  const toggleInitDelete = (e, status) => {
    e.stopPropagation();
    setIsBeginDelete(status);
  }

  return (
    <ImageCardContainer onClick={handleClick} isActive={isActive}>
      {isBeginDelete && (
        <DeleteOverlay>
          <span>Delete this image?</span>
          <Button onClick={handleDelete} variant="alternate" wd={9}>Delete</Button>
          <Button onClick={(e) => toggleInitDelete(e, false)} variant="light" wd={9}>Cancel</Button>
        </DeleteOverlay>
      )}
      <div className="image-container" >
        <Image src={imageData.images.thumbnail.url} alt="" width={wd - imageMargin} height={ht - imageMargin} />
      </div>
      {/* <div>
        {isBeginDelete ? (
          <>
            <button onClick={handleDelete}>confirm</button>
            <button onClick={() => setIsBeginDelete(false)}>cancel</button>
          </>
        ) : (
          <button onClick={() => setIsBeginDelete(true)} disabled={isDeleting}>delete</button>
        )}
      </div> */}
      <div className="image-card-footer">
        <p>{imageData.title}</p>
        <DeleteButton onClick={(e) => toggleInitDelete(e, true)} disabled={isDeleting}>
          <Image alt="temp" src={"/fa-trash-can-regular.svg"} width={20} height={20} />
        </DeleteButton>
      </div>
    </ImageCardContainer>
  );
};

export default ImageCard;
