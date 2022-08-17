import { FunctionComponent } from 'react';

export type DemoProps = {};

export const Demo: FunctionComponent<DemoProps> = ({ children }) => {
  return <div>{children}</div>;
};
