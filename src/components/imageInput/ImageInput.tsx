import React, { forwardRef } from 'react';

type ImageInputProps = {
  setImageData: (imageData: string) => void;
};

function isImage(fileType: string) {
  return fileType.includes('jpeg') || fileType.includes('png');
}

async function convertFileToBase64(file: File) {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => {
      const imageData = btoa(event.target?.result?.toString() || '');
      resolve(imageData);
    };
  });
}

const ImageInput = forwardRef<HTMLInputElement, ImageInputProps>(
  ({ setImageData }, ref) => {
    async function onChange(event: React.ChangeEvent<HTMLInputElement>) {
      if (!event.target.files) {
        console.log('No files!');
        // eslint-disable-next-line no-param-reassign
        event.target.value = '';
        return;
      }
      const file = event.target?.files[0];
      if (!isImage(file.type)) {
        console.log('Bad image!');
        // eslint-disable-next-line no-param-reassign
        event.target.value = '';
        return;
      }
      if (file.size > 1000000) {
        console.log('Big size!');
        // eslint-disable-next-line no-param-reassign
        event.target.value = '';
        return;
      }

      const imageData = await convertFileToBase64(file);
      const fullData = `data:${file.type};base64,${imageData}`;
      setImageData(fullData);
    }

    return (
      <label htmlFor="image">
        Image:
        <input
          type="file"
          onChange={onChange}
          id="image"
          name="image"
          accept=".png, .jpg"
          ref={ref}
        />
      </label>
    );
  }
);

export default ImageInput;
