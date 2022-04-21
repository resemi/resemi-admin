import { createContext, useContext, useMemo, useState } from 'react';

import { ConfigProvider } from '@douyinfe/semi-ui';
import { IntlProvider } from 'react-intl';
import { useRouter } from 'next/router';
import { messages, Locales } from '@/locales';

import { ThemeMode } from '@/enums/app.enum';

type AppConfig = {
  themeMode: ThemeMode;
  updateThemeMode: (mode: ThemeMode) => void;
};

const defaultAppConfig: AppConfig = {
  themeMode: ThemeMode.LIGHT,
  updateThemeMode: () => {},
};

const AppContext = createContext<AppConfig>(defaultAppConfig);

export function AppProvider({ children }) {
  const [themeMode, setThemeMode] = useState(defaultAppConfig.themeMode);
  const { locale } = useRouter();

  const context = useMemo(
    () =>
      ({
        themeMode,
        updateThemeMode: (mode) => {
          setThemeMode(mode);
        },
      } as AppConfig),
    [themeMode],
  );

  return (
    <AppContext.Provider value={context}>
      <IntlProvider locale={locale} messages={messages[locale].app} defaultLocale={Locales.ZH_CN}>
        <ConfigProvider locale={messages[locale].semi}>{children}</ConfigProvider>
      </IntlProvider>
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  return useContext(AppContext);
};
