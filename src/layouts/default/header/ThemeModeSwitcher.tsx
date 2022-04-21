import { IconMoon, IconSun } from '@douyinfe/semi-icons';
import { Button } from '@douyinfe/semi-ui';
import { FunctionComponent, useEffect } from 'react';
import { ThemeMode } from '@/enums/app.enum';
import { useAppContext } from '@/provider/app.provider';

export type ThemeModeSwitcherProps = {};

export const ThemeModeSwitcher: FunctionComponent<ThemeModeSwitcherProps> = () => {
  const appContext = useAppContext();

  function isDarkMode() {
    return appContext.themeMode === ThemeMode.DARK;
  }

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
    // } else {
    //   body.setAttribute('theme-mode', 'dark');
    // }
  }

  useEffect(() => {
    updateThemeToBody(appContext.themeMode);
  }, [appContext.themeMode]);

  function onSwitchThemeMode() {
    appContext.updateThemeMode(isDarkMode() ? ThemeMode.LIGHT : ThemeMode.DARK);
  }

  return (
    <Button
      theme="borderless"
      icon={isDarkMode() ? <IconSun size="large" /> : <IconMoon size="large" />}
      style={{
        color: 'var(--semi-color-text-2)',
        marginRight: '12px',
      }}
      onClick={onSwitchThemeMode}
    />
  );
};
