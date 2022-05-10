import { FunctionComponent, useEffect, useState } from 'react';
import { BackTop, Layout } from '@douyinfe/semi-ui';
import { useRouter } from 'next/router';
import styles from './Layout.module.scss';
import { Header } from '@/layouts/default/header';
import { Sidebar } from '@/layouts/default/sidebar';
import { Footer } from '@/layouts/default/footer';
import { Main } from '@/layouts/default/main';

export type BasicLayoutProps = {};

export const BasicLayout: FunctionComponent<BasicLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function handleStart(url) {
      setLoading(url !== router.pathname);
    }
    function handleComplete() {
      setLoading(false);
    }
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, [router]);

  return (
    <Layout className={styles.layout}>
      <Sidebar />
      <Layout>
        <Header />
        <Main loading={loading}>{children}</Main>
        <BackTop />
        <Footer />
      </Layout>
    </Layout>
  );
};
