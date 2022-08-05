import React from 'react';
import { Radio, RadioGroup } from '@douyinfe/semi-ui';
import { useAppState } from '@/store';

export default function Page() {
  const [appState, setAppState] = useAppState();

  function onLayoutChange(e) {
    setAppState((oldValue) => {
      return {
        ...oldValue,
        layout: e.target.value,
      };
    });
  }
  return (
    <>
      <div className="p-md text-red-4 dark:text-green-4 custom-jsx">
        Settings
        <style jsx>{`
          .custom-jsx {
            margin-bottom: 20px;
          }
        `}</style>
      </div>
      <RadioGroup type="pureCard" defaultValue={appState.layout} direction="horizontal" onChange={onLayoutChange}>
        <Radio value="side" extra="Side" style={{ width: 200 }}>
          左侧菜单模式
        </Radio>
        <Radio value="mix" extra="Mix" style={{ width: 200 }}>
          顶部菜单混合模式
        </Radio>
        <Radio value="top" extra="Top" style={{ width: 200 }}>
          顶部菜单模式
        </Radio>
      </RadioGroup>
      <div>
        {Object.keys(appState).map((t) => (
          <div key={t} className="p-sm text-blue-4">
            {t}: <span className="text-primary">{appState[t].toString()}</span>
          </div>
        ))}
      </div>
    </>
  );
}
