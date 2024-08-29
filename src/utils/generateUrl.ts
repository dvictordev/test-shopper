import * as fs from "fs";
import path from "path";
import tmp from "tmp";

export function generateUrl(image: string) {
  // Cria um arquivo temporário na pasta temporária padrão
  const tempFile = tmp.fileSync({ postfix: ".png" });

  // Grava a imagem no arquivo temporário
  fs.writeFileSync(tempFile.name, image, "base64");

  //define o tempo em que o arquivo sera excluido.
  //esta definido para 2 minutos, caso seja desejado mais tempo é necessario alterar.
  setTimeout(() => {
    fs.unlink(tempFile.name, (err) => {
      if (err) {
        console.error(`Erro ao deletar o arquivo: ${err.message}`);
      } else {
        console.log(`Arquivo deletado: ${tempFile.name}`);
      }
    });
  }, 120000); // 120000 milissegundos = 2 minutos

  // Retorna o caminho completo para o arquivo na pasta temporária padrão
  return tempFile.name;
}
