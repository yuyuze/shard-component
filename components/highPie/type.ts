import { string, number, bool, array, object } from 'vue-types';
import type { Options } from 'highcharts';
import vueTypes from '../../util/vue-types';
import { tuple } from '../../util/type';
import type { Size } from '../../util/type';

interface IData {
  name: string;
  value: string | number;
}

export const highPiePropsType = () => {
  return {
    width: vueTypes.unit,
    height: vueTypes.unit,
    // 是否展示3d饼图
    is3DPie: bool().def(true),
    // 是否要根据占比显示不同高度的饼图
    isHeightByData: bool().def(false),
    data: array<IData>().isRequired,
    // options配置
    extend: object<Options>(),
    // 区块分隔
    blockSlice: bool().def(false)
  };
};
