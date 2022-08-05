import { FunctionComponent, useMemo } from 'react';
import { LayoutContextValue, LayoutContext, useLayoutContext } from './context';
import { BasicLayout } from './Layout';

export interface LayoutProviderProps extends LayoutContextValue {}

export const LayoutProvider: FunctionComponent<LayoutProviderProps> = ({ children, ...props }) => {
  const oldValue = useLayoutContext();
  const value = useMemo(() => ({ ...oldValue, ...props }), [oldValue, props]);

  return (
    <LayoutContext.Provider value={value}>
      <BasicLayout>{children}</BasicLayout>
    </LayoutContext.Provider>
  );
};
