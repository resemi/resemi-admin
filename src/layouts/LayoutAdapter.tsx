import { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import { BasicLayout, LandingLayout } from '@/layouts/default';
import { adminBasePath } from '@/routes';

export type LayoutAdapterProps = {};

export const LayoutAdapter: FunctionComponent<LayoutAdapterProps> = ({ children }) => {
  const { route } = useRouter();

  function isAdmin() {
    return route.startsWith(adminBasePath);
  }

  if (isAdmin()) {
    return <BasicLayout>{children}</BasicLayout>;
  }
  return <LandingLayout>{children}</LandingLayout>;
};
