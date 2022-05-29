import { FunctionComponent, useEffect } from 'react';
import { Layout } from '@douyinfe/semi-ui';
import { useSession } from 'next-auth/react';
import styles from './Layout.module.scss';
import { Header } from '@/layouts/default/header';
import { Sidebar } from '@/layouts/default/sidebar';
import { Footer } from '@/layouts/default/footer';
import { Main } from '@/layouts/default/main';

export type BasicLayoutProps = {};

export const BasicLayout: FunctionComponent<BasicLayoutProps> = ({ children }) => {
  const session = useSession();

  useEffect(() => {
    console.log(session);
  }, [session]);

  return (
    <Layout className={styles.layout}>
      <Sidebar />
      <Layout>
        <Header />
        <Main>{children}</Main>
        <Footer />
      </Layout>
    </Layout>
  );
};
