import { Breadcrumb, Layout } from '@douyinfe/semi-ui';
import { FunctionComponent } from 'react';
import styles from '../Layout.module.scss';
import PageLoading from './PageLoading';
import { Page } from './Page';

export type MainProps = {};

export const Main: FunctionComponent<MainProps> = ({ children }) => {
  return (
    <Layout.Content className={styles.content}>
      <PageLoading className={styles.loading} />
      <Breadcrumb
        aria-label="breadcrumb"
        className={styles.breadcrumb}
        routes={['首页', '当这个页面标题很长时需要省略', '上一页', '详情页']}
      />
      <Page>{children}</Page>
    </Layout.Content>
  );
};
