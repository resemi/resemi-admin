import {
  BarController,
  LineController,
  PieController,
  RadarController,
  DoughnutController,
  PolarAreaController,
  BubbleController,
  ScatterController,
} from 'chart.js';

import { createTypedChart } from './src/chart';

export * from './src/chart';

export const Line = createTypedChart('line', LineController);

export const Bar = createTypedChart('bar', BarController);

export const Radar = createTypedChart('radar', RadarController);

export const Doughnut = createTypedChart('doughnut', DoughnutController);

export const PolarArea = createTypedChart('polarArea', PolarAreaController);

export const Bubble = createTypedChart('bubble', BubbleController);

export const Pie = createTypedChart('pie', PieController);

export const Scatter = createTypedChart('scatter', ScatterController);
