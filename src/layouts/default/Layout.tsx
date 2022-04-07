import styles from './Layout.module.scss'
import { FunctionComponent } from 'react';

import { Layout, Nav, Button, Breadcrumb, Avatar } from '@douyinfe/semi-ui';
import { IconBell, IconHelpCircle, IconGithubLogo, IconHome, IconHistogram, IconLive, IconSetting } from '@douyinfe/semi-icons';

export const siteTitle = 'Next.js Sample Website'

type LayoutProps = {}

export const ProLayout: FunctionComponent<LayoutProps> = function ({children}) {
  const onBreakpoint = (screen, bool) => {
    console.log(screen, bool);
  };

  const {Header, Footer, Sider, Content} = Layout;
  return (
    <Layout className={styles.layout}>
      <Sider className={styles.sidebar} breakpoint={['md']} onBreakpoint={onBreakpoint}>
        <Nav
          defaultSelectedKeys={['Home']}
          className={styles.nav}
          items={[
            {itemKey: 'Home', text: '首页', icon: <IconHome size="large"/>},
            {itemKey: 'Histogram', text: '基础数据', icon: <IconHistogram size="large"/>},
            {
              itemKey: 'Live',
              text: '测试功能',
              icon: <IconLive size="large"/>,
              items: [
                {itemKey: 'Mock', text: '表单'},
                {itemKey: 'Jmeter', text: '输入框'},
              ]
            },
            {itemKey: 'Setting', text: '设置', icon: <IconSetting size="large"/>},
          ]}
          header={{
            logo: <img src="//lf1-cdn-tos.bytescm.com/obj/ttfe/ies/semi/webcast_logo.svg"/>,
            text: 'Next Admin',
          }}
          footer={{
            collapseButton: true,
          }}
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
                  icon={<IconBell size="large"/>}
                  style={{
                    color: 'var(--semi-color-text-2)',
                    marginRight: '12px',
                  }}
                />
                <Button
                  theme="borderless"
                  icon={<IconHelpCircle size="large"/>}
                  style={{
                    color: 'var(--semi-color-text-2)',
                    marginRight: '12px',
                  }}
                />
                <Avatar color="orange" size="small">
                  YJ
                </Avatar>
              </>
            }
          />
        </Header>
        <Content className={styles.content}>
          <Breadcrumb
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
              justifyContent: 'center'
            }}
          >
              <IconGithubLogo size="large" style={{marginRight: '8px'}}/>
              <span>Copyright © 2022 Anguer. All Rights Reserved. </span>
          </div>
        </Footer>
      </Layout>
    </Layout>
  );
};
