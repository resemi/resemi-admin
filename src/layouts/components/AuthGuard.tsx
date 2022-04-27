import { FunctionComponent, Fragment, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { adminBasePath } from '@/routes';
import { userState } from '@/store';

export type AuthGuardProps = {};

export const AuthGuard: FunctionComponent<AuthGuardProps> = ({ children }) => {
  const { route, replace } = useRouter();
  const user = useRecoilValue(userState);

  useEffect(() => {
    if (route.startsWith(adminBasePath) && !user.token) {
      replace('/login').then();
    }
  });

  return <Fragment key="AuthGuard">{children}</Fragment>;
};
