import 'windi.css';
import '@/styles/globals.scss';

import { AppProps } from 'next/app';
import { NextPage } from 'next';
import { AppProvider } from '@/provider/app.provider';
import { LayoutAdapter } from '@/layouts';

// Extended component properties
type NextPageWithLayout = NextPage & {};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <AppProvider>
      <LayoutAdapter>
        <Component {...pageProps} />
      </LayoutAdapter>
    </AppProvider>
  );
}
