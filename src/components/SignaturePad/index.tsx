import { FunctionComponent, useEffect, useMemo, useRef, useState } from 'react';
import CanvasSignaturePad from 'signature_pad';
import { useWindowSize } from 'react-use';
import debounce from 'lodash-es/debounce';

export type SignaturePadChildrenArgs = {
  clear: () => void;
  saveAs: (type?: string) => string;
};

export type SignaturePadProps = {
  children?: (args: SignaturePadChildrenArgs) => void;
  className?: string;
  width?: number;
  height?: number;
  penColor?: string;
  backgroundColor?: string;
  asType?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

export const SignaturePad: FunctionComponent<SignaturePadProps> = ({
  children,
  className,
  width,
  height,
  penColor = 'black',
  backgroundColor = 'rgba(0, 0, 0, 0)',
  asType,
  defaultValue,
  onValueChange,
}) => {
  const el = useRef<HTMLCanvasElement>();
  const [state, setState] = useState<CanvasSignaturePad>();
  const { width: winWidth, height: winHeight } = useWindowSize();
  const options = useMemo(() => {
    return { penColor };
  }, [penColor]);

  useEffect(() => {
    setState(
      new CanvasSignaturePad(el.current, {
        // dotSize: 0,
        // minWidth: 0.5,
        // maxWidth: 2.5,
        // throttle: 16,
        ...options,
        backgroundColor: 'rgba(0,0,0,0)',
      }),
    );
  }, [options]);

  useEffect(() => {
    function resizeCanvas() {
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      el.current.width = el.current.offsetWidth * ratio;
      el.current.height = el.current.offsetHeight * ratio;
      el.current.getContext('2d').scale(ratio, ratio);
      // otherwise isEmpty() might return incorrect value
      state?.clear();
    }

    resizeCanvas();
  }, [state, winHeight, winWidth]);

  useEffect(() => {
    if (state && defaultValue) {
      state?.fromDataURL(defaultValue).then();
    }
  }, [state, defaultValue]);

  useEffect(() => {
    const beginStroke = debounce(() => {
      // console.log('#beginStroke');
    }, 100);

    const endStroke = debounce(() => {
      // console.log('#endStroke');
    }, 100);

    const beforeUpdateStroke = debounce(() => {
      // console.log('#beforeUpdateStroke');
    }, 100);

    const afterUpdateStroke = debounce(() => {
      // console.log('#afterUpdateStroke');
      onValueChange?.(state?.toDataURL(asType));
    }, 100);

    function mount() {
      if (!state) {
        return;
      }
      state.addEventListener('beginStroke', beginStroke);
      state.addEventListener('endStroke', endStroke);
      state.addEventListener('beforeUpdateStroke', beforeUpdateStroke);
      state.addEventListener('afterUpdateStroke', afterUpdateStroke);
    }
    function unmount() {
      if (!state) {
        return;
      }
      state.removeEventListener('beginStroke', beginStroke);
      state.addEventListener('endStroke', endStroke);
      state.addEventListener('beforeUpdateStroke', beforeUpdateStroke);
      state.addEventListener('afterUpdateStroke', afterUpdateStroke);
    }

    mount();
    return unmount;
  }, [asType, onValueChange, state]);

  function handleClear() {
    state?.clear();
    onValueChange?.('');
  }

  function handleSaveAs(type?: string): string {
    if (state?.isEmpty()) {
      return null;
    }
    return state?.toDataURL(type);
  }

  return (
    <>
      <canvas className={['signature-pad', className].join(' ')} ref={el} />
      {children?.({ clear: handleClear, saveAs: handleSaveAs })}
      <style jsx>{`
        .signature-pad {
          position: relative;
          width: ${width ? `${width}px` : '100%'};
          height: ${height ? `${height}px` : '100%'};
          background-color: ${backgroundColor};
        }
      `}</style>
    </>
  );
};
