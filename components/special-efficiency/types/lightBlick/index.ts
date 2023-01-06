import { oneOfType, string, object } from 'vue-types';
import PropsTypes from '../../../../util/vue-types';
import { tuple } from '../../../../util/type';

type ThemeType = 'safe' | 'operation';
const themeType = tuple<ThemeType[]>('safe');
type DirectionType = 'column' | 'row';
const directionType = tuple<DirectionType[]>('row');

type DirectiveType = 'forward' | 'opposite';
const directiveType = tuple<DirectiveType[]>('forward');

// 动画
type EffectType = 'alternate' | 'normal';
const effectType = tuple<EffectType[]>('normal');

// 特殊的图案
export const specialIcon = ['rect', 'parallelogram', 'circle'];

// 主题色
export const themeColor = {
  safe: {
    defaultColor: 'rgb(44, 54, 53)',
    activeColor: 'rgb(157, 210, 211)'
  },
  operation: {
    defaultColor: 'rgb(40, 50, 59)',
    activeColor: 'rgb(152, 199, 245)'
  }
};

export default {
  // 图标 svg 或者是 指定内容
  icon: oneOfType<'rect' | 'parallelogram' | 'circle' | Object>([
    object(),
    string()
  ]),
  // theme优先级高于defaultColor activeColor
  theme: PropsTypes.oneOf(themeType),
  defaultColor: PropsTypes.string.def('rgb(44, 54, 53)'),
  activeColor: PropsTypes.string.def('rgb(157, 210, 211)'),
  effect: PropsTypes.oneOf(effectType).def('normal'),
  iconWidth: PropsTypes.unit.def(40),
  iconHeight: PropsTypes.unit.def(40),
  gap: PropsTypes.unit.def(10),
  animation: PropsTypes.bool.def(true),
  rotateZ: PropsTypes.unit.def(30),
  reverse: PropsTypes.bool.def(false),
  animationDir: PropsTypes.oneOf(directiveType).def('forward'),
  setTimeOut: PropsTypes.number.def(0),
  direction: PropsTypes.oneOf(directionType).def('row')
};
