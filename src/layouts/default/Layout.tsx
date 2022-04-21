import { FunctionComponent, useEffect, useState } from 'react';

import { Avatar, Breadcrumb, Button, Dropdown, Layout, Nav } from '@douyinfe/semi-ui';
import { IconBell, IconGithubLogo, IconLanguage, IconMoon, IconSun } from '@douyinfe/semi-icons';

import { useRouter } from 'next/router';
import Head from 'next/head';
import { FormattedMessage } from 'react-intl';
import { routes, RouteType } from '@/routes';
import { useAppContext } from '@/provider/app.provider';
import styles from './Layout.module.scss';
import { ThemeMode } from '@/enums/app.enum';
import Loading from './Loading';
import { Locales } from '@/locales';

type LayoutProps = {
  title?: string;
};

export const BasicLayout: FunctionComponent<LayoutProps> = function ({ children, ...props }) {
  const router = useRouter();
  const [defaultSelectedKeys, setSelectedKeys] = useState([]);
  const appContext = useAppContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function handleStart(url) {
      setLoading(url !== router.pathname);
    }
    function handleComplete() {
      setLoading(false);
    }
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, [router]);

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
    appContext.updateThemeMode(appContext.themeMode === ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK);
  }

  function onSwitchLanguage() {
    appContext.updateLanguage(appContext.language === Locales.ZH_CN ? Locales.EN_US : Locales.ZH_CN);
  }

  function onGithubClick() {
    window.open('https://github.com/ghaaaaa/nextjs-admin#readme', '_blank');
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
            logo: <img alt="logo" src="//lf1-cdn-tos.bytescm.com/obj/ttfe/ies/semi/webcast_logo.svg" />,
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
            header={
              <div>
                <FormattedMessage id="hello" />
                <FormattedMessage id="layout.header" />
              </div>
            }
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
                  icon={appContext.themeMode === 'dark' ? <IconSun size="large" /> : <IconMoon size="large" />}
                  style={{
                    color: 'var(--semi-color-text-2)',
                    marginRight: '12px',
                  }}
                  onClick={onSwitchThemeMode}
                />
                <Button
                  theme="borderless"
                  icon={<IconGithubLogo size="large" />}
                  style={{
                    color: 'var(--semi-color-text-2)',
                    marginRight: '12px',
                  }}
                  onClick={onGithubClick}
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
                  {appContext.language.slice(0, 2).toUpperCase()}
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
          <Loading loading={loading} />
          <Breadcrumb
            aria-label="breadcrumb"
            className={styles.breadcrumb}
            routes={['首页', '当这个页面标题很长时需要省略', '上一页', '详情页']}
          />
          <div className={styles['content-inner']}>{children}</div>
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

export const ProLayout = function ({ children }) {
  return <div>{children}</div>;
};
