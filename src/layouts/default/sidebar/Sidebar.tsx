import { Layout, Nav } from '@douyinfe/semi-ui';
import { useRouter } from 'next/router';
import { FunctionComponent, useEffect, useState } from 'react';
import { routes, RouteType } from '@/routes';
import styles from '@/layouts/default/Layout.module.scss';

export type SidebarProps = {};

export const Sidebar: FunctionComponent<SidebarProps> = () => {
  const router = useRouter();
  const [defaultSelectedKeys, setSelectedKeys] = useState([]);

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

  return (
    <Layout.Sider className={styles.sidebar}>
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
    </Layout.Sider>
  );
};
