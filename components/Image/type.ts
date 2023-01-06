import type { ExtractPropTypes } from 'vue';
import vueTypes from '../../util/vue-types';

export const propsTypes = () => ({
  width: vueTypes.unit, // 宽度
  height: vueTypes.unit, // 高度
  src: vueTypes.string, // 路径
  lazy: vueTypes.bool.def(true), // 懒加载
  fallback: vueTypes.string, // 加载失败地址
  preview: vueTypes.bool.def(true), // 预览功能
  load: vueTypes.bool.def(true), // 加载动画
  radius: vueTypes.unit, // 圆角
  api: vueTypes.string, // 地址前缀
  style: vueTypes.style,
  loading: vueTypes.bool.def(false) // 加载中动画
});

export type PropsTypes = Partial<
  ExtractPropTypes<ReturnType<typeof propsTypes>>
>;
