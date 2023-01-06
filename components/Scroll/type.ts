import type { ExtractPropTypes } from 'vue';
import { array, object } from 'vue-types';
import PropsTypes from '../../util/vue-types';

export const scrollProps = () => ({
  width: PropsTypes.unit.def('100%'),
  height: PropsTypes.number,
  data: array<any>().def([]), // 显示的数据
  cls: PropsTypes.string,
  virtual: PropsTypes.bool.def(false),
  fullHeight: PropsTypes.bool,
  auto: PropsTypes.bool.def(false),
  autoStep: PropsTypes.number,
  renderItem: PropsTypes.func,
  itemKey: PropsTypes.string,
  itemHeight: PropsTypes.number.def(30),
});

export type ListProps = Partial<ExtractPropTypes<ReturnType<typeof scrollProps>>>;
