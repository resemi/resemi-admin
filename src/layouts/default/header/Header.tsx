import { Avatar, Button, Dropdown, Layout, Nav } from '@douyinfe/semi-ui';
import { IconBell, IconSidebar } from '@douyinfe/semi-icons';
import { FunctionComponent } from 'react';
import { signOut } from 'next-auth/react';
import styles from '@/layouts/default/Layout.module.scss';
import { ThemeModeSwitcher } from '@/layouts/components/ThemeModeSwitcher';
import { LocaleSwitcher } from '@/layouts/components/LocaleSwitcher';
import { useAppState } from '@/store';

export type HeaderProps = {};

export const Header: FunctionComponent<HeaderProps> = () => {
  const [appState, setAppState] = useAppState();

  async function onLogout() {
    await signOut({ callbackUrl: '/login' });
  }

  function onShowSide() {
    setAppState((oldValue) => {
      return {
        ...oldValue,
        isSideSheetVisible: true,
      };
    });
  }

  return (
    <Layout.Header className={styles.header}>
      <Nav
        mode="horizontal"
        header={
          appState.isMobile && (
            <Button
              icon={<IconSidebar size="large" />}
              style={{
                color: 'var(--semi-color-text-2)',
              }}
              onClick={onShowSide}
            />
          )
        }
        footer={
          <>
            <Button
              theme="borderless"
              icon={<IconBell size="large" />}
              style={{
                color: 'var(--semi-color-text-2)',
              }}
            />
            <ThemeModeSwitcher />
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
              <Avatar
                color="orange"
                size="small"
                style={{
                  marginLeft: '12px',
                }}
              >
                YJ
              </Avatar>
            </Dropdown>
          </>
        }
      />
    </Layout.Header>
  );
};
