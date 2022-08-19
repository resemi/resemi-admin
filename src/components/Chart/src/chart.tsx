// modified from https://github.com/reactchartjs/react-chartjs-2/blob/master/src/chart.tsx
import type { CanvasHTMLAttributes, ForwardedRef, ReactNode } from 'react';
import { forwardRef, useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  ChartType,
  DefaultDataPoint,
  ChartData,
  ChartOptions,
  Plugin,
  ChartComponentLike,
  UpdateMode,
} from 'chart.js';
import { reforwardRef, cloneData, setDatasets, setLabels, setOptions } from './utils';

export interface ChartProps<TType extends ChartType = ChartType, TData = DefaultDataPoint<TType>, TLabel = unknown>
  extends CanvasHTMLAttributes<HTMLCanvasElement> {
  type: TType;
  data: ChartData<TType, TData, TLabel>;
  options?: ChartOptions<TType>;
  plugins?: Plugin<TType>[];
  redraw?: boolean;
  datasetIdKey?: string;
  updateMode?: UpdateMode;
  fallback?: ReactNode;
}

export function ChartComponent<TType extends ChartType = ChartType, TData = DefaultDataPoint<TType>, TLabel = unknown>(
  {
    height = 150,
    width = 300,
    type,
    data,
    options,
    plugins = [],
    redraw = false,
    datasetIdKey,
    updateMode,
    fallback,
    ...delegated
  }: ChartProps<TType, TData, TLabel>,
  ref: ForwardedRef<ChartJS<TType, TData, TLabel>>,
) {
  type TypedChartJS = ChartJS<TType, TData, TLabel>;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<TypedChartJS>(null);

  function renderChart() {
    if (!canvasRef.current) {
      return;
    }

    chartRef.current = new ChartJS(canvasRef.current, {
      type,
      data: cloneData(data, datasetIdKey),
      options: options && { ...options },
      plugins,
    });

    reforwardRef(ref, chartRef.current);
  }

  function destroyChart() {
    reforwardRef(ref, null);

    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }
  }

  useEffect(() => {
    if (!redraw && chartRef.current && options) {
      setOptions(chartRef.current, options);
    }
  }, [options, redraw]);

  useEffect(() => {
    if (!redraw && chartRef.current) {
      setLabels(chartRef.current.config.data, data.labels);
    }
  }, [data.labels, redraw]);

  useEffect(() => {
    if (!redraw && chartRef.current && data.datasets) {
      setDatasets(chartRef.current.config.data, data.datasets, datasetIdKey);
    }
  }, [data.datasets, redraw, datasetIdKey]);

  useEffect(() => {
    if (!chartRef.current) return;

    if (redraw) {
      destroyChart();
      setTimeout(renderChart);
    } else {
      chartRef.current.update(updateMode);
    }
  }, [redraw, options, data.labels, data.datasets, updateMode]);

  useEffect(() => {
    if (!chartRef.current) {
      return;
    }

    destroyChart();
    setTimeout(renderChart);
  }, [type]);

  useEffect(() => {
    renderChart();

    return () => destroyChart();
  }, []);

  return (
    <canvas ref={canvasRef} width={width} height={height} {...delegated}>
      {fallback}
    </canvas>
  );
}

export const Chart = forwardRef(ChartComponent) as <
  TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown,
>(
  props: ChartProps<TType, TData, TLabel> & {
    ref?: ForwardedRef<ChartJS<TType, TData, TLabel> | null>;
  },
) => JSX.Element;

export function createTypedChart<T extends ChartType>(type: T, registrable: ChartComponentLike) {
  ChartJS.register(registrable);

  return forwardRef<ChartJS<T, DefaultDataPoint<T>, unknown> | null, Omit<ChartProps<T>, 'type'>>((props, ref) => (
    <Chart {...props} ref={ref} type={type} />
  )) as <TData = DefaultDataPoint<T>, TLabel = unknown>(
    props: Omit<ChartProps<T, TData, TLabel>, 'type'> & {
      ref?: ForwardedRef<ChartJS<T, TData, TLabel>>;
    },
  ) => JSX.Element;
}
