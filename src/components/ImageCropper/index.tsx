import { FunctionComponent, ReactNode, useEffect, useRef, useState } from 'react';
import { Modal } from '@douyinfe/semi-ui';
import { Cropper } from '@/components/ImageCropper/Cropper';

export type ImageCropperChildrenArgs = {
  upload: (e: any) => void;
};

export type ImageCropperProps = {
  children?: (e: ImageCropperChildrenArgs) => ReactNode;
  title?: string;
  // 宽高比：宽/高，默认1.5
  ratio?: number;
  width?: number;
  tip?: string | ReactNode;
  previewTip?: string | ReactNode;
  onError?: (e: Error) => void;
  onValueChange?: (e: string) => void;
  onSubmit?: (e: string) => void;
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

function calcSize(width: number, ratio: number, gutter = 24, preview = 100) {
  let r = ratio;
  if (ratio <= 0.5 || ratio >= 2) {
    r = 1.5;
  }
  const height = Math.floor(width / r);
  const modalWidth = Math.floor(width + preview + gutter * 3) + 2;

  return { height, modalWidth, preview, gutter };
}

export const ImageCropper: FunctionComponent<ImageCropperProps> = ({
  children,
  title,
  ratio = 1.5,
  width = 500,
  tip,
  previewTip,
  onError: onCustomError,
  onValueChange: onCustomValueChange,
  onSubmit: onCustomSubmit,
}) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState('');
  const [sourceState, setSourceState] = useState('');
  const [sizeState, setSizeState] = useState(calcSize(width, ratio));
  const fileRef = useRef<HTMLInputElement>();

  useEffect(() => {
    setSizeState(calcSize(width, ratio));
  }, [ratio, width]);

  function handleUpload(e) {
    if (e.target !== fileRef.current) {
      fileRef.current.click();
    }
  }

  function updateSourceImage(file) {
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
      onCustomError(err);
    } else {
      updateSourceImage(files[0]);
    }
    // XXX: input field so if you removed it you can re-add the same file
    e.target.value = '';
  }

  function onValueChange(v) {
    onCustomValueChange?.(v);
    setValue(v);
  }

  function onSubmit() {
    onCustomSubmit?.(value);
  }

  function onCancel() {
    setVisible(false);
    setSourceState('');
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

  if (!children) {
    return (
      <>
        {renderFileInput()}
        <Cropper
          image={sourceState}
          width={width}
          height={sizeState.height}
          gutter={sizeState.gutter}
          preview={sizeState.preview}
          tip={tip}
          previewTip={previewTip}
          onValueChange={onValueChange}
        >
          <span className="text-primary cursor-pointer" onClick={handleUpload}>
            点击上传
          </span>
        </Cropper>
      </>
    );
  }

  return (
    <>
      {children({ upload: handleUpload })}
      {renderFileInput()}
      <Modal
        title={title}
        visible={visible}
        onOk={onSubmit}
        onCancel={onCancel}
        centered
        maskClosable={false}
        closeOnEsc={false}
        // size="medium"
        width={sizeState.modalWidth}
      >
        <Cropper
          image={sourceState}
          width={width}
          height={sizeState.height}
          gutter={sizeState.gutter}
          preview={sizeState.preview}
          tip={tip}
          previewTip={previewTip}
          onValueChange={onValueChange}
        >
          <span className="text-primary cursor-pointer" onClick={handleUpload}>
            重新上传
          </span>
        </Cropper>
      </Modal>
    </>
  );
};
