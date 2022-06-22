import { Button, Layout, Nav } from '@douyinfe/semi-ui';
import { IconGithubLogo } from '@douyinfe/semi-icons';
import { FunctionComponent } from 'react';
import { signIn } from 'next-auth/react';
import styles from '../Landing.module.scss';
import { ThemeModeSwitcher } from '@/layouts/components/ThemeModeSwitcher';
import { LocaleSwitcher } from '@/layouts/components/LocaleSwitcher';
import { PageEnum } from '@/enums/app.enum';

export type HeaderProps = {};

export const Header: FunctionComponent<HeaderProps> = () => {
  function onGithubClick() {
    window.open('https://github.com/resemi/resemi-admin#readme', '_blank');
  }

  async function onLogin() {
    await signIn('', { callbackUrl: PageEnum.Admin });
  }

  return (
    <Layout.Header className={styles.header}>
      <Nav
        mode="horizontal"
        header={{
          logo: (
            <img
              alt="Logo"
              src="https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/webcast_logo.svg"
            />
          ),
          text: 'Resemi Admin',
          link: '/',
        }}
        footer={
          <>
            <ThemeModeSwitcher />
            <Button
              theme="borderless"
              icon={<IconGithubLogo size="large" />}
              style={{
                color: 'var(--semi-color-text-2)',
              }}
              onClick={onGithubClick}
            />
            <LocaleSwitcher />
            <Button theme="solid" type="primary" onClick={onLogin}>
              Login
            </Button>
          </>
        }
      />
    </Layout.Header>
  );
};
