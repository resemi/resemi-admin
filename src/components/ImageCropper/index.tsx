import { FunctionComponent, ReactNode, useEffect, useRef, useState } from 'react';
import { Modal } from '@douyinfe/semi-ui';
import { Cropper } from './Cropper';

export type ImageCropperChildrenArgs = {
  upload: (e: any) => void;
  clear: (e: any) => void;
};

export type ImageCropperProps = {
  children?: (args: ImageCropperChildrenArgs) => ReactNode;
  uploader: (args: ImageCropperChildrenArgs) => ReactNode;
  title?: string;
  width?: number;
  height?: number;
  accept?: string;
  // 图片最大限制：单位M，默认5M
  maxSize?: number;
  direction?: 'horizontal' | 'vertical' | '';
  tip?: string | ReactNode;
  previewTip?: string | ReactNode;
  onError?: (err: Error) => void;
  onValueChange?: (value: string) => void;
  onSubmit?: (value: string, clear: () => void) => void;
};

export type CalcSizeProps = {
  width: number;
  height: number;
  gutter?: number;
  previewSize?: number;
  direction?: 'horizontal' | 'vertical' | '';
};

function calcSize<T extends CalcSizeProps>({ width, height, gutter = 24, previewSize = 100 }: T) {
  // 模态窗口宽度=剪切板宽度+预览图宽度+3个间距+2个像素的误差
  const modalWidth = Math.floor(width + previewSize + gutter * 3) + 2;

  return { width, height, modalWidth, previewSize, gutter };
}

export const ImageCropper: FunctionComponent<ImageCropperProps> = ({
  children,
  uploader,
  title,
  width = 480,
  height = 320,
  accept = 'image/jpeg,image/png,image/svg+xml',
  maxSize = 5,
  direction,
  tip,
  previewTip,
  onError: onCustomError,
  onValueChange: onCustomValueChange,
  onSubmit: onCustomSubmit,
}) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState('');
  const [sourceState, setSourceState] = useState('');
  const [sizeState, setSizeState] = useState(calcSize({ width, height }));
  const fileRef = useRef<HTMLInputElement>();

  useEffect(() => {
    setSizeState(calcSize({ width, height }));
  }, [height, width]);

  function checkFile(file) {
    const theMaxSize = 1024 * maxSize;
    // 仅限图片
    if (file.type.indexOf('image') === -1) {
      return [new Error('error:type:仅限图片格式')];
    }
    // 超出大小
    if (file.size / 1024 > theMaxSize) {
      return [new Error(`error:size:单文件大小不能超过 ${theMaxSize} kb`)];
    }
    return [];
  }

  // file upload handler
  function handleUpload(e) {
    if (e.target !== fileRef.current) {
      fileRef.current.click();
    }
  }

  // clear image data
  function handleClear() {
    setSourceState('');
    setVisible(false);
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

  // When image crop value changed
  function onValueChange(v) {
    onCustomValueChange?.(v);
    setValue(v);
  }

  // on modal submitting
  function onSubmit() {
    onCustomSubmit?.(value, handleClear);
  }

  // on modal closed
  function onCancel() {
    setVisible(false);
    setSourceState('');
  }

  // render cropper component
  function renderCropper() {
    return (
      <Cropper
        uploader={uploader({ upload: handleUpload, clear: handleClear })}
        image={sourceState}
        width={sizeState.width}
        height={sizeState.height}
        gutter={sizeState.gutter}
        previewSize={sizeState.previewSize}
        direction={direction}
        tip={tip}
        previewTip={previewTip}
        onValueChange={onValueChange}
      />
    );
  }

  // render hidden input
  function renderFileInput() {
    return (
      <input
        ref={fileRef}
        style={{ display: 'none', visibility: 'hidden', width: 0, height: 0 }}
        type="file"
        accept={accept}
        onChange={onFileChange}
      />
    );
  }

  // inline mode
  if (!children) {
    return (
      <>
        {renderFileInput()}
        {renderCropper()}
      </>
    );
  }

  // modal mode
  return (
    <>
      {children({ upload: handleUpload, clear: handleClear })}
      {renderFileInput()}
      <Modal
        title={title}
        visible={visible}
        onOk={onSubmit}
        onCancel={onCancel}
        centered
        maskClosable={false}
        closeOnEsc={false}
        width={sizeState.modalWidth}
      >
        {renderCropper()}
      </Modal>
    </>
  );
};
