import { array, number, string } from 'vue-types';
import PropsTypes from '../../../util/vue-types';
import { tuple } from '../../../util/type';
import drainProps from './drain';
import lightBlickProps from './lightBlick';
import pathLineProps from './PathLine';
import neonLight from './NeonLight';

export type SpecialType = 'drain-box' | 'light-blink' | 'fly-line';

const specialType = tuple<SpecialType[]>('drain-box');

const baseConfig = {
  width: PropsTypes.unit.def('auto'),
  height: PropsTypes.unit.def('auto'),
  // type: PropsTypes.oneOf(specialType).isRequired,
  styl: PropsTypes.style,
  cls: PropsTypes.string,
  num: number().def(1),
  time: PropsTypes.number.def(4),
  isAnimation: PropsTypes.bool.def(true)
};

export const drainSpecialProps = { ...baseConfig, ...drainProps };
export const lightBlickSpecialProps = { ...baseConfig, ...lightBlickProps };
export const pathLineSpecialProps = { ...baseConfig, ...pathLineProps };
export const neonLightSpecialProps = { ...baseConfig, ...neonLight };
