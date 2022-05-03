import { Button, Layout, Nav } from '@douyinfe/semi-ui';
import { IconGithubLogo } from '@douyinfe/semi-icons';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
import styles from '@/layouts/default/Layout.module.scss';
import { ThemeModeSwitcher } from '@/layouts/components/ThemeModeSwitcher';
import { LocaleSwitcher } from '@/layouts/components/LocaleSwitcher';

export type HeaderProps = {};

export const Header: FunctionComponent<HeaderProps> = () => {
  const { push } = useRouter();

  function onGithubClick() {
    window.open('https://github.com/ghaaaaa/nextjs-admin#readme', '_blank');
  }

  async function onLogin() {
    await push('/login');
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
          text: 'NextJS Admin',
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
                marginRight: '12px',
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
