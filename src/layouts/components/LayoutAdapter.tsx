import { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import { BasicLayout as AdminLayout } from '@/layouts/default';
import { LandingLayout } from '@/layouts/landing';
import { adminBasePath } from '@/routes';
import { AuthGuard } from '@/components/AuthGuard';
import { useHasMounted } from '@/components/ClientOnly';

export type LayoutAdapterProps = {};

export const LayoutAdapter: FunctionComponent<LayoutAdapterProps> = ({ children }) => {
  const { route } = useRouter();
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return null;
  }

  function isAdmin() {
    return route.startsWith(adminBasePath);
  }

  const Layout = isAdmin()
    ? ({ children: child }) => (
        <AuthGuard>
          <AdminLayout>{child}</AdminLayout>
        </AuthGuard>
      )
    : LandingLayout;

  return <Layout>{children}</Layout>;
};
