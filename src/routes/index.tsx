export type RouteType = {
  id: string | number;
  path: string;
  name: string;
  icon?: string;
  children?: RouteType[];
};

export const adminBasePath = '/admin';

export const routes: RouteType[] = [
  {
    id: 'Home',
    path: '/admin/dashboard',
    name: '首页',
    icon: 'home',
  },
  {
    id: 'Changelog',
    path: '/admin/changelog',
    name: '更新日志',
    icon: 'article',
  },
  {
    id: 'Components',
    path: '/admin/comp',
    name: '组件',
    icon: 'widgets',
    children: [
      {
        id: 'Form',
        path: '/form',
        name: '表单',
      },
      {
        id: 'Input',
        path: '/input',
        name: '输入框',
      },
      {
        id: 'Table',
        path: '/table',
        name: '基础数据',
      },
    ],
  },
  {
    id: 'Features',
    path: '/admin/feat',
    name: '功能',
    icon: 'extension',
    children: [
      {
        id: 'Intl',
        path: '/intl',
        name: '国际化',
      },
    ],
  },
  {
    id: 'Settings',
    path: '/admin/settings',
    name: '设置',
    icon: 'settings',
  },
];
