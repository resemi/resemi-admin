import { Layout, Nav, SideSheet } from '@douyinfe/semi-ui';
import { FunctionComponent } from 'react';
import css from 'styled-jsx/css';
import stylesModule from '../Layout.module.scss';
import { useLayoutContext } from '../context';

export type SidebarProps = {
  showLogo: boolean;
  top?: number;
};

export const Sidebar: FunctionComponent<SidebarProps> = ({ showLogo, top = 0 }) => {
  const state = useLayoutContext();

  if (!state.menu) {
    return null;
  }

  const { className, styles } = css.resolve`
    .${state.prefixCls}-layout-sidebar {
      position: fixed;
      margin-top: 0;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 1000;
      background-color: var(--semi-color-bg-1);
      transition: width 200ms cubic-bezier(0.62, 0.05, 0.36, 0.95);
      margin-top: ${top}px;
      height: calc(100vh - ${top}px);
    }
    .${state.prefixCls}-layout-sidebar-inner {
      height: 100%;
    }
    .${state.prefixCls}-layout-navigation {
      height: 100%;
      max-width: ${stylesModule.sidebarWidth};
    }
  `;

  function renderSidebar() {
    return (
      <div className={`${state.prefixCls}-layout-sidebar ${className}`}>
        <Layout.Sider className={`${state.prefixCls}-layout-sidebar-inner ${className}`}>
          {styles}
          <Nav
            defaultSelectedKeys={state.menu.defaultSelectedKeys}
            className={`${state.prefixCls}-layout-navigation ${className}`}
            items={state.menu.items}
            isCollapsed={!state.isMobile && state.isSideCollapsed}
            onCollapseChange={state.onSideCollapse}
            header={
              showLogo && {
                children: state.logo,
                style: { paddingTop: 0, paddingBottom: 0, height: '60px' },
              }
            }
            footer={
              !state.isMobile && {
                collapseButton: true,
              }
            }
            onSelect={state.menu.onSelect}
          />
        </Layout.Sider>
      </div>
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
        width={stylesModule.sidebarWidth}
        onCancel={onSheetCancel}
      >
        {renderSidebar()}
      </SideSheet>
    );
  }

  return state.isMobile ? renderSideSheet() : renderSidebar();
};
