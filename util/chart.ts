import { graphic } from 'echarts';
import type { EChartsOption } from 'echarts';
import { object, array } from 'vue-types';
import vueTypes from './vue-types';

export const BaseProps = {
  width: vueTypes.unit.def('100%'), // 图形宽度
  height: vueTypes.unit.def('100%'), // 图形高度
  color: array<string | string[]>().def([]), // 颜色 可渐变
  title: object<EChartsOption['title']>(), // 图形标题
  grid: object<EChartsOption['grid']>(), // 图形区域
  tooltip: object<EChartsOption['tooltip']>(), // 图形弹窗
  legend: object<EChartsOption['legend']>(), // 图形图例
  extend: object<EChartsOption>().def({}), // 图形扩展
  customize: object(), // 图形自定义参数
};

export type GradientType = 'line' | 'radia';
export type Linedirection = [number, number, number, number];
export type Radiairection = [number, number, number];

// 处理颜色
// 线条 圆
// 配置几个参数
export const hadnlerColor = (
  type: GradientType,
  color: any,
  direction: Linedirection | Radiairection
) => {
  const step = {
    2: [0, 1],
    3: [0, 0.5, 1],
    4: [0, 0.35, 0.65, 1],
  };

  const graphicFn = {
    line: graphic.LinearGradient,
    radia: graphic.RadialGradient
  };

  if (type === 'line') {
    return new graphicFn[type](...(direction as Linedirection), color.map((e, index) => {
      return {
        offset: step[color.length][index],
        color: e
      };
    }));
  }
  return new graphicFn[type](...(direction as Radiairection), color.map((e, index) => {
    return {
      offset: step[color.length][index],
      color: e
    };
  }));
};
