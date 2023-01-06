import type { ExtractPropTypes } from 'vue';
import PropsTypes from '../../util/vue-types';

const conunToProps = () => ({
  startVal: PropsTypes.number.def(0), // 开始值
  endVal: PropsTypes.number.def(0), // 结束值
  duration: PropsTypes.number.def(3000), // 动画时间
  separator: PropsTypes.string.def(''), // 千分位分隔符
  decimal: PropsTypes.string.def('.'), // 十进制分割单位
  decimals: PropsTypes.number.def(0), // 显示小数点第几位
  autoplay: PropsTypes.bool.def(true), // 是否自动开启
  prefix: PropsTypes.string.def(''), // 值前缀
  suffix: PropsTypes.string.def(''), // 值后缀
});

// 用 ReturnType 获取返回值 用 ExtractPropTypes 去除 Vue 相关 用 Partial 过滤数据并打上可选
export type CountToProps = Partial<ExtractPropTypes<ReturnType<typeof conunToProps>>>

export default conunToProps;
