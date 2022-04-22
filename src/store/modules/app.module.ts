import { atom, selector } from 'recoil';

export const appState = atom({
  key: 'appState',
  default: {},
});

export const appSelector = selector({
  key: 'appSelector',
  get: ({ get }) => {
    return get(appState);
  },
});
