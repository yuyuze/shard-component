import type { HttpType } from 'util/http';
import type { ExtractPropTypes } from 'vue';
import { bool, string, array } from 'vue-types';
import vueTypes from '../../util/vue-types';
import * as Theme from '../TemList/theme';
import { generateProps as propsTypes } from '../TemList/type';

export const generateProps = () => ({
  theme: string<keyof typeof Theme>(),
  width: vueTypes.unit.def('100%'),
  height: vueTypes.unit,
  filter: array<string>().def([]),
  merge: array<any>().def([]),
  animate: vueTypes.bool.def(true),
  isHeader: vueTypes.bool.def(true),
  data: array<any>(),
  column: array<any>(),
  parame: vueTypes.object.def({}),
  method: string<HttpType>().def('get'),
  http: vueTypes.string,
  api: vueTypes.string.isRequired
});

export type PropsTypes = Partial<
  ExtractPropTypes<ReturnType<typeof generateProps>>
>;
