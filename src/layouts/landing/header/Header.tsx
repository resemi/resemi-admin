import { Button, Layout, Nav } from '@douyinfe/semi-ui';
import { IconGithubLogo } from '@douyinfe/semi-icons';
import { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import styles from '../Landing.module.scss';
import { ThemeModeSwitcher } from '@/layouts/components/ThemeModeSwitcher';
import { LocaleSwitcher } from '@/layouts/components/LocaleSwitcher';
import { Logo } from '@/components/ProLayout/src/components/Logo';

export type HeaderProps = {};

export const Header: FunctionComponent<HeaderProps> = () => {
  const router = useRouter();

  function onGithubClick() {
    window.open('https://github.com/resemi/resemi-admin#readme', '_blank');
  }

  async function onLogin() {
    await router.push('/login');
  }

  return (
    <Layout.Header className={styles.header}>
      <Nav
        mode="horizontal"
        header={
          <Logo
            href="/"
            logo="https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/webcast_logo.svg"
            text="Resemi Admin"
          />
        }
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
