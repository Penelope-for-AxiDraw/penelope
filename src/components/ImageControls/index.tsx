// import Image from 'next/image';
import { useContext } from 'react';
import { store } from '../../../src/providers/store';

export default function ImageControls({
  currentEntry,
  initImageSelection,
  signOut,
}) {
  const globalState = useContext(store);
  const { state: { user } } = globalState;

  const { images, uploadDate, description, title } = currentEntry;

  // const { width: widthPx, height: heightPx } = images.thumbnail;
  const widthPx = images.thumbnail.width;
  const heightPx = images.thumbnail.height;
  const { width: widthInch, height: heightInch } = images.svg;
  const dateObj = new Date(uploadDate);

  const getFormattedUploadDate = (d: Date) => {
    const monthNameShort = dateObj.toLocaleString("en-US", { month: "short" });

    return `${monthNameShort} ${d.getDate()}, ${d.getFullYear()} @ ${d.toLocaleTimeString(
      "en-US",
      { hour: "2-digit", minute: "2-digit" }
    )}`;
  };
  const formattedUploadDate = getFormattedUploadDate(dateObj);

  return (
    <section>
      <h3 className="mt0">Image Information</h3>
      <div className="image-meta-cont">
        {/* <h4>{filename.replace(/\.[^/.]+$/, "")}</h4> */}
        <h4>{title}</h4>
        <p>{description}</p>
        <p>
          {widthPx}px × {heightPx}px ({widthInch} in × {heightInch} in)
        </p>
        <p>Uploaded {formattedUploadDate}</p>
        <p>{user.email}</p>
        {/* <Image src={user.avatarUrl} alt="avatar" width={32} height={32} /> */}
      </div>
      <button onClick={initImageSelection}>Select Another Image</button>
      <button onClick={signOut}>Sign Out</button>
    </section>
  );
}
