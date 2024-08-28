export function fileToGenerativePart(path: string, mimeType: string) {
  return {
    inlineData: {
      data: path,
      mimeType,
    },
  };
}
