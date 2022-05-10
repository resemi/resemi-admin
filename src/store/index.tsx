import { useRouter } from 'next/router';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from '@douyinfe/semi-ui';
import { useEffect } from 'react';
import { useWindowSize } from 'react-use';
import { Locales, messages } from '@/locale';
import { appState } from './modules/app.module';

export * from './modules/app.module';
export * from './modules/user.module';

export function AppStoreConfigure() {
  const { width } = useWindowSize();
  const setAppState = useSetRecoilState(appState);

  useEffect(() => {
    setAppState((oldValue) => {
      return {
        ...oldValue,
        isMobile: width <= 772,
        isSideCollapsed: width < 1200,
      };
    });
  }, [width, setAppState]);

  return <> </>;
}

export function AppStoreProvider({ children }) {
  const { locale } = useRouter();

  return (
    <RecoilRoot>
      <AppStoreConfigure />
      <IntlProvider locale={locale} messages={messages[locale].app} defaultLocale={Locales.ZH_CN}>
        <ConfigProvider locale={messages[locale].semi}>{children}</ConfigProvider>
      </IntlProvider>
    </RecoilRoot>
  );
}
