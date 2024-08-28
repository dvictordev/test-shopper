import * as fs from "fs";
import path from "path";
import tmp from "tmp";

export function generateUrl(image: string) {
  const tempFile = tmp.fileSync({ postfix: ".png" });
  const imagePath = tempFile.name;

  fs.writeFileSync(imagePath, image, "base64");

  return imagePath;
}
