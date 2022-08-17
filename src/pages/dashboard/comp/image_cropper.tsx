import React, { useState } from 'react';
import { Button, Toast } from '@douyinfe/semi-ui';
import { ImageCropper } from '@/components/ImageCropper';

export default function Page() {
  const [state, setState] = useState('');

  function onError(err) {
    console.error(err.message);
    Toast.error(err.message);
  }

  function onValueChange(v) {
    setState(v);
  }

  function onSubmit(v) {
    console.log('============== start submit ==============');
    console.log(v);
    console.log('================ end submit ==============');
    Toast.success('看控制台');
  }

  return (
    <>
      <div className="mb-20px">图片裁剪</div>
      <ImageCropper
        title="图片裁剪"
        tip="（图片大小不能超过5M）"
        previewTip="预览图片"
        onError={onError}
        onSubmit={onSubmit}
      >
        {({ upload }) => (
          <Button theme="solid" type="primary" onClick={upload}>
            上传图片
          </Button>
        )}
      </ImageCropper>

      <div style={{ padding: '20px 0' }}>
        <ImageCropper
          tip="（图片大小不能超过5M）"
          previewTip="Preview"
          onError={onError}
          onValueChange={onValueChange}
        />

        <h2 className="py-20px">测试onValueChange</h2>
        <img src={state} alt="demo" width={200} />
      </div>
    </>
  );
}
