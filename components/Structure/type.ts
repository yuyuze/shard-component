import type { ExtractPropTypes } from 'vue';
import { array, number, object, string } from 'vue-types';
import vueTypes from '../../util/vue-types';
import { tuple } from '../../util/type';

export const Justify = tuple(
  'start',
  'end',
  'center',
  'space-around',
  'space-between',
  'space-evenly',
  'stretch'
);
export const Align = tuple('start', 'end', 'center', 'baseline', 'stretch');

export const BoxBlock = tuple('inline', 'block');

export interface Config {
  gap: number;
  align: typeof Align[number];
  justify: typeof Justify[number];
  height: number | string;
}

export const propTyps = () => ({
  width: vueTypes.unit,
  height: vueTypes.unit,
  tb: object<Partial<Config>>().def({
    gap: 0
  }),
  lr: object<Partial<Config>>().def({
    gap: 0
  }),
  cls: vueTypes.oneOfType([string(), array<string>()]),
  tcls: vueTypes.oneOfType([string(), array<string>()]),
  bcls: vueTypes.oneOfType([string(), array<string>()]),
  lcls: vueTypes.oneOfType([string(), array<string>()]),
  rcls: vueTypes.oneOfType([string(), array<string>()]),
  ccls: vueTypes.oneOfType([string(), array<string>()]),
  styl: vueTypes.style,
  top: vueTypes.VNodeChild,
  bottom: vueTypes.VNodeChild,
  left: vueTypes.VNodeChild,
  right: vueTypes.VNodeChild,
  center: vueTypes.VNodeChild,
  align: vueTypes.oneOf(Align),
  justify: vueTypes.oneOf(Justify),
  block: vueTypes.oneOf(BoxBlock).def('block'),
  pd: vueTypes.oneOfType([number(), array<number>()]).def(0),
  mg: vueTypes.oneOfType([number(), array<number>()]).def(0)
});

export type PropTyps = Partial<ExtractPropTypes<ReturnType<typeof propTyps>>>;
