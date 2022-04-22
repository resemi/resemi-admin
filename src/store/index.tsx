import { useRouter } from 'next/router';
import { RecoilRoot } from 'recoil';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from '@douyinfe/semi-ui';
import { Locales, messages } from '@/locales';

export * from './modules/app.module';

export function AppStoreProvider({ children }) {
  const { locale } = useRouter();

  return (
    <RecoilRoot>
      <IntlProvider locale={locale} messages={messages[locale].app} defaultLocale={Locales.ZH_CN}>
        <ConfigProvider locale={messages[locale].semi}>{children}</ConfigProvider>
      </IntlProvider>
    </RecoilRoot>
  );
}
