import { FunctionComponent, useMemo } from 'react';
import { LayoutContextValue, LayoutContext, useLayoutContext } from './context';
import { BasicLayout } from './Layout';

export interface LayoutProviderProps extends LayoutContextValue {}

export const LayoutProvider: FunctionComponent<LayoutProviderProps> = ({
  children,
  header,
  footer,
  sidebar,
  ...props
}) => {
  const oldValue = useLayoutContext();
  const value = useMemo(() => {
    return {
      ...oldValue,
      ...props,
      header: { ...oldValue.header, ...header },
      footer: { ...oldValue.footer, ...footer },
      sidebar: { ...oldValue.sidebar, ...sidebar },
    };
  }, [footer, header, oldValue, props, sidebar]);

  return (
    <LayoutContext.Provider value={value}>
      <BasicLayout>{children}</BasicLayout>
    </LayoutContext.Provider>
  );
};
