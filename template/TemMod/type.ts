import type { ExtractPropTypes } from 'vue';
import { bool, string } from 'vue-types';
import vueTypes from '../../util/vue-types';
import * as Theme from './theme';

export const generateProps = () => ({
  theme: string<keyof typeof Theme>(),
  width: vueTypes.unit.def('100%'),
  height: vueTypes.unit,
  name: vueTypes.string,
  more: vueTypes.oneOfType([string(), bool()]),
  isTitle: vueTypes.bool.def(true),
  customi: vueTypes.object,
  null: vueTypes.bool
});

export type PropsTypes = Partial<
  ExtractPropTypes<ReturnType<typeof generateProps>>
>;
