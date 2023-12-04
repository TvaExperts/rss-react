export async function convertImageToBase64(file: File | undefined) {
  if (!file) return '';
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => {
      const imageData = btoa(event.target?.result?.toString() || '');
      resolve(`data:${file.type};base64,${imageData}`);
    };
  });
}
