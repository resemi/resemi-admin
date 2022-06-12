import { FunctionComponent, useMemo } from 'react';
import { LayoutContextValue, LayoutContext } from './context';
import { BasicLayout } from './Layout';

export interface LayoutProviderProps extends LayoutContextValue {}

export const LayoutProvider: FunctionComponent<LayoutProviderProps> = ({ children, ...props }) => {
  const value = useMemo(() => ({ ...props }), [props]);
  return (
    <LayoutContext.Provider value={value}>
      <BasicLayout>{children}</BasicLayout>
    </LayoutContext.Provider>
  );
};
