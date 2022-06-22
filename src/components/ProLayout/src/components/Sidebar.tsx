import { Layout, Nav, SideSheet } from '@douyinfe/semi-ui';
import { FunctionComponent } from 'react';
import styles from '../Layout.module.scss';
import { useLayoutContext } from '../context';

export type SidebarProps = {};

export const Sidebar: FunctionComponent<SidebarProps> = () => {
  const state = useLayoutContext();

  if (!state.menu) {
    return null;
  }

  function renderSidebar() {
    return (
      <Layout.Sider className={styles.sidebar}>
        <Nav
          defaultSelectedKeys={state.menu.defaultSelectedKeys}
          className={styles.nav}
          items={state.menu.items}
          isCollapsed={!state.isMobile && state.isSideCollapsed}
          onCollapseChange={state.onSideCollapse}
          header={{
            logo: <img alt="logo" src="//lf1-cdn-tos.bytescm.com/obj/ttfe/ies/semi/webcast_logo.svg" />,
            text: 'Resemi Admin',
            link: '/',
          }}
          footer={
            !state.isMobile && {
              collapseButton: true,
            }
          }
          onSelect={state.menu.onSelect}
        />
      </Layout.Sider>
    );
  }

  function onSheetCancel() {
    state.onSideSheetCollapse(false);
  }

  function renderSideSheet() {
    return (
      <SideSheet
        headerStyle={{ display: 'none' }}
        bodyStyle={{ padding: 0 }}
        placement="left"
        closable={false}
        visible={state.isSideSheetVisible}
        width={styles.sidebarWidth}
        onCancel={onSheetCancel}
      >
        {renderSidebar()}
      </SideSheet>
    );
  }

  return state.isMobile ? renderSideSheet() : renderSidebar();
};
