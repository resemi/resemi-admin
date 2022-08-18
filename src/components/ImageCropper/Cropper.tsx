import { FunctionComponent, ReactNode, useEffect, useRef, useState } from 'react';
import { Space, Spin } from '@douyinfe/semi-ui';
import debounce from 'lodash-es/debounce';
import CanvasCropper from './src/CanvasCropper';

export type CropperProps = {
  uploader: ReactNode;
  loading: boolean;
  image: string;
  width: number;
  height: number;
  preview: number;
  gutter: number;
  tip?: string | ReactNode;
  previewTip?: string | ReactNode;
  onValueChange?: (v: string) => void;
};

export const Cropper: FunctionComponent<CropperProps> = ({
  uploader,
  loading,
  image,
  width,
  height,
  gutter,
  preview,
  tip,
  previewTip,
  onValueChange,
}) => {
  const [state, setState] = useState<CanvasCropper>();
  const [previewState, setPreviewState] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>();

  useEffect(() => {
    setState(
      new CanvasCropper(canvasRef.current, {
        onChange: debounce((e) => {
          // console.log(e.toDataUrl());
          setPreviewState(e.toDataUrl());
        }, 100),
      }),
    );
  }, []);

  useEffect(() => {
    function mount() {
      if (state && image) {
        state.initCanvas(image).then();
      } else {
        setPreviewState('');
      }
    }

    function unmount() {
      state?.clear();
    }

    mount();
    return unmount;
  }, [image, state]);

  useEffect(() => {
    onValueChange?.(previewState);
  }, [onValueChange, previewState]);

  return (
    <Space spacing={gutter} align="start">
      <Spin spinning={loading}>
        <div className="image-cropper--desc">
          {uploader}
          {tip}
        </div>
        <div className="image-cropper--cropper">
          <canvas ref={canvasRef} height={height} width={width} />
        </div>
      </Spin>
      <div>
        <div className="image-cropper--desc">{previewTip}</div>
        <div className="image-cropper--preview">
          <div className="image-cropper--preview-item">
            <img src={previewState} alt="Preview" height={100} width={100} />
          </div>
          <div className="image-cropper--preview-item is-circle">
            <img src={previewState} alt="Preview" height={100} width={100} />
          </div>
        </div>
      </div>
      <style jsx>{`
        .image-cropper--desc {
          font-size: 14px;
          margin-bottom: 8px;
        }
        .image-cropper--cropper {
          position: relative;
          width: ${width}px;
          height: ${height}px;
        }
        .image-cropper--preview {
          position: relative;
          width: ${preview}px;
        }
        .image-cropper--cropper canvas,
        .image-cropper--preview .image-cropper--preview-item {
          width: 100%;
          border: thin solid #eee;
          border-radius: 8px;
          overflow: hidden;
          background-image: url('data:image/gif;base64,R0lGODdhEAAQAIAAAP///8zMzCwAAAAAEAAQAAACH4RvoauIzNyBSyYaLMDZcv15HAaSIlWiJ5Sya/RWVgEAOw==');
        }
        .image-cropper--cropper canvas {
          height: 100%;
        }
        .image-cropper--cropper:before,
        .image-cropper--cropper:after {
          content: '';
          position: absolute;
          top: 0;
          height: 100%;
          width: ${Math.floor((width - height) / 2)}px;
          z-index: 10;
          background-color: rgba(255, 255, 255, 0.5);
          pointer-events: none;
        }
        .image-cropper--cropper:before {
          left: 0;
        }
        .image-cropper--cropper:after {
          right: 0;
        }
        .image-cropper--preview .image-cropper--preview-item + .image-cropper--preview-item {
          margin-top: ${gutter}px;
        }
        .image-cropper--preview .image-cropper--preview-item img[src=''] {
          opacity: 0;
        }
        .image-cropper--preview .image-cropper--preview-item.is-circle {
          border-radius: 50%;
        }
      `}</style>
    </Space>
  );
};
