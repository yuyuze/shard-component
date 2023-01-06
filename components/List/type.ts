import type { ExtractPropTypes, CSSProperties } from 'vue';
import { array, func, string } from 'vue-types';
import vueTypes from '../../util/vue-types';

export interface Column {
  key: string;
  name: string;
  flex: string;
  type: 'text' | 'img';
  width: string;
  ellipsis: boolean;
  ellipsisLen: number;
  imgLocal: boolean;
  imgWidth: number;
  title: boolean;
  imgHeight: number;
  style: CSSProperties;
  itemSlot: any;
  format: string;
  fontColor: string | string[];
  fontSize: number | string;
}

const propTypes = () => ({
  height: vueTypes.unit,
  data: array<any>().def([]),
  column: array<Partial<Column>>().def([]),
  rowKey: vueTypes.string.def(''),
  headClassName: vueTypes.string.def(''),
  bodyClassName: vueTypes.string.def(''),
  headHeight: vueTypes.unit.def(''),
  rowClassName: vueTypes.oneOfType([string(), func()]).def(''),
  rowHeight: vueTypes.unit.def(0),
  rowSpacing: vueTypes.unit.def(0),
  header: vueTypes.bool.def(true),
  animate: vueTypes.bool.def(true),
  animateLen: vueTypes.number.def(3),
  animateTime: vueTypes.number.def(4)
});

export type PropTypes = Partial<ExtractPropTypes<ReturnType<typeof propTypes>>>;

export default propTypes;
