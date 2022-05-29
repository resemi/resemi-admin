import { Breadcrumb, Layout } from '@douyinfe/semi-ui';
import { FunctionComponent } from 'react';
import styles from '@/layouts/default/Layout.module.scss';
import PageLoading from '@/layouts/components/PageLoading';
import { Page } from '@/layouts/default/page';
import { PageTransition } from '@/components/PageTransition';

export type MainProps = {};

export const Main: FunctionComponent<MainProps> = ({ children }) => {
  return (
    <Layout.Content className={styles.content}>
      <PageLoading className={styles.loading} />
      <PageTransition>
        <Breadcrumb
          aria-label="breadcrumb"
          className={styles.breadcrumb}
          routes={['首页', '当这个页面标题很长时需要省略', '上一页', '详情页']}
        />
        <Page>{children}</Page>
      </PageTransition>
    </Layout.Content>
  );
};
