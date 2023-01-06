import type { ExtractPropTypes } from 'vue';
import { string, oneOfType, object, array, bool } from 'vue-types';
import type { RegisteredSeriesOption, EChartsOption } from 'echarts';
import { merge } from 'lodash-es';
import vueTypes from '../../util/vue-types';
import * as baseConfig from './config';
import { BaseProps } from '../../util/chart';

type BarOptions = RegisteredSeriesOption['bar'];

export const propTypes = () => ({
  ...BaseProps,
  type: string<keyof typeof baseConfig>().def('base'),
  geotype: vueTypes.string.def('china'), // 地图类型
  subGeotype: vueTypes.string.def('china'), // 地图类型
  zoom: vueTypes.number, // 缩放层级
  data: object(), // 数据
  series: oneOfType<BarOptions | BarOptions[]>([Object, Array]), // 图形配置参数
  left: vueTypes.oneOfType([String, Number]), // 左边距离 center
  top: vueTypes.oneOfType([String, Number]), // 上边距离 center
  right: vueTypes.oneOfType([String, Number]), // 右边距离
  bottom: vueTypes.oneOfType([String, Number]), // 下边距离
  flying: array<any>(), // 飞线数组
  clickMap: bool().def(false)
});

export type PropTypes = Partial<ExtractPropTypes<ReturnType<typeof propTypes>>>;

export type Config = Partial<
  Pick<
    PropTypes,
    | 'customize'
    | 'geotype'
    | 'zoom'
    | 'flying'
    | 'left'
    | 'right'
    | 'top'
    | 'bottom'
  >
>;

// 添加参数默认值
export const resetForm = (config: Config): Config => {
  return merge(
    {},
    {
      customize: {},
      geotype: 'china',
      zoom: 1,
      flying: [],
      left: 'auto',
      right: 'auto',
      top: 'auto',
      bottom: 'auto'
    } as Config,
    config
  );
};
