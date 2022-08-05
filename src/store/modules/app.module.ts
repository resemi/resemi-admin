/**
 * app state
 * @author Anguer
 * @description Learn to https://recoiljs.org/zh-hans/docs/api-reference/core/atom
 */
import { atom, selector, useRecoilState, useSetRecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { ThemeMode } from '@/enums/app.enum';
import { getStorageShortName } from '@/utils/env';

const { persistAtom } = recoilPersist({
  key: getStorageShortName('app'),
});

export type AppState = {
  // prefixCls: string;
  themeMode: ThemeMode;
  layout: 'side' | 'top' | 'mix';
  isMobile: boolean;
  isSideCollapsed: boolean;
};

export type AppSelector = {
  isDarkMode: boolean;
  isLightMode: boolean;
};

export const appState = atom<AppState>({
  key: 'appStateKey',
  default: {
    // prefixCls: 'resemi',
    themeMode: ThemeMode.LIGHT,
    layout: 'side',
    isMobile: false,
    isSideCollapsed: false,
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
