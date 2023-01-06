import { array } from 'vue-types';
import vueTypes from '../../util/vue-types';
import { tuple } from '../../util/type';

export enum sizeEnum {
  small = 'small',
  middle = 'middle',
  large = 'large'
}

export const sizeType = tuple('small', 'middle', 'large');
export const sizeObj: {
  small: string;
  middle: string;
  large: string;
} = {
  small: '12px',
  middle: '16px',
  large: '24px'
};

export const iconfontProps = () => ({
  width: vueTypes.unit,
  height: vueTypes.unit,
  duration: vueTypes.number,
  cls: vueTypes.string,
  boxCls: vueTypes.oneOfType([vueTypes.string, array<string>()]),
  color: vueTypes.string,
  href: vueTypes.string.isRequired,
  style: vueTypes.oneOfType([vueTypes.style, array<string | object>()]),
  size: vueTypes
    .oneOfType([vueTypes.oneOf(sizeType), vueTypes.unit])
    .def('small')
});
