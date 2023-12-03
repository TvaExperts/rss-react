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

export interface FormDataLine {
  name: string;
  age: number;
  email: string;
  password: string;
  passwordConfirm: string;
  acceptTC: boolean;
  gender: string;
  image: string;
  country: string;
  // formType: string;
  // date: string;
}
