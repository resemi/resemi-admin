import { FunctionComponent, useState } from 'react';
import { BackTop, Layout } from '@douyinfe/semi-ui';
import { useRouter } from 'next/router';
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
        <BackTop />
        <Footer />
      </Layout>
    </Layout>
  );
};
