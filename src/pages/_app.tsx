import 'windi.css';
import '@/styles/globals.scss';

import { AppProps } from 'next/app';
import { NextPage } from 'next';
import NProgress from 'nprogress';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';
import { LayoutAdapter } from '@/layouts';
import { AppStoreProvider } from '@/store';
import useProgress from '@/hooks/web/useProgress';

import SEO from '../../next-seo.config.json';

// NProgress configuration
NProgress.configure({ showSpinner: false });

// Extended component properties
type NextPageWithLayout = NextPage & {};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  useProgress(
    () => NProgress.start(),
    () => NProgress.done(),
  );

  return (
    <AppStoreProvider>
      <DefaultSeo {...SEO} />
      <SessionProvider session={pageProps.session} refetchInterval={10}>
        <LayoutAdapter {...pageProps}>
          <Component {...pageProps} />
        </LayoutAdapter>
      </SessionProvider>
    </AppStoreProvider>
  );
}
