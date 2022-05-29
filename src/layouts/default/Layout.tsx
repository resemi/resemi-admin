import { FunctionComponent, useEffect, useState } from 'react';
import { Layout } from '@douyinfe/semi-ui';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import styles from './Layout.module.scss';
import { Header } from '@/layouts/default/header';
import { Sidebar } from '@/layouts/default/sidebar';
import { Footer } from '@/layouts/default/footer';
import { Main } from '@/layouts/default/main';
import useProgress from '@/hooks/web/useProgress';

export type BasicLayoutProps = {};

export const BasicLayout: FunctionComponent<BasicLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const session = useSession();

  useEffect(() => {
    console.log(session);
  }, [session]);

  useProgress(
    (url) => {
      setLoading(url !== router.pathname);
    },
    () => {
      setLoading(false);
    },
  );

  return (
    <Layout className={styles.layout}>
      <Sidebar />
      <Layout>
        <Header />
        <Main loading={loading}>{children}</Main>
        <Footer />
      </Layout>
    </Layout>
  );
};
