import type { ExtractPropTypes } from 'vue';
import { string, oneOfType, object, array } from 'vue-types';
import type {
  RegisteredSeriesOption,
  EChartsOption,
  PieSeriesOption
} from 'echarts';
import { merge } from 'lodash';
import vueTypes from '../../util/vue-types';
import * as baseConfig from './config';
import type {
  GradientType,
  Linedirection,
  Radiairection
} from '../../util/chart';
import { hadnlerColor, BaseProps } from '../../util/chart';

type PieOptions = RegisteredSeriesOption['pie'];

export type Border = {
  radius: string | [string, string]; // 字符：实心圆， 数组： 空心圆
  borderWidth: number;
  borderType: number[];
  color: string | string[];
  borderColor: string | string[];
  z: number;
  direction: Linedirection | Radiairection; // 渐变方向
  gradientType: GradientType;
  borderDashOffset: number;
  shadowBlur: number; // 阴影范围
  shadowColor: string; // 阴影颜色
  shadowOffsetX: number; // 阴影 x 偏移量
  shadowOffsetY: number; // 阴影 y 偏移量
};

const propTypes = () => ({
  ...BaseProps,
  type: string<keyof typeof baseConfig>().def('base'), // 饼图类型
  data: object<PieSeriesOption['data']>(), // 饼图数据
  direction: oneOfType<Linedirection | Radiairection>([Array, Array]), // 渐变方向
  series: oneOfType<PieOptions | PieOptions[]>([Object, Array]), // 图形配置
  automatic: vueTypes.bool.def(true), // 是否开启自动动画
  autotimer: vueTypes.number.def(3000), // 动画间隔
  border: array<Partial<Border>>(), // 饼图边框
  scale: vueTypes.number.def(0), // 饼图缩放大小
  center: array<string>(), // 饼图中心
  radius: oneOfType<string | [string, string]>([String, Array]),
  label: vueTypes.object.def({}),
  labelLine: vueTypes.object.def({}),
  spacing: vueTypes.number.def(0),
  autoCustomTimer: vueTypes.bool.def(true) // 是否开启自定义自动动画
});

export type PropTypes = Partial<ExtractPropTypes<ReturnType<typeof propTypes>>>;

export type Config = Partial<
  Pick<
    PropTypes,
    | 'center'
    | 'scale'
    | 'border'
    | 'customize'
    | 'radius'
    | 'label'
    | 'labelLine'
    | 'color'
    | 'spacing'
    | 'autoCustomTimer'
  >
>;

// 添加参数默认值
/**
 * @description: 添加参数默认值
 * @param {Config} config
 * @param {any} def
 * @returns {*}
 * @author: Guixiang
 */
export const resetForm = (config: Config, themeDef?: any): Config => {
  // 空对象 => 基本默认值 => 主题默认值 => 传入参数
  return merge(
    {},
    {
      center: ['50%', '50%'],
      scale: 0,
      border: [],
      customize: {},
      radius: '50%',
      direction: [1, 0, 0, 0],
      color: []
    },
    themeDef,
    config
  );
};

// 计算圆的大小
export const caclRadius = (config: Config): string | [string, string] => {
  const { scale, radius } = config;
  if (typeof radius === 'string') {
    return `${parseInt(radius) + scale}%`;
  }
  return radius.map((item) => {
    return `${parseInt(item) + scale}%`;
  }) as [string, string];
};

// 计算间距填充圆
export const calcFilling = (data, spacing) => {
  const arr = [];
  const sum = data.reduce((a, b) => {
    return a + b.value;
  }, 0);

  for (let i = 0; i < data.length; i++) {
    arr.push(
      {
        value: data[i].value,
        name: data[i].name
      },
      {
        // 间隔配置
        value: (sum / 100) * spacing, // 间隔距离
        silent: true,
        tooltip: {
          show: false
        },
        select: {
          disabled: false
        },
        itemStyle: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          color: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgba(0, 0, 0, 0)',
          borderWidth: 3
        },
        legendHoverLink: false
      }
    );
  }
  return arr;
};

// 生成圆的边框
export const generateBorder = (list: Partial<Border>[], config: Config) => {
  const { scale, center } = config;

  return list.map((e) => {
    const {
      radius,
      color,
      z = -1,
      direction = [0.5, 0.5, 1.0],
      gradientType = 'radia',
      borderColor,
      ...emptyCircleStyle
    } = e;

    // 用 any 解决 string 与 hadnlerColor 函数返回值类型的冲突

    let emptyCircleColor: any = typeof color === 'string' ? color : undefined;
    if (color && typeof color !== 'string') {
      emptyCircleColor = hadnlerColor(gradientType, color, direction);
    }

    let emptyCircleBorderColor: any =
      typeof borderColor === 'string' ? borderColor : undefined;
    if (borderColor && typeof borderColor !== 'string') {
      emptyCircleBorderColor = hadnlerColor(
        gradientType,
        borderColor,
        direction
      );
    }

    return {
      z,
      center,
      type: 'pie',
      radius:
        typeof radius === 'string'
          ? `${parseInt(radius) + scale}%`
          : radius.map((item) => `${parseInt(item) + scale}%`),
      avoidLabelOverlap: false,
      showEmptyCircle: true,
      emptyCircleStyle: {
        color: emptyCircleColor,
        borderColor: emptyCircleBorderColor,
        ...emptyCircleStyle
      }
    };
  });
};

export default propTypes;
