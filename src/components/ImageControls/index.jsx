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

  const {
    filename,
    width,
    height,
    updloadDate,
    description
  } = currentSvgData;
  const widthInch = width / 72;
  const heightInch = height / 72;
  const dateObj = new Date(updloadDate);
  const monthNameShort = dateObj.toLocaleString("en-US", { month: "short" });
  const formattedUploadDate = `${monthNameShort} ${dateObj.getDate()}, ${dateObj.getFullYear()} @ ${dateObj.toLocaleTimeString('en-US')}`;

  return (
    <section>
      <h3 className="mt0">Image Information</h3>
      {/* <select ref={selectRef}>
        {svgList.map((item, j) => {
          return <option key={item.filename} value={j}>{item.filename}</option>
        })}
      </select> */}
      <div>
        <h4>{filename}</h4>
        <p>{width}px × {height}px ({widthInch} in × {heightInch} in)</p>
        <p>Uploaded {formattedUploadDate}</p>
        <p>{description}</p>
      </div>
      <button onClick={initImageSelection}>Get Another Image</button>
    </section>
  );
};