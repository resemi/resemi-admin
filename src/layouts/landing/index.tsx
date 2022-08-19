import { FunctionComponent } from 'react';
import { IconGithubLogo } from '@douyinfe/semi-icons';
import { Button, Space } from '@douyinfe/semi-ui';
import { useRouter } from 'next/router';
import { ProLayout } from '@/components/ProLayout';
import { ThemeModeSwitcher } from '@/layouts/components/ThemeModeSwitcher';
import { LocaleSwitcher } from '@/layouts/components/LocaleSwitcher';

export type LandingLayoutProps = {};

export const LandingLayout: FunctionComponent<LandingLayoutProps> = ({ children }) => {
  const router = useRouter();

  async function onLogin() {
    await router.push('/login');
  }

  function onGithubClick() {
    window.open('https://github.com/resemi/resemi-admin#readme', '_blank');
  }

  return (
    <ProLayout
      layout="top"
      breadcrumb={false}
      page={false}
      header={{
        rightContent: (
          <Space spacing={12}>
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
          </Space>
        ),
      }}
      logo={{
        href: '/',
        logo: 'https://anguer.com/upload/2020/1/favicon-fdb258cf2c2643c6bfc4ad261b1d9f25.ico',
        text: 'Resemi Admin',
      }}
    >
      {children}
    </ProLayout>
  );
};
