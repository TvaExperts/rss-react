import { ReactNode } from 'react';

export type PropsWithOptionalChildren<P = unknown> = P & {
  children?: ReactNode;
};

export enum FormType {
  uncontrolled,
  reactHook,
}

export enum GendersType {
  male,
  female,
}

export interface FormDataInputs {
  name: string;
  age: number;
  email: string;
  password: string;
  passwordConfirm: string;
  acceptTC?: boolean;
  gender: string;
  country: string;
  imageFile?: FileList | File;
}

export interface FormDataStore {
  name: string;
  age: number;
  email: string;
  password: string;
  acceptTC: boolean;
  gender: string;
  imageBase64: string;
  country: string;
  formType: string;
  date: string;
}
