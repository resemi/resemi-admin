import { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import { BasicLayout as AdminLayout } from '@/layouts/default';
import { LandingLayout } from '@/layouts/landing';
import { adminBasePath } from '@/routes';
import { useMounted } from '@/components/ClientOnly';

export type LayoutAdapterProps = {};

export const LayoutAdapter: FunctionComponent<LayoutAdapterProps> = ({ children }) => {
  const { route } = useRouter();
  const hasMounted = useMounted();

  if (!hasMounted) {
    return null;
  }

  function isAdmin() {
    return route.startsWith(adminBasePath);
  }

  const Layout = isAdmin() ? AdminLayout : LandingLayout;

  return <Layout>{children}</Layout>;
};
