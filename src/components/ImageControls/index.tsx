import Image from 'next/image';
import { useContext } from 'react';
import { store } from '../../../src/providers/store';
import { Button, ImageMetaInfoCont, PanelInfoIcon, PanelSectionHeading } from '../StyledUiCommon/styles';

export default function ImageControls({
  currentEntry,
  initImageSelection,
  selectingImage,
  signOut,
}) {
  const globalState = useContext(store);
  const { state: { entries, user } } = globalState;

  const { images, uploadDate, description, title } = currentEntry;

  // const { width: widthPx, height: heightPx } = images.thumbnail;
  const widthPx = images.thumbnail.width;
  const heightPx = images.thumbnail.height;
  const { width: widthInch, height: heightInch } = images.svg;
  const dateObj = new Date(uploadDate);

  const getFormattedUploadDate = (d: Date) => {
    const monthNameShort = dateObj.toLocaleString("en-US", { month: "short" });

    return `${d.getDate()} ${monthNameShort} ${d.getFullYear()} ~ ${d.toLocaleTimeString(
      "en-US",
      { hour: "2-digit", minute: "2-digit" }
    )}`;
  };
  const formattedUploadDate = getFormattedUploadDate(dateObj);

  const ImageMetaInfo = () => {
  };

  return (
    <section>
      <PanelSectionHeading>Project</PanelSectionHeading>
      <PanelInfoIcon>
        <div>
          <Image alt="temp" src={"/icn-square.svg"} width={24} height={24} />
          {/* <Image alt="temp" src={user.avatarUrl} width={24} height={24} /> */}
          <span>{user.email}</span>
        </div>
        <div onClick={signOut}>×</div>
      </PanelInfoIcon>
      <ImageMetaInfoCont>
        {/* <Image alt="temp" src="/icn-square.svg" width={48} height={48} /> */}
        <Image alt="temp" src={entries[0].images.thumbnail.url} width={60} height={60} />
        <div className="specs">
          <p>{title}</p>
          <p>
            {widthPx}px × {heightPx}px ({widthInch} in × {heightInch} in)
          </p>
          <p>{formattedUploadDate}</p>
          <div><p className="description">{description}</p></div>
        </div>
      </ImageMetaInfoCont>
      {/* <button onClick={initImageSelection} disabled={selectingImage}>Load Another Project</button> */}
      <Button onClick={initImageSelection} disabled={selectingImage} wide>SVG Explorer</Button>
      <small style={{ color: 'var(--alert)' }}>make this a text-only/outline/icon button?</small>
      {/* <button onClick={signOut}>Sign Out</button> */}
    </section>
  );
}
