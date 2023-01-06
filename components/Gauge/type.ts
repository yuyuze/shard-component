import type { ExtractPropTypes } from 'vue';
import { string, oneOfType, object, array } from 'vue-types';
import type { RegisteredSeriesOption } from 'echarts';
import { merge } from 'lodash-es';
import vueTypes from '../../util/vue-types';
import * as baseConfig from './config';
import { BaseProps } from '../../util/chart';

type GaugeOptions = RegisteredSeriesOption['gauge'];

export const propTypes = () => ({
  ...BaseProps,
  type: string<keyof typeof baseConfig>().def('base'),
  data: object(),
  center: array<string>(), // 饼图中心
  startAngle: vueTypes.number.def(225), // 起始角度值
  endAngle: vueTypes.number.def(-45), // 结尾角度值
  radius: vueTypes.string.def('75%'), // 仪表盘半径大小
  lineWidth: vueTypes.number.def(10), // 仪表盘圆弧尺寸
  roundCap: vueTypes.bool.def(false), // 圆角显示
  progress: vueTypes.number.def(0), // 进度
  stepColor: array<[number, string]>(), // 背景进度颜色
  clockwise: vueTypes.bool.def(true), // 是否顺时针增长
  series: oneOfType<GaugeOptions | GaugeOptions[]>([Object, Array]),
});

export type PropTypes = Partial<ExtractPropTypes<ReturnType<typeof propTypes>>>;

export type Config = Partial<Pick<PropTypes, 'radius' | 'color' | 'customize' | 'center' | 'startAngle' | 'endAngle' | 'lineWidth' | 'roundCap' | 'progress' | 'stepColor' | 'clockwise'>>;

// 重置config
export const resetConfig = (config: Config): Config => {
  return merge({}, {
    color: [],
    customize: {},
    center: ['50%', '50%'],
    startAngle: 225,
    endAngle: -45,
    radius: '75%',
    roundCap: false,
    lineWidth: 10,
    progress: 0,
    stepColor: [[1, '#999']],
    clockwise: true
  } as Config, config);
};
