import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { Modal, Space } from '@douyinfe/semi-ui';
import debounce from 'lodash-es/debounce';
import CanvasCropper from './src/CanvasCropper';

export type ImageCropperProps = {
  title?: string;
};

function checkFile(file) {
  const maxSize = 1024 * 5;
  // 仅限图片
  if (file.type.indexOf('image') === -1) {
    return [new Error('仅限图片格式')];
  }
  // 超出大小
  if (file.size / 1024 > maxSize) {
    return [new Error(`单文件大小不能超过 ${maxSize} kb`)];
  }
  return [];
}

export const ImageCropper: FunctionComponent<ImageCropperProps> = ({ children, title }) => {
  const [visible, setVisible] = useState(false);
  const [sourceState, setSourceState] = useState('');
  const [previewState, setPreviewState] = useState('');
  const fileRef = useRef<HTMLInputElement>();
  const canvasRef = useRef<HTMLCanvasElement>();

  useEffect(() => {
    if (!sourceState || !canvasRef.current) {
      return;
    }

    const canvasCropper = new CanvasCropper(canvasRef.current, {
      onChange: debounce(async (e) => {
        // console.log(e.toDataUrl());
        setPreviewState(await e.toDataUrl());
      }, 100),
    });

    canvasCropper.clear();
    canvasCropper.initCanvas(sourceState).then();
  }, [sourceState]);

  function handleUpload(e) {
    if (e.target !== fileRef.current) {
      fileRef.current.click();
    }
  }

  function setSourceImage(file) {
    const fr = new FileReader();
    fr.onload = () => {
      setSourceState(fr.result as string);
    };
    fr.readAsDataURL(file);
  }

  function onFileChange(e) {
    e.preventDefault();
    const files = e.target.files || e.dataTransfer.files;
    setVisible(true);
    const [err] = checkFile(files[0]);
    if (err) {
      console.error(err.message);
      return;
    }
    setSourceImage(files[0]);
    // XXX: input field so if you removed it you can re-add the same file
    e.target.value = '';
  }

  function onSubmit() {}

  function onCancel() {
    setVisible(false);
  }

  function renderFileInput() {
    return (
      <input
        ref={fileRef}
        style={{ display: 'none', visibility: 'hidden', width: 0, height: 0 }}
        type="file"
        accept="image/jpeg,image/png,image/svg+xml"
        onChange={onFileChange}
      />
    );
  }

  function renderCropper() {
    return (
      <Space spacing={24} align="start">
        <div>
          <div className="image-cropper--desc" onClick={handleUpload}>
            重新上传
          </div>
          <div className="image-cropper--cropper">
            <canvas ref={canvasRef} height={200} width={300} />
          </div>
        </div>
        <div>
          <div className="image-cropper--desc">图片预览</div>
          <div className="image-cropper--preview">
            <img src={previewState} alt="Preview" height={100} width={100} />
            <img src={previewState} alt="Preview" className="is-circle" height={100} width={100} />
          </div>
        </div>
        <style jsx>{`
          .image-cropper--desc {
            font-size: 14px;
            margin-bottom: 8px;
          }
          .image-cropper--cropper {
            position: relative;
            width: 300px;
            height: 200px;
          }
          .image-cropper--preview {
            position: relative;
            width: 72px;
          }
          .image-cropper--cropper canvas,
          .image-cropper--preview img {
            width: 100%;
            border-radius: 3px;
            background-image: url('data:image/gif;base64,R0lGODdhEAAQAIAAAP///8zMzCwAAAAAEAAQAAACH4RvoauIzNyBSyYaLMDZcv15HAaSIlWiJ5Sya/RWVgEAOw==');
          }
          .image-cropper--cropper:before,
          .image-cropper--cropper:after {
            content: '';
            position: absolute;
            top: 0;
            height: 100%;
            width: 50px;
            z-index: 10;
            background-color: rgba(255, 255, 255, 0.5);
          }
          .image-cropper--cropper:before {
            left: 0;
          }
          .image-cropper--cropper:after {
            right: 0;
          }
          .image-cropper--preview img + img {
            margin-top: 24px;
          }
          //.image-cropper--preview[src=''] {
          //  opacity: 0;
          //}
          .image-cropper--preview img.is-circle {
            border-radius: 50%;
          }
        `}</style>
      </Space>
    );
  }

  if (!children) {
    return (
      <>
        {renderFileInput()}
        {renderCropper()}
      </>
    );
  }

  return (
    <>
      <div onClick={handleUpload}>{children}</div>
      {renderFileInput()}
      <Modal
        title={title}
        visible={visible}
        onOk={onSubmit}
        onCancel={onCancel}
        centered
        maskClosable={false}
        closeOnEsc={false}
      >
        {renderCropper()}
      </Modal>
    </>
  );
};
