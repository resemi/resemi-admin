import { FunctionComponent, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { BasicLayout as AdminLayout } from '@/layouts/default';
import { LandingLayout } from '@/layouts/landing';
import { isAdmin } from '@/routes';
import { useMounted } from '@/components/ClientOnly';

export type LayoutAdapterProps = {
  children?: ReactNode;
};

export const LayoutAdapter: FunctionComponent<LayoutAdapterProps> = ({ children }) => {
  const { route } = useRouter();
  const hasMounted = useMounted();

  if (!hasMounted) {
    return null;
  }

  const Layout = isAdmin(route) ? AdminLayout : LandingLayout;

  // @ts-ignore
  return <Layout>{children}</Layout>;
};
