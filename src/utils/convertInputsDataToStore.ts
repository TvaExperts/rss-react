import { FormDataInputs, FormDataStore } from '../types';
import { convertImageToBase64 } from './convert';

export async function convertInputsDataToStore(
  formData: FormDataInputs
): Promise<FormDataStore> {
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
    formType: 'uncontrolled',
  };
}
