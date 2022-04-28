import { atom, selector } from 'recoil';

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
});

export const userTokenQuery = selector({
  key: 'userTokenQueryKey',
  get: async ({ get }) => {
    const user = get(userState);
    await pause(3000);
    if (!user.token) {
      throw new Error('no token');
    }
    return user.token;
  },
});
