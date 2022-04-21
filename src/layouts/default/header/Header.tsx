import { Avatar, Button, Dropdown, Layout, Nav } from '@douyinfe/semi-ui';
import { IconBell, IconGithubLogo } from '@douyinfe/semi-icons';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
import styles from '@/layouts/default/Layout.module.scss';
import { ThemeModeSwitcher } from './ThemeModeSwitcher';
import { LocaleSwitcher } from './LocaleSwitcher';

export type HeaderProps = {};

export const Header: FunctionComponent<HeaderProps> = () => {
  const router = useRouter();

  function onGithubClick() {
    window.open('https://github.com/ghaaaaa/nextjs-admin#readme', '_blank');
  }

  async function onLogout() {
    await router.replace('/login');
  }

  return (
    <Layout.Header className={styles.header}>
      <Nav
        mode="horizontal"
        header={<div>Header</div>}
        footer={
          <>
            <Button
              theme="borderless"
              icon={<IconBell size="large" />}
              style={{
                color: 'var(--semi-color-text-2)',
                marginRight: '12px',
              }}
            />
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
            <Dropdown
              trigger="click"
              position="bottomLeft"
              render={
                <Dropdown.Menu>
                  <Dropdown.Item>账号信息</Dropdown.Item>
                  <Dropdown.Item>设置</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={onLogout}>退出</Dropdown.Item>
                </Dropdown.Menu>
              }
            >
              <Avatar color="orange" size="small">
                YJ
              </Avatar>
            </Dropdown>
          </>
        }
      />
    </Layout.Header>
  );
};
