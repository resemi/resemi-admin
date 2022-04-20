import semiZhCN from '@douyinfe/semi-ui/lib/es/locale/source/zh_CN';
import semiEnUS from '@douyinfe/semi-ui/lib/es/locale/source/en_US';
import { createIntl, createIntlCache } from 'react-intl';
import mapValues from 'lodash-es/mapValues';
import zhCN from './zh-CN';
import enUS from './en';

export type { Locale as SemiLocale } from '@douyinfe/semi-ui/locale/interface';

export enum Locales {
  ZH_CN = 'zh-CN',
  EN_US = 'en-US',
}

export const messages = {
  [Locales.ZH_CN]: {
    semi: semiZhCN,
    app: zhCN,
  },
  [Locales.EN_US]: {
    semi: semiEnUS,
    app: enUS,
  },
};

// const cache = createIntlCache();
//
// export const intl = createIntl(
//   mapValues(messages, (t, k) => ({
//     locale: k,
//     messages: t.app,
//   })),
//   cache,
// );
