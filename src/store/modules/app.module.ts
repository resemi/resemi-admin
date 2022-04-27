/**
 * app state
 * @author Anguer
 * @description Learn to https://recoiljs.org/zh-hans/docs/api-reference/core/atom
 */
import { atom, selector } from 'recoil';
import { ThemeMode } from '@/enums/app.enum';

export type AppState = {
  themeMode: ThemeMode;
};

export type AppSelector = {
  isDarkMode: () => boolean;
  isLightMode: () => boolean;
};

export const appState = atom<AppState>({
  key: 'appStateKey',
  default: {
    themeMode: ThemeMode.LIGHT,
  },
});

export const appSelector = selector<AppSelector>({
  key: 'appSelectorKey',
  get: ({ get }) => {
    const app = get(appState);

    function isDarkMode() {
      return app.themeMode === ThemeMode.DARK;
    }

    function isLightMode() {
      return app.themeMode === ThemeMode.LIGHT;
    }

    return {
      isDarkMode,
      isLightMode,
    };
  },
});
