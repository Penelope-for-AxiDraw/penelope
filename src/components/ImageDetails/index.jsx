import { useContext } from 'react';
import { Divider, IconButton, NavSection, PanelSectionHeading } from '../StyledUiCommon/styles';
import { store } from '../../providers/store';
import { PlugIcon } from '../Icons';
import Image from 'next/image';
import { InfoContainer } from './styles';
import { plot } from '../../utils';

const ImageDetails = ({ title }) => {
  const globalState = useContext(store);
  const { state: { axiConnection, currentEntryIndex, entries, isConnected } } = globalState;
  const entry = entries[currentEntryIndex];
  const { images, uploadDate, description, title: imageTitle } = entry;

  const blankHeightStyle = isConnected ? {} : { height: '8rem' };
  const { width: widthInch, height: heightInch } = images.svg;
  const ppi = 72;
  const widthPx = widthInch * ppi;
  const heightPx = heightInch * ppi;
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
        <div>
          <Image
            src={images.thumbnail.url}
            alt={images.title}
            width={96}
            height={96}
          />
        </div>
        <InfoContainer>
          <p className="info-label">File Name</p>
          <p>{imageTitle}</p>

          <p className="info-label">Description</p>
          <p>{description}</p>

          <p className="info-label">Size</p>
          <p>{widthPx}px × {heightPx}px ({widthInch} in × {heightInch} in)</p>

          <p className="info-label">Upload Date</p>
          <p>{formattedUploadDate}</p>
        </InfoContainer>
        <Divider spacing={1.5} />
      </NavSection>

      <NavSection style={blankHeightStyle}>
        {isConnected && (
          <IconButton className="cta" variant="alternate" onClick={() => plot(entries[currentEntryIndex], axiConnection)} wide>
            <PlugIcon width={24} height={24} fill='#fff' />
            <span>Plot It!</span>
          </IconButton>
        )}
      </NavSection>
    </>
  )
};

export default ImageDetails;
