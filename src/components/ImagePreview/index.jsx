import Image from "next/image";


export default function ImagePreview({ thumbnail, shade }) {
  return (
    <div className="image-viewer">
      <div className="image-paper">
        <Image className="image-canv" src={thumbnail.url} alt={thumbnail.fileName} width={thumbnail.width} height={thumbnail.height} />
      </div>
    </div>
  );
};