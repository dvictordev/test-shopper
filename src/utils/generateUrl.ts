import * as fs from "fs";
import path from "path";
import { fileManager } from "../google";

export async function generateUrl(image: string) {
  const tempDir = path.join(__dirname, "../../", "tmp", "uploads");

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const tempFileName = `temp-file.png`;
  const tempFilePath = path.join(tempDir, tempFileName);

  fs.writeFileSync(tempFilePath, image, "base64");

  const uploadResponse = await fileManager.uploadFile(tempFilePath, {
    mimeType: "image/png",
    displayName: tempFileName,
  });

  // usei a api do google para subir o arquivo que é acessivel com a api_key gemini e gerar uma URL.
  const getFileResponse = await fileManager.getFile(uploadResponse.file.name);

  setTimeout(() => {
    fs.unlink(tempFilePath, (err) => {
      if (err) {
        console.error(`Erro ao deletar o arquivo: ${err.message}`);
      } else {
        console.log(`Arquivo deletado: ${tempFilePath}`);
      }
    });
  }, 60000); // 60000 milissegundos = 1 minuto

  return getFileResponse;
}
