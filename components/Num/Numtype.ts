import type { ExtractPropTypes } from 'vue';
import { string, number } from 'vue-types';
import PropsTypes from '../../util/vue-types';

const numProps = () => ({
  duration: PropsTypes.number.def(3000), // 动画时间
  separator: PropsTypes.string.def(''), // 千分位分隔符
  decimals: PropsTypes.number.def(2), // 显示小数点第几位
  // decimal: PropsTypes.string.def('.'), // 十进制分割单位
  isMandatory: PropsTypes.bool.def(false), // 是否强制显示小数点
  isMemory: PropsTypes.bool.def(false), // 是否开启记忆功能
  style: PropsTypes.style,
  cls: PropsTypes.string,
  animate: PropsTypes.bool.def(true),
  val: PropsTypes.oneOfType([string(), number()]).def(0),
  suffix: PropsTypes.string.def(''), // 值后缀
});

export type NumProps = Partial<ExtractPropTypes<ReturnType<typeof numProps>>>

export default numProps;
