import { ReactNode } from 'react';

export type PropsWithOptionalChildren<P = unknown> = P & {
  children?: ReactNode;
};
