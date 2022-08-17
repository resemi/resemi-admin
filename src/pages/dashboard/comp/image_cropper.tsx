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

  function onSubmit(v, clear) {
    console.log('============== start submit ==============');
    console.log(v);
    console.log('================ end submit ==============');
    Toast.success('看控制台');
    clear();
  }

  function renderUploader(text) {
    return function uploader({ upload, clear }) {
      return (
        <>
          <span className="text-primary cursor-pointer" onClick={upload}>
            {text}
          </span>
          <span className="text-primary cursor-pointer ml-10px" onClick={clear}>
            清空
          </span>
        </>
      );
    };
  }

  return (
    <>
      <div className="mb-20px">图片裁剪</div>
      <ImageCropper
        uploader={renderUploader('重新上传')}
        title="图片裁剪"
        tip="（图片大小不能超过5M）"
        previewTip="预览图片"
        maxSize={5}
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
          uploader={renderUploader('点击上传')}
          tip="（图片大小不能超过5M）"
          previewTip="Preview"
          onError={onError}
          onValueChange={onValueChange}
        />

        <h2 className="py-20px">测试onValueChange</h2>
        {state && <img src={state} alt="demo" width={200} />}
      </div>
    </>
  );
}
