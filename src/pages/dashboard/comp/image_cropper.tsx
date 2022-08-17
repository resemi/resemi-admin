import React from 'react';
import { Button, Toast } from '@douyinfe/semi-ui';
import { ImageCropper } from '@/components/ImageCropper';

export default function Page() {
  function onError(err) {
    console.error(err.message);
    Toast.error(err.message);
  }
  return (
    <>
      <div className="mb-20px">图片裁剪</div>
      <ImageCropper title="图片裁剪" onError={onError} tip="（图片大小不能超过5M）" previewTip="预览图片">
        {({ upload }) => (
          <Button theme="solid" type="primary" onClick={upload}>
            上传图片
          </Button>
        )}
      </ImageCropper>

      <div style={{ padding: '20px 0' }}>
        <ImageCropper onError={onError} tip="（图片大小不能超过5M）" previewTip="Preview" />
      </div>
    </>
  );
}
