import { FunctionComponent } from 'react';
import { Layout } from '@douyinfe/semi-ui';
import styles from './Layout.module.scss';
import { Header, Sidebar, Footer, Main } from './components';

export type BasicLayoutProps = {};

export const BasicLayout: FunctionComponent<BasicLayoutProps> = ({ children }) => {
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
