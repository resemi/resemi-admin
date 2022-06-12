import { useRouter } from 'next/router';
import { FunctionComponent, useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import { IconBell } from '@douyinfe/semi-icons';
import { Avatar, Button, Dropdown } from '@douyinfe/semi-ui';
import ProLayout from '@/components/ProLayout';
import { useAppState } from '@/store';
import { routes, RouteType } from '@/routes';
import { ThemeModeSwitcher } from '@/layouts/components/ThemeModeSwitcher';
import { LocaleSwitcher } from '@/layouts/components/LocaleSwitcher';

export type ProLayoutProps = {};

export const BasicLayout: FunctionComponent<ProLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [defaultSelectedKeys, setSelectedKeys] = useState([]);
  const [appState, setAppState] = useAppState();

  useEffect(() => {
    setSelectedKeys([router.pathname]);
  }, [router.pathname]);

  /**
   * 生成导航菜单项
   * @param __
   * @param parent
   */
  function createNavItems(__: RouteType[], parent?: RouteType) {
    return __?.map((route) => {
      return {
        // itemKey: route.id,
        itemKey: `${(parent && parent.path) || ''}/${route.path}`.replace('//', '/'),
        text: route.name,
        icon: route.icon,
        items: createNavItems(route.children, route),
      };
    });
  }

  /**
   * 切换菜单
   * @param item
   */
  async function onSelectItem(item) {
    await router.push(item.itemKey);
    // console.log('#onSelectItem', item);
    setSelectedKeys(item.selectedKeys);
  }

  function onSideCollapse(value) {
    setAppState((oldValue) => {
      return {
        ...oldValue,
        isSideCollapsed: value,
      };
    });
  }

  function onSideSheetCollapse(value) {
    setAppState((oldValue) => {
      return {
        ...oldValue,
        isSideSheetVisible: value,
      };
    });
  }

  async function onLogout() {
    await signOut({ callbackUrl: '/login' });
  }

  return (
    <ProLayout
      {...appState}
      onSideCollapse={onSideCollapse}
      onSideSheetCollapse={onSideSheetCollapse}
      menu={{ defaultSelectedKeys, items: createNavItems(routes), onSelect: onSelectItem }}
      header={{
        rightContent: (
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
        ),
      }}
    >
      {children}
    </ProLayout>
  );
};
