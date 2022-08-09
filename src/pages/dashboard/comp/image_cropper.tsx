import React from 'react';
import { Button } from '@douyinfe/semi-ui';
import { ImageCropper } from '@/components/ImageCropper';

export default function Page() {
  return (
    <>
      <div className="mb-20px">图片裁剪</div>
      <ImageCropper title="图片裁剪">
        <Button theme="solid" type="primary">
          上传图片
        </Button>
      </ImageCropper>

      <div style={{ padding: '20px 0' }}>
        <ImageCropper />
      </div>
    </>
  );
}
