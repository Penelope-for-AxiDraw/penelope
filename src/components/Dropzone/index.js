import React, { useState, useRef } from 'react';
import Image from 'next/image';

import { SubPrompt, Prompt, DropzoneContainer } from './styles';

const Dropzone = ({
  disabled,
  onFileAdded,
  acceptedTypes,
}) => {
  const [highlight, setHighlight] = useState(false);
  const fileInputRef = useRef(null);
  const accept = acceptedTypes.join(',');

  const openFileDialog = () => {
    if (disabled) return;
    fileInputRef.current.click();
  };

  const handleInputChange = (evt) => {
    if (disabled) return;
    const file = evt.target.files[0];
    if (onFileAdded) {
      onFileAdded(file);
    }
  };

  const onDragOver = (evt) => {
    evt.preventDefault();
    if (disabled) return;
    setHighlight(true);
  };

  const onDragLeave = () => {
    setHighlight(false);
  };

  const onDrop = (event) => {
    event.preventDefault();

    if (disabled) return;

    const file = event.dataTransfer.files[0];
    const fileIsSVG = file.name.substr(-4) === '.svg';
    if (onFileAdded && fileIsSVG) {
      onFileAdded(file);
    } else {
      console.error(`The file you selected (${file.name}) is not an SVG file.`);
      // TODO: Consider adding an error message to the UI
    }

    setHighlight(false);
  };

  const handleKeypress = (evt) => {
    if (evt.key === 'Enter') {
      openFileDialog();
    }
  };

  return (
    <DropzoneContainer
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={openFileDialog}
      role="button"
      tabIndex={0}
      onKeyPress={handleKeypress}
      style={{ cursor: disabled ? 'default' : 'pointer' }}
      highlight={highlight}
    >
      <input
        ref={fileInputRef}
        className="file-input"
        type="file"
        accept={accept}
        onChange={handleInputChange}
      />
      <Prompt>drag &amp; drop an SVG here</Prompt>
      <Image alt="" src="/icn-square.svg" width={120} height={120} />
      <SubPrompt>Or click anywhere in this area to browse your files</SubPrompt>
    </DropzoneContainer>
  );
};

export default Dropzone;
