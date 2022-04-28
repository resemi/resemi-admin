import { atom } from 'recoil';

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
