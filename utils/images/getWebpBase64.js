import axios from "axios";
import sharp from "sharp";

export async function getWebpBase64(imageSrc = "") {
  if (imageSrc == "") {
    return;
  }
  const response = await axios.get(imageSrc, { responseType: "arraybuffer" });
  const imageData = response.data;
  const optimizedImage = await sharp(imageData)
    .avif({ quality: 80 })

    .toBuffer();
  const base64Image = Buffer.from(optimizedImage).toString("base64");
  const dataURI = `data:image/webp;base64,${base64Image}`;

  return dataURI;
}
