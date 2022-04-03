import React, { useState, useRef } from 'react';
import Image from 'next/image';

import { SubPrompt, Prompt } from './styles';

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
  
  const uploadIconUrl = '/icn-upload.svg';

  return (
    <>
      <div
        className={`dropzone ${highlight ? 'highlight' : ''}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={openFileDialog}
        role="button"
        tabIndex={0}
        onKeyPress={handleKeypress}
        style={{ cursor: disabled ? 'default' : 'pointer' }}
      >
        <input
          ref={fileInputRef}
          className="file-input"
          type="file"
          accept={accept}
          onChange={handleInputChange}
        />
        <Image alt="cloud upload icon" src={uploadIconUrl} width={48} height={48} />
        <Prompt>Drag &amp; drop your SVG file</Prompt>
        <SubPrompt>or just click here to select a file</SubPrompt>
      </div>
    </>
  );
};

export default Dropzone;
