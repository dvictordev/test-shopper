export function validateImageBase(imageBase: string): boolean {
  // Expressão regular para verificar o formato Base64
  const base64Regex =
    /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/;
  return base64Regex.test(imageBase);
}
