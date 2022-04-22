import 'windi.css';
import '@/styles/globals.scss';

import { AppProps } from 'next/app';
import { NextPage } from 'next';
import { LayoutAdapter } from '@/layouts';
import { AppStoreProvider } from '@/store';

// Extended component properties
type NextPageWithLayout = NextPage & {};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <AppStoreProvider>
      <LayoutAdapter>
        <Component {...pageProps} />
      </LayoutAdapter>
    </AppStoreProvider>
  );
}
