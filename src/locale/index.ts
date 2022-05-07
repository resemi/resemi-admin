import semiZhCN from '@douyinfe/semi-ui/lib/es/locale/source/zh_CN';
import semiEnUS from '@douyinfe/semi-ui/lib/es/locale/source/en_US';
import { createIntl, createIntlCache } from 'react-intl';
import zhCN from './source/zh_CN.json';
import enUS from './source/en_US.json';

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

const cache = createIntlCache();

export const useLocale = () => {
  // TODO: get currenLocale for store
  const currenLocale = Locales.ZH_CN;
  const intl = createIntl(
    {
      locale: currenLocale,
      messages: messages[currenLocale].app,
    },
    cache,
  );

  return {
    intl,
  };
};
