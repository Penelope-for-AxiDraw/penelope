import Image from "next/image";
import { ImagePaper, ImagePreviewContainer } from "./styles";


export default function ImagePreview({ thumbnail, shade }) {
  return (
    <ImagePreviewContainer>
      <ImagePaper>
        <Image className="image-canv" src={thumbnail.url} alt={thumbnail.fileName} width={thumbnail.width} height={thumbnail.height} />
      </ImagePaper>
    </ImagePreviewContainer>
  );
};