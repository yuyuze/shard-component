import { array, string } from 'vue-types';
import { tuple } from '../../../../util/type';
import PropsTypes from '../../../../util/vue-types';

type ShadowPositionType = '' | 'inset';
const shadowPositionType = tuple<ShadowPositionType[]>('');
export default {
  color: PropsTypes.string.def('#ff0066'),
  expandWidth: PropsTypes.unit.def(4),
  opacity: PropsTypes.number.def(0.2),
  shadowPosition: PropsTypes.oneOf(shadowPositionType).def(''),
  iconHref: PropsTypes.string,
  isShowOutLight: PropsTypes.bool.def(true),
  isShowIconLight: PropsTypes.bool.def(true)
};
