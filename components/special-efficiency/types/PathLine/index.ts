/*
 * @Descripttion:
 * @version:
 * @Author: congsir
 * @Date: 2022-11-10 21:57:39
 * @LastEditors:
 * @LastEditTime: 2022-11-10 22:26:47
 */
import { SVGAttributes } from 'vue';
import { array, string, object } from 'vue-types';
import PropsTypes from '../../../../util/vue-types/index';
import { VueNode, tuple } from '../../../../util/type';

export type PositionType = 'absolute' | 'relative';

const positionType = tuple<PositionType[]>('relative');
export interface PointElement {
  key: string | number;
  element?: VueNode;
  top: number | string;
  left: number | string;
  children?: PointElement[];
}

export default {
  // 路径颜色 支持渐变
  pathColors: PropsTypes.oneOfType([PropsTypes.string, array<string>()]).def(
    '#000'
  ),
  // 运动点的颜色 支持渐变
  pointColors: PropsTypes.oneOfType([PropsTypes.string, array<string>()]).def(
    '#000'
  ),
  // svg 样式
  svgCls: PropsTypes.string,
  // path路径
  path: PropsTypes.string.isRequired,
  // 路径线的属性（path）
  linePathAttr: object<SVGAttributes>().def({}),
  // 运动点的属性（path）
  pointPathAttr: object<SVGAttributes>().def({}),
  // 运动动画效果
  animationTimingFunction: PropsTypes.string.def(
    'cubic-bezier(0, 0, 0.74, 0.74)'
  ),
  // 运动点开始的线条偏移量
  endStrokeDashoffset: PropsTypes.number.def(0),
  // 运动点结束的线条偏移量
  startStrokeDashoffset: PropsTypes.number.def(0)
};
