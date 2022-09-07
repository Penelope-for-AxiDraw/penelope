import { useContext } from 'react';

import { ClearBtn, Divider, NavSection, PanelSectionHeading } from '../StyledUiCommon/styles';
import { store } from '../../providers/store';
import Image from 'next/image';
import { ImageContainer, InfoContainer } from './styles';
import { BASELINE_DIMENSION } from '../../constants';
import PlotButton from '../PlotButton';

const ImageDetails = ({ goToConnect, title }) => {
  const globalState = useContext(store);
  const { state: { currentEntryIndex, entries, isConnected } } = globalState;
  const entry = entries[currentEntryIndex];
  const { images, uploadDate, description, title: imageTitle } = entry;

  const contentfulPpi = 96;
  const ppi = 72;
  const blankHeightStyle = isConnected ? {} : { height: '8rem' };
  const { width, height } = images.svg;
  const widthPx = width / contentfulPpi * ppi;
  const heightPx = height / contentfulPpi * ppi;
  const widthInch = widthPx / ppi;
  const heightInch = heightPx / ppi;
  const dateObj = new Date(uploadDate);
  const getFormattedUploadDate = (d) => {
    const monthNameShort = dateObj.toLocaleString("en-US", { month: "short" });

    return `${d.getDate()} ${monthNameShort} ${d.getFullYear()} ~ ${d.toLocaleTimeString(
      "en-US",
      { hour: "2-digit", minute: "2-digit" }
    )}`;
  };
  const formattedUploadDate = getFormattedUploadDate(dateObj);

  return (
    <>
      <NavSection>
        <PanelSectionHeading>{title}</PanelSectionHeading>
      </NavSection>

      <NavSection className="main-area">
        <ImageContainer>
          <Image
            src={images.thumbnail.url}
            alt={images.title}
            width={7.5 * BASELINE_DIMENSION}
            height={7.5 * BASELINE_DIMENSION}
          />
        </ImageContainer>
        <InfoContainer>
          <p className="info-label">File Name</p>
          <p>{imageTitle}</p>

          <p className="info-label">Description</p>
          <p>{description ? description : '-'}</p>

          <p className="info-label">Size</p>
          <p>{widthPx}px × {heightPx}px ({widthInch} in × {heightInch} in)</p>

          <p className="info-label">Upload Date</p>
          <p>{formattedUploadDate}</p>
        </InfoContainer>
        <Divider spacing={1.5} />
      </NavSection>

      <NavSection className="info-cta-footer" style={blankHeightStyle}>
        {isConnected ? (
          <PlotButton />
        ) : (
          <p className="blurb">To begin plotting, <ClearBtn onClick={goToConnect}>connect to AxiDraw</ClearBtn>.</p>
        )}
      </NavSection>
    </>
  )
};

export default ImageDetails;
