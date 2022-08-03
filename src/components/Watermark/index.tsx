import { FunctionComponent, useEffect, useRef, useState } from 'react';
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

  useEffect(() => {
    setState(new WatermarkBuilder({ appendEl: el.current }));
  }, [el]);

  useEffect(() => {
    if (visible) {
      state?.setup(text, {
        cellSize,
        fontSize,
        fontFamily,
        color,
        rotateAngle,
      });
    } else {
      state?.clear();
    }

    return () => state?.clear();
  }, [state, screen, visible, text, cellSize, fontSize, fontFamily, color, rotateAngle]);

  return <div className={className} ref={el} />;
};
