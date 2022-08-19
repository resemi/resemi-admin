// modified from https://github.com/reactchartjs/react-chartjs-2/blob/master/src/utils.ts
import { Chart, ChartData, ChartDataset, ChartOptions, ChartType, DefaultDataPoint } from 'chart.js';
import { ForwardedRef } from 'react';

const defaultDatasetIdKey = 'label';

export function reforwardRef<T>(ref: ForwardedRef<T>, value: T) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    // eslint-disable-next-line no-param-reassign
    ref.current = value;
  }
}

export function setOptions<TType extends ChartType = ChartType, TData = DefaultDataPoint<TType>, TLabel = unknown>(
  chart: Chart<TType, TData, TLabel>,
  nextOptions: ChartOptions<TType>,
) {
  Object.assign(chart.options, nextOptions);
}

export function setLabels<TType extends ChartType = ChartType, TData = DefaultDataPoint<TType>, TLabel = unknown>(
  currentData: ChartData<TType, TData, TLabel>,
  nextLabels: TLabel[] | undefined,
) {
  // eslint-disable-next-line no-param-reassign
  currentData.labels = nextLabels;
}

export function setDatasets<TType extends ChartType = ChartType, TData = DefaultDataPoint<TType>, TLabel = unknown>(
  currentData: ChartData<TType, TData, TLabel>,
  nextDatasets: ChartDataset<TType, TData>[],
  datasetIdKey = defaultDatasetIdKey,
) {
  const addedDatasets: ChartDataset<TType, TData>[] = [];

  // eslint-disable-next-line no-param-reassign
  currentData.datasets = nextDatasets.map((nextDataset: Record<string, unknown>) => {
    // given the new set, find it's current match
    const currentDataset = currentData.datasets.find(
      (dataset: Record<string, unknown>) => dataset[datasetIdKey] === nextDataset[datasetIdKey],
    );

    // There is no original to update, so simply add new one
    if (!currentDataset || !nextDataset.data || addedDatasets.includes(currentDataset)) {
      return { ...nextDataset } as ChartDataset<TType, TData>;
    }

    addedDatasets.push(currentDataset);

    Object.assign(currentDataset, nextDataset);

    return currentDataset;
  });
}

export function cloneData<TType extends ChartType = ChartType, TData = DefaultDataPoint<TType>, TLabel = unknown>(
  data: ChartData<TType, TData, TLabel>,
  datasetIdKey = defaultDatasetIdKey,
) {
  const nextData: ChartData<TType, TData, TLabel> = {
    labels: [],
    datasets: [],
  };

  setLabels(nextData, data.labels);
  setDatasets(nextData, data.datasets, datasetIdKey);

  return nextData;
}
