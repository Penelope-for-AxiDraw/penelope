import { useState } from 'react';
// import Image from 'next/image';

import ModalContainer from "../ModalContainer";

const ImageExplorer = ({ dismiss, listOfImages, handleSelect }) => {
  const [isGridView, setIsGridView] = useState(true);

  return (
    <ModalContainer title="Image Explorer" dismiss={dismiss}>
      {isGridView ? (
        <div className="explorer-grid">
          {listOfImages.map((data, index) => (
            <div
              key={data.filenam + " " + index}
              onClick={() => handleSelect(index)}
              className="explorer-cell"
            >
              <img src="https://via.placeholder.com/160x120" />
            </div>
          ))}
        </div>
      ) : (
        <div>list view goes here</div>
      )}
    </ModalContainer>
  )
};

export default ImageExplorer;
