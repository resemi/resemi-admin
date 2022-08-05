import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { getStorageShortName } from '@/utils/env';

const { persistAtom } = recoilPersist({
  key: getStorageShortName('user'),
});

const pause = (millis) =>
  new Promise((resolve) => {
    setTimeout(resolve, millis);
  });

export type UserState = {
  id: string;
  token: string;
};

export const userState = atom<UserState>({
  key: 'userStateKey',
  default: {
    id: '',
    token: '',
  },
  effects_UNSTABLE: [persistAtom],
});

export const userTokenQuery = selector({
  key: 'userTokenQueryKey',
  get: async ({ get }) => {
    const user = get(userState);
    await pause(2000);
    if (!user.token) {
      throw new Error('no token');
    }
    return user.token;
  },
});
