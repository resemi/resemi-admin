import { FunctionComponent, useEffect, useState } from 'react';

import { Avatar, Breadcrumb, Button, Dropdown, Layout, Nav } from '@douyinfe/semi-ui';
import { IconBell, IconGithubLogo, IconLanguage, IconMoon, IconSun } from '@douyinfe/semi-icons';

import { useRouter } from 'next/router';
import Head from 'next/head';
import { routes, RouteType } from '@/routes';
import { useAppContext } from '@/provider/app.provider';
import styles from './Layout.module.scss';
import { ThemeMode } from '@/enums/app.enum';

type LayoutProps = {
  title?: string;
};

export const ProLayout: FunctionComponent<LayoutProps> = function ({ children, ...props }) {
  const router = useRouter();
  const [defaultSelectedKeys, setSelectedKeys] = useState([]);
  const appContext = useAppContext();

  useEffect(() => {
    // console.log('#router', router);
    setSelectedKeys([router.pathname]);
  }, []);

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

  function onSwitchThemeMode() {
    appContext.updateThemeMode(
      appContext.themeMode === ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK,
    );
  }

  function onSwitchLanguage() {
    appContext.updateLanguage(
      appContext.language.code.toLowerCase().startsWith('zh') ? 'enUS' : 'zhCN',
    );
  }

  /**
   * 退出
   */
  async function onLogout() {
    await router.replace('/login');
  }

  const { Header, Footer, Sider, Content } = Layout;
  return (
    <Layout className={styles.layout}>
      <Head>{props.title && <title>{props.title}</title>}</Head>
      <Sider className={styles.sidebar}>
        <Nav
          defaultSelectedKeys={defaultSelectedKeys}
          className={styles.nav}
          items={createNavItems(routes)}
          header={{
            logo: (
              <img alt="logo" src="//lf1-cdn-tos.bytescm.com/obj/ttfe/ies/semi/webcast_logo.svg" />
            ),
            text: 'Next Admin',
            link: '/',
          }}
          footer={{
            collapseButton: true,
          }}
          onSelect={onSelectItem}
        />
      </Sider>
      <Layout>
        <Header className={styles.header}>
          <Nav
            mode="horizontal"
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
                <Button
                  theme="borderless"
                  icon={
                    appContext.themeMode === 'dark' ? (
                      <IconSun size="large" />
                    ) : (
                      <IconMoon size="large" />
                    )
                  }
                  style={{
                    color: 'var(--semi-color-text-2)',
                    marginRight: '12px',
                  }}
                  onClick={onSwitchThemeMode}
                />
                <Button
                  theme="borderless"
                  icon={<IconLanguage size="large" />}
                  style={{
                    color: 'var(--semi-color-text-2)',
                    marginRight: '12px',
                  }}
                  onClick={onSwitchLanguage}
                >
                  {appContext.language.code.slice(0, 2).toUpperCase()}
                </Button>
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
        </Header>
        <Content className={styles.content}>
          <Breadcrumb
            aria-label="breadcrumb"
            style={{
              marginBottom: '24px',
            }}
            routes={['首页', '当这个页面标题很长时需要省略', '上一页', '详情页']}
          />
          <div
            style={{
              borderRadius: '10px',
              border: '1px solid var(--semi-color-border)',
              padding: '32px',
            }}
          >
            {children}
          </div>
        </Content>
        <Footer className={styles.footer}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <IconGithubLogo size="large" style={{ marginRight: '8px' }} />
            <span>Copyright © 2022 Anguer. All Rights Reserved. </span>
          </div>
        </Footer>
      </Layout>
    </Layout>
  );
};
