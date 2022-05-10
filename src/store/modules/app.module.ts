/**
 * app state
 * @author Anguer
 * @description Learn to https://recoiljs.org/zh-hans/docs/api-reference/core/atom
 */
import { atom, selector, useRecoilState, useSetRecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { ThemeMode } from '@/enums/app.enum';

const { persistAtom } = recoilPersist({});

export type AppState = {
  themeMode: ThemeMode;
  isMobile: boolean;
  isSideCollapsed: boolean;
  isSideSheetVisible: boolean;
};

export type AppSelector = {
  isDarkMode: boolean;
  isLightMode: boolean;
};

export const appState = atom<AppState>({
  key: 'appStateKey',
  default: {
    themeMode: ThemeMode.LIGHT,
    isMobile: false,
    isSideCollapsed: false,
    isSideSheetVisible: false,
  },
  effects_UNSTABLE: [persistAtom],
});

export const useAppState = () => useRecoilState(appState);
export const useSetAppState = () => useSetRecoilState(appState);

export const appSelector = selector<AppSelector>({
  key: 'appSelectorKey',
  get: ({ get }) => {
    const app = get(appState);

    return {
      isDarkMode: app.themeMode === ThemeMode.DARK,
      isLightMode: app.themeMode === ThemeMode.LIGHT,
    };
  },
});
