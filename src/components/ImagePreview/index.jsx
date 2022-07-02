import Image from "next/image";
import { ImagePaper, ImagePreviewContainer } from "./styles";


export default function ImagePreview({ thumbnail }) {
  return (
    <ImagePreviewContainer>
      <ImagePaper style={{ width: thumbnail.width, height: thumbnail.height }}>
        <Image src={thumbnail.url} alt={thumbnail.fileName} width={thumbnail.width} height={thumbnail.height} layout="responsive" priority />
      </ImagePaper>
    </ImagePreviewContainer>
  );
};