import { FunctionComponent, useEffect, useMemo, useRef, useState } from 'react';
import { useWindowSize } from 'react-use';

import { WatermarkBuilder, WatermarkOptions } from './src/WatermarkBuilder';

export type WatermarkProps = {
  text: string;
  className?: string;
  visible?: boolean;
} & Omit<WatermarkOptions, 'domId' | 'appendEl'>;

export const Watermark: FunctionComponent<WatermarkProps> = ({
  text,
  className,
  visible,
  cellSize,
  fontSize,
  fontFamily,
  color,
  rotateAngle,
}) => {
  const el = useRef();
  const [state, setState] = useState<WatermarkBuilder>();
  const screen = useWindowSize();

  const options = useMemo(() => {
    return {
      cellSize,
      fontSize,
      fontFamily,
      color,
      rotateAngle,
    };
  }, [cellSize, color, fontFamily, fontSize, rotateAngle]);

  useEffect(() => {
    setState(new WatermarkBuilder({ appendEl: el.current }));
  }, []);

  useEffect(() => {
    if (visible) {
      state?.setup(text, {
        ...options,
      });
    } else {
      state?.clear();
    }

    return () => state?.clear();
  }, [state, screen, visible, text, options]);

  return <div className={className} ref={el} />;
};
