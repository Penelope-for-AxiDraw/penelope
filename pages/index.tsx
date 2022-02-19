import { useState } from 'react';
import { Octokit } from "octokit"; // Remove this from package.json
import type { NextPage } from "next";
// import AxiDrawConnection from "../src/components/Connection";
import AxiDrawControl from "../src/components/AxiDrawControl";
import ImageControls from "../src/components/ImageControls";
import Viewer from "../src/components/Viewer";
import ImageExplorer from "../src/components/ImageExplorer";

const Home: NextPage = () => {
  const defaultPathToSvg =
    "https://gist.githubusercontent.com/computershawn/a9aeb0405015ab2f3737cd1af2af9465/raw/dba2f77b4fc6c06bf85f1f017ac00e877b9d1f1f/triangles-1641524291-plot-layer2.svg";
  const [svgList, setSvgList] = useState(mockSvgList);
  const [pathToSvg, setPathToSvg] = useState(defaultPathToSvg);
  const [svgListIndex, setSvgListIndex] = useState(0);
  const [selectingImage, setSelectingImage] = useState(true);
  // const selectRef = useRef(null);
  // const toki = process.env.NEXT_PUBLIC_GH_TOKEN;

  // Get a list of this user's gists
  // const doGetSvgList = useCallback(async () => {
  //   const octokit = new Octokit({ auth: toki });
  //   const result = await octokit.request("GET /gists");
  //   const fileInfo = result.data.reduce((acc, current) => {
  //     const firstKey = Object.keys(current.files)[0];
  //     const item = current.files[firstKey];
  //     item.type === "image/svg+xml" && acc.push(item);
  //     return acc;
  //   }, []);

  //   fileInfo.length && setSvgList(fileInfo);
  //   console.log(fileInfo);
  // }, [toki]);

  // useEffect(() => {
  //   doGetSvgList();
  // }, [doGetSvgList]);

  // const handleSelectSvg = (e) => {
  //   const url = svgList[e.target.value].raw_url;
  //   setPathToSvg(url);
  // };

  const handleSelectImage = (index: number) => {
    setSvgListIndex(index);
    const url = svgList[index].raw_url;
    setPathToSvg(url);
  }

  const openImageSelectionModal = () => {
    setSelectingImage(true);
  }

  return (
    <main>
      {selectingImage &&
        <ImageExplorer
          dismiss={() => setSelectingImage(false)}
          listOfImages={svgList}
          handleSelect={handleSelectImage}
        />
      }
      <div className="column-left">
        {svgList.length === 0 ? (
          <h4>(╯°□°)╯︵ ┻━┻</h4>
        ) : (
          <>
            {/* <GistUploader token={toki} /> */}
            <ImageControls
              currentSvgData={svgList[svgListIndex]}
              initImageSelection={openImageSelectionModal}
            />
            <AxiDrawControl svgList={svgList} pathToSvg={pathToSvg} />
          </>
        )}
      </div>
      <Viewer svgImageUrl={pathToSvg} />
    </main>
  );
};

export default Home;

const phrases = [
  'Afternoon sunlight streamed in through the window, warming the large room and illuminating the intricate geometric designs on the tabletop.',
  'The woman in the chair looked up from her work, her eyes widening in surprise as she saw the patterns.',
  'She had never seen such intricate and beautiful design before, and she was intrigued.',
  'She set down her pencil and reached for a magnifying glass to see the pattern better.',
  'She gasped as she saw the intricate paths that ran through the paper, the beauty of it.',
  'She could not believe she was able to see it with her own eyes.'
];

const getDescription = () => phrases[Math.floor(Math.random() * phrases.length)];

const mockSvgList = [
  {
      filename: "bezibezi1643786499-plot.svg",
      type: "image/svg+xml",
      language: "SVG",
      raw_url: "https://gist.githubusercontent.com/computershawn/e2c0d36897524afc2dbdf20adc8525b3/raw/2f91dc4b6bfa6ca1a10c6190dbb89ad5e0f2ec55/bezibezi1643786499-plot.svg",
      size: 7795,
      width: 432,
      height: 432,
      updloadDate: 'May 25, 2021 17:36:00',
      description: getDescription(),
  },
  {
      filename: "template_6x6.svg",
      type: "image/svg+xml",
      language: "SVG",
      raw_url: "https://gist.githubusercontent.com/computershawn/f69739d83b88dfed562331fd49d8864c/raw/3f4497cd419ffc01019455582cab355f7c45d8df/template_6x6.svg",
      size: 1689,
      width: 432,
      height: 432,
      updloadDate: 'May 25, 2021 17:36:00',
      description: getDescription(),
  },
  {
      filename: "bezibezi-1643437036-plot-lay2.svg",
      type: "image/svg+xml",
      language: "SVG",
      raw_url: "https://gist.githubusercontent.com/computershawn/a2febc7e0d99bc3092f637b620814a02/raw/3f10cbb9d022ea69bbcedc8e2a16f1c4b9d82992/bezibezi-1643437036-plot-lay2.svg",
      size: 7646,
      width: 432,
      height: 432,
      updloadDate: 'May 25, 2021 17:36:00',
      description: getDescription(),
  },
  {
      filename: "bezibezi-1643437036-plot-lay1.svg",
      type: "image/svg+xml",
      language: "SVG",
      raw_url: "https://gist.githubusercontent.com/computershawn/55145695d5acec30965aa3846e7ee6eb/raw/68aa94a68b7c1be9aca30dcf0856a27b65e549a2/bezibezi-1643437036-plot-lay1.svg",
      size: 7590,
      width: 432,
      height: 432,
      updloadDate: 'May 25, 2021 17:36:00',
      description: getDescription(),
  },
  {
      filename: "triangles-1641524291-plot-layer2.svg",
      type: "image/svg+xml",
      language: "SVG",
      raw_url: "https://gist.githubusercontent.com/computershawn/a9aeb0405015ab2f3737cd1af2af9465/raw/dba2f77b4fc6c06bf85f1f017ac00e877b9d1f1f/triangles-1641524291-plot-layer2.svg",
      size: 253874,
      width: 432,
      height: 432,
      updloadDate: 'May 25, 2021 17:36:00',
      description: getDescription(),
  },
  {
      filename: "pattern-1641792542-plot.svg",
      type: "image/svg+xml",
      language: "SVG",
      raw_url: "https://gist.githubusercontent.com/computershawn/3ec7e41e9b4b11512e88ac90a6e9c2cf/raw/66cefecdbd010b17d943832045c9a366c2a459fe/pattern-1641792542-plot.svg",
      size: 96985,
      width: 432,
      height: 432,
      updloadDate: 'May 25, 2021 17:36:00',
      description: getDescription(),
  },
  {
      filename: "Untitled-3.svg",
      type: "image/svg+xml",
      language: "SVG",
      raw_url: "https://gist.githubusercontent.com/computershawn/f8c1892bbf88a4b70924121f51df58ee/raw/082419bbb13888938dad3e01dff7f70aa0adbc3e/Untitled-3.svg",
      size: 154024,
      width: 432,
      height: 432,
      updloadDate: 'May 25, 2021 17:36:00',
      description: getDescription(),
  },
  {
      filename: "sketch-1627177712.svg",
      type: "image/svg+xml",
      language: "SVG",
      raw_url: "https://gist.githubusercontent.com/computershawn/993cb7ab0b2efa84d2ca744ef119a0f5/raw/f523533d5df60749dfbe357b7916c0cdd3f88406/sketch-1627177712.svg",
      size: 5410,
      width: 432,
      height: 432,
      updloadDate: 'May 25, 2021 17:36:00',
      description: getDescription(),
  }
];