import 'windi.css';
import '@/styles/globals.scss';

import { AppProps } from 'next/app';
import { NextPage } from 'next';
import Head from 'next/head';
import { LayoutAdapter } from '@/layouts';
import { AppStoreProvider } from '@/store';
import useAppMeta from '@/hooks/web/useAppMeta';

// Extended component properties
type NextPageWithLayout = NextPage & {
  title?: string;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const { title, description, keywords, author } = useAppMeta(Component.title);

  return (
    <AppStoreProvider>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={description} key="title" />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} key="description" />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="google-site-verification" content="YOuLXmHPeyzodGVVoqnbTLwf_7LXeqxKKlgie8vU88s" />
      </Head>
      <LayoutAdapter>
        <Component {...pageProps} />
      </LayoutAdapter>
    </AppStoreProvider>
  );
}
