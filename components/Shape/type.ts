import { string, object, array } from 'vue-types';
import vueTypes from '../../util/vue-types';

type ShapeType = 'circle' | 'rect';

interface Ceshi {
  // open: vueTypes.bool.def(true),
  // color: vueTypes.string,
  // inset: string<'inset' | ''>(),
  // blurRadius: vueTypes.number.def(0), //不能为负值
  // spreadRadius: vueTypes.number.def(0),
  // offsetX: vueTypes.number,
  // offsetY: vueTypes.number
}

export const propsTypes = () => ({
  type: string<ShapeType>().isRequired,
  width: vueTypes.unit.def(10),
  height: vueTypes.unit.def(10),
  radius: vueTypes.unit,
  color: vueTypes.oneOfType([string(), array<string>()]),
  shadow: object<Ceshi>()
});
