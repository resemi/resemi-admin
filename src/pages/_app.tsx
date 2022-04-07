import '@/styles/globals.scss';

import { AppProps } from 'next/app';
import { FunctionComponent } from 'react';
import { NextPage } from 'next';

type NextPageWithLayout = NextPage & {
  layout?: FunctionComponent
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({Component, pageProps}: AppPropsWithLayout) {
  const Layout = Component.layout || (({ children }) => <>{children}</>);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
