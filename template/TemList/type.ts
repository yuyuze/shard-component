import type { ExtractPropTypes } from 'vue';
import { bool, string, array } from 'vue-types';
import vueTypes from '../../util/vue-types';
import * as Theme from './theme';

export const generateProps = () => ({
  theme: string<keyof typeof Theme>(),
  width: vueTypes.unit.def('100%'),
  height: vueTypes.unit,
  name: vueTypes.string,
  animate: vueTypes.bool.def(true),
  isHeader: vueTypes.bool.def(true),
  customi: vueTypes.object,
  data: array<any>(),
  column: array<any>()
});

export type PropsTypes = Partial<
  ExtractPropTypes<ReturnType<typeof generateProps>>
>;
