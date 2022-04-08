import '@/styles/globals.scss';

import { AppProps } from 'next/app';
import { FunctionComponent } from 'react';
import { NextPage } from 'next';
import { ConfigProvider } from '@douyinfe/semi-ui';
import zh_CN from '@douyinfe/semi-ui/lib/es/locale/source/zh_CN';
// import en_GB from '@douyinfe/semi-ui/lib/es/locale/source/en_GB';

type NextPageWithLayout = NextPage & {
  layout?: FunctionComponent;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({Component, pageProps}: AppPropsWithLayout) {
  const Layout = Component.layout || (({ children }) => <>{children}</>);

  return (
    <ConfigProvider locale={zh_CN}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ConfigProvider>
  );
};
