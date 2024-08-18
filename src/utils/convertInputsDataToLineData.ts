import { FormDataInputs, LineDataInStore, FormType } from '../types';
import { convertImageToBase64 } from './convertImageToBase64';

export async function convertInputsDataToLineData(
  formData: FormDataInputs,
  formType: FormType
): Promise<LineDataInStore> {
  const { email, name, gender, age, acceptTC, country, password, imageFile } =
    formData;
  const file = imageFile instanceof FileList ? imageFile[0] : imageFile;
  const imageBase64 = await convertImageToBase64(file);

  return {
    email,
    name,
    gender,
    age,
    acceptTC: acceptTC || true,
    country,
    password,
    imageBase64,
    date: new Date().toLocaleString(),
    id: new Date().valueOf(),
    formType,
  };
}
