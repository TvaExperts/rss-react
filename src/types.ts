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

export enum Countries {
  Argentina,
  Usa,
  Chile,
}

export interface FormDataLine {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: GendersType;
  picture: string;
  country: Countries;
  formType: FormType;
  date: string;
}
