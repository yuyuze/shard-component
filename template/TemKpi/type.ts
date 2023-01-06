import type { ExtractPropTypes } from 'vue';
import { string } from 'vue-types';
import vueTypes from '../../util/vue-types';
import * as Theme from './theme';

export const generateProps = () => ({
  theme: string<keyof typeof Theme>(),
  width: vueTypes.unit.def('100%'),
  height: vueTypes.unit,
  icon: vueTypes.string,
  name: vueTypes.string,
  value: vueTypes.unit,
  unit: vueTypes.string,
  custom: vueTypes.object,
  progress: vueTypes.unit.def(0),
  backgroundColor: vueTypes.string,
  isToday: vueTypes.bool.def(false),
  hover: vueTypes.bool.def(false),
  numProps: vueTypes.object // separator
});

export type PropsTypes = Partial<
  ExtractPropTypes<ReturnType<typeof generateProps>>
>;
