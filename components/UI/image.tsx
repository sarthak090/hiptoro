import { CldImageProps } from "next-cloudinary";
import { CldImage } from "next-cloudinary";

export default function CloudnaryImage(props: CldImageProps) {
  return <CldImage {...props} />;
}
