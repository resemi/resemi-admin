import { FunctionComponent, ReactNode } from 'react';

export type DemoProps = {
  children?: ReactNode;
};

export const Demo: FunctionComponent<DemoProps> = ({ children }) => {
  return <div>{children}</div>;
};
