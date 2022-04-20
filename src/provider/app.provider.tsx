import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { ConfigProvider } from '@douyinfe/semi-ui';
import { IntlProvider } from 'react-intl';
import { messages, Locales } from '@/locales';

import { ThemeMode } from '@/enums/app.enum';

type AppConfig = {
  themeMode: ThemeMode;
  updateThemeMode: (mode: ThemeMode) => void;
  language: Locales;
  updateLanguage: (local: Locales) => void;
};

const defaultAppConfig: AppConfig = {
  themeMode: ThemeMode.LIGHT,
  updateThemeMode: () => {},
  language: Locales.ZH_CN,
  updateLanguage: () => {},
};

const AppContext = createContext<AppConfig>(defaultAppConfig);

/**
 * 切换亮/暗模式
 */
function updateThemeToBody(mode: ThemeMode) {
  const { body } = document;
  body.setAttribute('theme-mode', mode);
  if (mode === ThemeMode.DARK) {
    body.classList.add(ThemeMode.DARK);
  } else {
    body.classList.remove(ThemeMode.DARK);
  }
  // if (body.hasAttribute('theme-mode')) {
  //   body.removeAttribute('theme-mode');
  //   // 以下这行代码，window.setMode仅用于当通过本Demo切换时，通知Semi官网Header记录更新当前模式（只用于演示）。在您的代码里无需存在。
  //   // window.setMode('light');
  // } else {
  //   body.setAttribute('theme-mode', 'dark');
  //   // window.setMode('dark');
  // }
}

export function AppProvider({ children }) {
  const [themeMode, setThemeMode] = useState(defaultAppConfig.themeMode);
  const [language, setLanguage] = useState(defaultAppConfig.language);

  useEffect(() => {
    updateThemeToBody(themeMode);
  }, [themeMode]);

  const context = useMemo(
    () =>
      ({
        themeMode,
        updateThemeMode: (mode) => {
          setThemeMode(mode);
        },
        language,
        updateLanguage: (locale) => {
          setLanguage(locale);
        },
      } as AppConfig),
    [themeMode, language],
  );

  return (
    <AppContext.Provider value={context}>
      <IntlProvider messages={messages[language].app} defaultLocale={Locales.ZH_CN} locale={language}>
        <ConfigProvider locale={messages[language].semi}>{children}</ConfigProvider>
      </IntlProvider>
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  return useContext(AppContext);
};
