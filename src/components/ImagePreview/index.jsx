import TurbineSpinner from "../TurbineSpinner";

export default function ImagePreview({ thumbnail, shade }) {
  return (
    <div className="image-viewer">
      {shade && <div className="shade-overlay"></div>}
      <img className="image-canv" src={thumbnail.url} alt={thumbnail.fileName} width={thumbnail.width} height={thumbnail.height} />
    </div>
  );
};