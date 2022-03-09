export default function Viewer({ thumbnailUrl }) {
  const alt = 'this is a preview';

  return (
    <div className="image-viewer">
      <img className="image-canv" src={thumbnailUrl} alt={alt} />
    </div>
  );
};