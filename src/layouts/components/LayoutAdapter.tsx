import { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import { BasicLayout, LandingLayout } from '@/layouts/default';
import { adminBasePath } from '@/routes';
import { AuthGuard } from '@/layouts';

export type LayoutAdapterProps = {};

export const LayoutAdapter: FunctionComponent<LayoutAdapterProps> = ({ children }) => {
  const { route } = useRouter();

  function isAdmin() {
    return route.startsWith(adminBasePath);
  }

  const Layout = isAdmin() ? BasicLayout : LandingLayout;

  return (
    <AuthGuard>
      <Layout>{children}</Layout>
    </AuthGuard>
  );
};
