import { FunctionComponent } from 'react';
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

  return (
    <ProLayout
      layout="top"
      breadcrumb={false}
      page={false}
      header={{
        rightContent: (
          <Space spacing={12}>
            <ThemeModeSwitcher />
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
