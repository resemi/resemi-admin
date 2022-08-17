import { Button, Space } from '@douyinfe/semi-ui';
import React, { useState } from 'react';
import { SignaturePad } from '@/components/SignaturePad';

export default function Page() {
  const [state, setState] = useState('');

  function onValueChange(val) {
    setState(val);
  }

  function handleSave(saveAs) {
    return () => {
      const t = saveAs('image/jpeg');
      console.log(t);
    };
  }

  return (
    <>
      <div className="mb-20px">签名板</div>
      <SignaturePad
        defaultValue={state}
        height={400}
        penColor="blue"
        backgroundColor="#eee"
        onValueChange={onValueChange}
      >
        {({ clear, saveAs }) => (
          <Space spacing={12} align="center" className="p-20px">
            <Button theme="solid" type="primary" onClick={handleSave(saveAs)}>
              保存
            </Button>
            <Button theme="solid" type="primary" onClick={clear}>
              清空
            </Button>
          </Space>
        )}
      </SignaturePad>

      <h2 className="py-20px">测试onValueChange</h2>
      {state && <img src={state} alt="demo" width={200} />}
    </>
  );
}
