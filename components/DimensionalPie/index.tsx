import { defineComponent, computed, onMounted, watch } from 'vue';
import { string, oneOfType, object, array } from 'vue-types';
import { merge } from 'lodash';
import vueTypes from '../../util/vue-types';
import { useEcharts } from '../../util/hooks';
import { toSize } from '../../util/tools';
import * as baseConfig from './config';
import 'echarts-gl';
import { withInstall } from '../../util/type';

const DimensionalPie = defineComponent({
  name: 'DimensionalPie',
  props: {
    width: vueTypes.unit.def('100%'), // 图形宽度
    height: vueTypes.unit.def('100%'), // 图形高度
    data: array<any>().def([]),
    type: string<keyof typeof baseConfig>().def('base') // 饼图类型
  },
  setup(props, ctx) {
    const { EchartsEl, initEcharts, setOption, autoMatic } = useEcharts();
    const styl = computed(() => {
      const { width, height } = { ...props };
      return {
        width: toSize(width),
        height: toSize(height)
      };
    });
    function mergeOption(type) {
      const { data } = props;
      return merge({}, baseConfig[type](props.data));
    }
    onMounted(() => {
      initEcharts();
      if (props.type) {
        setOption(mergeOption(props.type));
      }
    });
    return () => (
      <>
        <div style={styl.value} ref={EchartsEl}>
          这是一个三维图表组件
        </div>
      </>
    );
  }
});

export default withInstall(DimensionalPie);
