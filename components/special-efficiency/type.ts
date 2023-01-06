import { array, number } from 'vue-types';
import PropsTypes from '../../util/vue-types';
import { tuple } from '../../util/type';

export type SpecialType = 'drain-box';

const specialType = tuple<SpecialType[]>('drain-box');

export function specialEfficiencyProps() {
  return {
    width: PropsTypes.unit.def('200'),
    height: PropsTypes.unit.def('60'),
    type: PropsTypes.oneOf(specialType).isRequired,
    styl: PropsTypes.style,
    cls: PropsTypes.string,
    drainNum: number<1 | 2>().def(1),
    colors: PropsTypes.oneOfType([array<string>(), array<string[]>()]).def([
      '#ff0066'
    ])
  };
}
