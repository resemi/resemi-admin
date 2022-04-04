import 'antd/dist/antd.css';
import '@/styles/globals.css';

import { AppProps } from 'next/app';
import { ConfigProvider, Radio } from 'antd';
import { useState } from 'react';
import enUS from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_CN';

export default function MyApp({Component, pageProps}: AppProps) {
  const [locale, setLocale] = useState(zhCN);

  function changeLocale(e) {
    const localeValue = e.target.value;
    setLocale(localeValue);
  }

  return (
    <ConfigProvider locale={locale}>
      <div className="change-locale" style={{marginBottom: '100px'}}>
        <span style={{marginRight: 16}}>Change locale of components: </span>
        <Radio.Group value={locale} onChange={changeLocale}>
          <Radio.Button key="en" value={enUS}>
            English
          </Radio.Button>
          <Radio.Button key="cn" value={zhCN}>
            中文
          </Radio.Button>
        </Radio.Group>
      </div>
      <Component {...pageProps} />
    </ConfigProvider>
  )
}
