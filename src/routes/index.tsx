import { IconHome, IconHistogram, IconLive, IconSetting } from '@douyinfe/semi-icons';
import { ReactNode } from 'react';

export type RouteType = {
  id: string | number;
  path: string;
  name: string;
  icon?: ReactNode;
  children?: RouteType[];
}

export const routes: RouteType[] = [
  {
    id: 'Home',
    path: "/",
    name: "首页",
    icon: <IconHome size="large"/>,
  },
  {
    id: 'Data',
    path: "/icons",
    name: "基础数据",
    icon: <IconHistogram size="large"/>,
  },
  {
    id: 'Test',
    path: "/icons",
    name: "测试功能",
    icon: <IconLive size="large"/>,
    children: [
      {
        id: 'Form',
        path: "/icons",
        name: "表单",
      },
      {
        id: 'Input',
        path: "/icons",
        name: "输入框",
      }
    ]
  },
  {
    id: 'Settings',
    path: "/icons",
    name: "设置",
    icon: <IconSetting size="large"/>,
  },
];
