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
  key: 'appState',
  default: {
    themeMode: ThemeMode.LIGHT,
  },
});

export const appSelector = selector<AppSelector>({
  key: 'appSelector',
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
