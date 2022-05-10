import { IconMoon, IconSun } from '@douyinfe/semi-icons';
import { Button } from '@douyinfe/semi-ui';
import { FunctionComponent, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ThemeMode } from '@/enums/app.enum';
import { appSelector, appState } from '@/store';

export type ThemeModeSwitcherProps = {};

export const ThemeModeSwitcher: FunctionComponent<ThemeModeSwitcherProps> = () => {
  const [state, setState] = useRecoilState(appState);
  const selector = useRecoilValue(appSelector);

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
    updateThemeToBody(state.themeMode);
  }, [state.themeMode]);

  function onSwitchThemeMode() {
    setState((oldState) => {
      return {
        ...oldState,
        themeMode: selector.isDarkMode ? ThemeMode.LIGHT : ThemeMode.DARK,
      };
    });
  }

  return (
    <Button
      theme="borderless"
      icon={selector.isDarkMode ? <IconSun size="large" /> : <IconMoon size="large" />}
      style={{
        color: 'var(--semi-color-text-2)',
      }}
      onClick={onSwitchThemeMode}
    />
  );
};
