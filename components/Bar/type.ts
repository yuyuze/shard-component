import type { ExtractPropTypes } from 'vue';
import { string, oneOfType, object } from 'vue-types';
import type { RegisteredSeriesOption, EChartsOption } from 'echarts';
import { merge } from 'lodash-es';
import vueTypes from '../../util/vue-types';
import * as baseConfig from './config';
import { BaseProps } from '../../util/chart';

type BarOptions = RegisteredSeriesOption['bar'];

export const propTypes = () => ({
  ...BaseProps,
  type: string<keyof typeof baseConfig>().def('base'),
  data: object(),
  series: oneOfType<BarOptions | BarOptions[]>([Object, Array]),
  barWidth: vueTypes.number.def(40),
  automatic: vueTypes.bool.def(true),
  autotimer: vueTypes.number.def(3000) // 动画间隔
});

export type PropTypes = Partial<ExtractPropTypes<ReturnType<typeof propTypes>>>;

export type Config = Partial<
  Pick<PropTypes, 'color' | 'customize' | 'barWidth'>
>;

// 重置config
export const resetConfig = (config: Config): Config => {
  return merge(
    {},
    {
      color: [],
      customize: {},
      barWidth: 40
    } as Config,
    config
  );
};
