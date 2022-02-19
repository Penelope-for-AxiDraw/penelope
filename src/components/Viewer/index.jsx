export default function Viewer({ svgImageUrl }) {
  const alt = 'this is an SVG';

  return (
    <div className="image-viewer">
      <img className="image-canv" src={svgImageUrl} alt={alt} />
    </div>
  );
};