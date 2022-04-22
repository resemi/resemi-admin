import { IconHome, IconHistogram, IconComponent, IconPuzzle, IconSetting } from '@douyinfe/semi-icons';
import { ReactNode } from 'react';

export type RouteType = {
  id: string | number;
  path: string;
  name: string;
  icon?: ReactNode;
  children?: RouteType[];
};

export const adminBasePath = '/admin';

export const routes: RouteType[] = [
  {
    id: 'Home',
    path: '/admin/dashboard',
    name: '首页',
    icon: <IconHome size="large" />,
  },
  {
    id: 'Data',
    path: '/admin/table',
    name: '基础数据',
    icon: <IconHistogram size="large" />,
  },
  {
    id: 'Components',
    path: '/admin/comp',
    name: '组件',
    icon: <IconComponent size="large" />,
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
    ],
  },
  {
    id: 'Features',
    path: '/admin/feat',
    name: '功能',
    icon: <IconPuzzle size="large" />,
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
    icon: <IconSetting size="large" />,
  },
];
