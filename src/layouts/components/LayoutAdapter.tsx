import { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import { BasicLayout as AdminLayout } from '@/layouts/default';
import { LandingLayout } from '@/layouts/landing';
import { isAdmin } from '@/routes';
import { useMounted } from '@/components/ClientOnly';

export type LayoutAdapterProps = {};

export const LayoutAdapter: FunctionComponent<LayoutAdapterProps> = ({ children }) => {
  const { route } = useRouter();
  const hasMounted = useMounted();

  if (!hasMounted) {
    return null;
  }

  const Layout = isAdmin(route) ? AdminLayout : LandingLayout;

  return <Layout>{children}</Layout>;
};
