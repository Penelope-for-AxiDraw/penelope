export default function ImageControls({ currentSvgData, initImageSelection }) {
  // const sayFileUrl = () => {
  //   const fileUrl = svgList[selectRef.current.value].raw_url;
  //   console.log(fileUrl);
  // };
  // const initImageSelection = () => {
  //   console.log('initiate file modal...');
  // }
  // const handleClick = () => {
  //   initImageSelection();
  // }

  const PTS_PER_INCH = 72;

  const {
    filename,
    width,
    height,
    updloadDate,
    description
  } = currentSvgData;

  const getInches = (dim) => dim % PTS_PER_INCH === 0 ? dim / PTS_PER_INCH : (dim / PTS_PER_INCH).toFixed(1);
  const widthInch = getInches(width);
  const heightInch = getInches(height);
  const dateObj = new Date(updloadDate);
  
  const getFormattedUploadDate = (d) => {
    const monthNameShort = dateObj.toLocaleString("en-US", { month: "short" });
    return `${monthNameShort} ${d.getDate()}, ${d.getFullYear()} @ ${d.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})}`; 
  }
  const formattedUploadDate = getFormattedUploadDate(dateObj);

  return (
    <section>
      <h3 className="mt0">Image Information</h3>
      {/* <select ref={selectRef}>
        {svgList.map((item, j) => {
          return <option key={item.filename} value={j}>{item.filename}</option>
        })}
      </select> */}
      <div className="image-meta-cont">
        <h4>{filename.replace(/\.[^/.]+$/, "")}</h4>
        <p>{width}px × {height}px ({widthInch} in × {heightInch} in)</p>
        <p>Uploaded {formattedUploadDate}</p>
        <p>{description}</p>
      </div>
      <button onClick={initImageSelection}>Get Another Image</button>
    </section>
  );
};