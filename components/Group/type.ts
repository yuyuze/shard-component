import type { ExtractPropTypes } from 'vue';
import { oneOfType } from 'vue-types';
import vueTypes from '../../util/vue-types';
import { tuple } from '../../util/type';
import type { Size } from '../../util/type';

export const Justify = tuple('start', 'end', 'center', 'space-around', 'space-between', 'space-evenly', 'stretch');
export const Align = tuple('baseline', 'center', 'start', 'end', 'stretch');
export const Direction = tuple('row', 'row-reverse', 'column', 'column-reverse');
export const Wrap = tuple('wrap', 'nowrap');

export const groupProps = () => ({
  width: vueTypes.unit,
  height: vueTypes.unit,
  align: vueTypes.oneOf(Align),
  justify: vueTypes.oneOf(Justify),
  inline: vueTypes.bool.def(false),
  spacing: oneOfType<Size | Size[]>([String, Array]),
  padding: oneOfType<Size | Size[]>([String, Array]),
  direction: vueTypes.oneOf(Direction).def('row'),
  cls: vueTypes.string,
  wrap: vueTypes.oneOf(Wrap).def('nowrap'),
  bg: vueTypes.string,
  style: vueTypes.style,
});

export type ListProps = Partial<ExtractPropTypes<ReturnType<typeof groupProps>>>;
