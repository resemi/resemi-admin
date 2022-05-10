import { Layout, Nav, SideSheet } from '@douyinfe/semi-ui';
import { useRouter } from 'next/router';
import { FunctionComponent, useEffect, useState } from 'react';
import { routes, RouteType } from '@/routes';
import styles from '@/layouts/default/Layout.module.scss';
import { useAppState } from '@/store';

export type SidebarProps = {};

export const Sidebar: FunctionComponent<SidebarProps> = () => {
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

  function onCollapseChange(value) {
    setAppState((oldValue) => {
      return {
        ...oldValue,
        isSideCollapsed: value,
      };
    });
  }

  function onHideSide() {
    setAppState((oldValue) => {
      return {
        ...oldValue,
        isSideSheetVisible: false,
      };
    });
  }

  function renderSidebar() {
    return (
      <Layout.Sider className={styles.sidebar}>
        <Nav
          defaultSelectedKeys={defaultSelectedKeys}
          className={styles.nav}
          items={createNavItems(routes)}
          isCollapsed={!appState.isMobile && appState.isSideCollapsed}
          onCollapseChange={onCollapseChange}
          header={{
            logo: <img alt="logo" src="//lf1-cdn-tos.bytescm.com/obj/ttfe/ies/semi/webcast_logo.svg" />,
            text: 'NextJS Admin',
            link: '/',
          }}
          footer={
            !appState.isMobile && {
              collapseButton: true,
            }
          }
          onSelect={onSelectItem}
        />
      </Layout.Sider>
    );
  }

  function renderSideSheet() {
    return (
      <SideSheet
        headerStyle={{ display: 'none' }}
        bodyStyle={{ padding: 0 }}
        placement="left"
        closable={false}
        visible={appState.isSideSheetVisible}
        width={styles.sidebarWidth}
        onCancel={onHideSide}
      >
        {renderSidebar()}
      </SideSheet>
    );
  }

  return appState.isMobile ? renderSideSheet() : renderSidebar();
};
