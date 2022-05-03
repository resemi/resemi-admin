import { FunctionComponent } from 'react';
import { Layout } from '@douyinfe/semi-ui';
import styles from './Landing.module.scss';
import { Header } from './header';

export type LandingLayoutProps = {};

export const LandingLayout: FunctionComponent<LandingLayoutProps> = ({ children }) => {
  return (
    <Layout className={styles.layout}>
      <Header />
      <Layout.Content className={styles.content}>
        <div className="flex justify-center items-center h-full">{children}</div>
      </Layout.Content>
      <Layout.Footer className={styles.footer}>Copyright © 2022 Anguer. All Rights Reserved. </Layout.Footer>
    </Layout>
  );
};
