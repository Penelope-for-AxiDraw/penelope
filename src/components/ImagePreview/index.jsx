export default function ImagePreview({ thumbnail }) {
  console.log(thumbnail);

  return (
    <div className="image-viewer">
      <img className="image-canv" src={thumbnail.url} alt={thumbnail.fileName} width={thumbnail.width} height={thumbnail.height} />
    </div>
  );
};