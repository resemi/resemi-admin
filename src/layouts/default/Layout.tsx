import { FunctionComponent, useEffect, useState } from 'react';
import { Layout } from '@douyinfe/semi-ui';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from './Layout.module.scss';
import { Header } from '@/layouts/default/header';
import { Sidebar } from '@/layouts/default/sidebar';
import { Footer } from '@/layouts/default/footer';
import { Main } from '@/layouts/default/main';

export type BasicLayoutProps = {
  title?: string;
};

export const BasicLayout: FunctionComponent<BasicLayoutProps> = ({ children, ...props }) => {
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
      {props.title && (
        <Head>
          <title>{props.title}</title>
        </Head>
      )}
      <Sidebar />
      <Layout>
        <Header />
        <Main loading={loading}>{children}</Main>
        <Footer />
      </Layout>
    </Layout>
  );
};

export type LandingLayoutProps = {};

export const LandingLayout: FunctionComponent<LandingLayoutProps> = ({ children }) => {
  return <div className="flex justify-center items-center h-full">{children}</div>;
};
