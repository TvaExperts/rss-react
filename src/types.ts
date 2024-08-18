export type FormType = 'controlled' | 'uncontrolled';
export type Gender = 'male' | 'female';

interface UserData {
  name: string;
  age: number;
  email: string;
  password: string;
  acceptTC: boolean;
  gender: Gender;
  country: string;
}

export interface FormDataInputs extends UserData {
  passwordConfirm: string;
  imageFile?: FileList | File;
}

export interface LineDataInStore extends UserData {
  imageBase64: string;
  formType: FormType;
  date: string;
  id: number;
}
