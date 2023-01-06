import { array, string } from 'vue-types';
import PropsTypes from '../../../../util/vue-types';

export default {
  colors: PropsTypes.oneOfType([string(), array<string[]>()]).def('#ff0066'),
  borderWidth: PropsTypes.unit.def('2'),
  outColor: PropsTypes.string,
  innerColor: PropsTypes.string.def('#fff')
};
