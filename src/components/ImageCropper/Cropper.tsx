import { FunctionComponent, ReactNode, useEffect, useRef, useState } from 'react';
import debounce from 'lodash-es/debounce';
import CanvasCropper from './src/CanvasCropper';

export type CropperProps = {
  uploader: ReactNode;
  direction: 'horizontal' | 'vertical' | '';
  image: string;
  width: number;
  height: number;
  previewSize: number;
  gutter: number;
  tip?: string | ReactNode;
  previewTip?: string | ReactNode;
  onValueChange?: (v: string) => void;
};

export const Cropper: FunctionComponent<CropperProps> = ({
  uploader,
  direction,
  image,
  width,
  height,
  gutter,
  previewSize,
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
    <div className={['image-cropper', direction && `is-${direction}`].join(' ')}>
      <div className="image-cropper--drawing">
        <div className="image-cropper--desc">
          {uploader}
          {tip}
        </div>
        <div className="image-cropper--canvas">
          <canvas ref={canvasRef} height={height} width={width} />
        </div>
      </div>
      <div className="image-cropper--preview">
        <div className="image-cropper--desc">{previewTip}</div>
        <div className="image-cropper--preview-items">
          <div className="image-cropper--preview-item">
            <img src={previewState} alt="Preview" height={previewSize} width={previewSize} />
          </div>
          <div className="image-cropper--preview-item is-circle">
            <img src={previewState} alt="Preview" height={previewSize} width={previewSize} />
          </div>
        </div>
      </div>
      <style jsx>{`
        .image-cropper {
          position: relative;
          display: inline-flex;
          flex-direction: row;
          column-gap: ${gutter}px;
          row-gap: ${gutter}px;
          flex-wrap: wrap;
          max-width: 100%;
        }
        .image-cropper.is-vertical {
          flex-direction: column;
        }
        .image-cropper--desc {
          font-size: 14px;
          margin-bottom: 8px;
        }
        .image-cropper--drawing {
          flex: 1;
          display: inline-flex;
          flex-direction: column;
        }
        .image-cropper--drawing .image-cropper--canvas {
          position: relative;
          min-width: 200px;
        }
        .image-cropper--preview {
          position: relative;
          width: ${previewSize}px;
        }
        .image-cropper--drawing .image-cropper--canvas canvas,
        .image-cropper--preview .image-cropper--preview-item {
          border: thin solid #eee;
          border-radius: 8px;
          overflow: hidden;
          background-image: url('data:image/gif;base64,R0lGODdhEAAQAIAAAP///8zMzCwAAAAAEAAQAAACH4RvoauIzNyBSyYaLMDZcv15HAaSIlWiJ5Sya/RWVgEAOw==');
        }
        .image-cropper--drawing .image-cropper--canvas canvas {
          width: ${width}px;
          height: ${height}px;
          max-width: 100%;
        }
        .image-cropper--drawing .image-cropper--canvas:before,
        .image-cropper--drawing .image-cropper--canvas:after {
          content: '';
          position: absolute;
          top: 0;
          height: 100%;
          width: ${Math.floor((width - height) / 2)}px;
          z-index: 10;
          background-color: rgba(255, 255, 255, 0.5);
          pointer-events: none;
        }
        .image-cropper--drawing .image-cropper--canvas:before {
          left: 0;
        }
        .image-cropper--drawing .image-cropper--canvas:after {
          right: 0;
        }
        .image-cropper--preview .image-cropper--preview-item {
          width: ${previewSize}px;
          height: ${previewSize}px;
        }
        .image-cropper--preview .image-cropper--preview-items {
          display: inline-flex;
          flex-direction: column;
          column-gap: ${gutter}px;
          row-gap: ${gutter}px;
        }
        .image-cropper.is-vertical .image-cropper--preview-items {
          flex-direction: row;
        }
        .image-cropper--preview .image-cropper--preview-item img[src=''] {
          opacity: 0;
        }
        .image-cropper--preview .image-cropper--preview-item.is-circle {
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};
