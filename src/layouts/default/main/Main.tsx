import { Breadcrumb, Layout } from '@douyinfe/semi-ui';
import { FunctionComponent } from 'react';
import styles from '@/layouts/default/Layout.module.scss';
import Loading from '@/layouts/default/Loading';
import { Page } from '@/layouts/default/page';

export type MainProps = {
  loading: boolean;
};

export const Main: FunctionComponent<MainProps> = ({ children, loading }) => {
  return (
    <Layout.Content className={styles.content}>
      <Loading loading={loading} />
      <Breadcrumb
        aria-label="breadcrumb"
        className={styles.breadcrumb}
        routes={['首页', '当这个页面标题很长时需要省略', '上一页', '详情页']}
      />
      <Page>{children}</Page>
    </Layout.Content>
  );
};
