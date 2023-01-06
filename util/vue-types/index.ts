import type { CSSProperties } from 'vue';
import { VueTypeValidableDef, VueTypesInterface } from 'vue-types';
import { createTypes } from 'vue-types';
import { VueNode } from '../type';
type offset = [number, number];
const PropTypes = createTypes({
  func: undefined,
  bool: undefined,
  string: undefined,
  number: undefined,
  array: undefined,
  object: undefined,
  integer: undefined
});

PropTypes.extend([
  {
    name: 'looseBool',
    getter: true,
    type: Boolean,
    default: undefined
  },
  {
    name: 'style',
    getter: true,
    type: [String, Object],
    default: undefined
  },
  {
    name: 'VNodeChild',
    getter: true,
    type: null
  },
  {
    name: 'unit',
    getter: true,
    type: [String, Number]
  },
  {
    name: 'offset',
    getter: true,
    type: null,
    default: undefined
  }
]);

export function withUndefined<T extends { default?: any }>(type: T): T {
  type.default = undefined;
  return type;
}

export default PropTypes as VueTypesInterface & {
  readonly unit: VueTypeValidableDef<string | number>;
  readonly looseBool: VueTypeValidableDef<boolean>;
  readonly style: VueTypeValidableDef<CSSProperties>;
  readonly VNodeChild: VueTypeValidableDef<VueNode>;
  readonly offset: VueTypeValidableDef<offset>;
};
