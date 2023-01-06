import { defineComponent, computed, onMounted, watch } from 'vue';
import { string, oneOfType, object } from 'vue-types';
import type {
  RegisteredSeriesOption,
  EChartsOption,
  LineSeriesOption
} from 'echarts';
import { merge } from 'lodash';
import vueTypes from '../../util/vue-types';
import { useEcharts } from '../../util/hooks';
import * as baseConfig from './config';
import { toSize } from '../../util/tools';
import { withInstall } from '../../util/type';

type LineOptions = RegisteredSeriesOption['line'];

const Line = defineComponent({
  name: 'VcLine',
  props: {
    type: string<keyof typeof baseConfig>().def('base'),
    data: object(),
    color: oneOfType<EChartsOption['color']>([Array]),
    width: vueTypes.unit.def('100%'),
    height: vueTypes.unit.def('100%'),
    title: object<EChartsOption['title']>(),
    grid: object<EChartsOption['grid']>(),
    tooltip: object<EChartsOption['tooltip']>(),
    series: oneOfType<LineOptions | LineOptions[]>([Object, Array]),
    legend: object<EChartsOption['legend']>(),
    extend: object<EChartsOption>().def({}),
    customize: object(),
    automatic: vueTypes.bool.def(true),
    autotimer: vueTypes.number.def(3000) // 动画间隔
  },
  emits: ['init'],
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
      const {
        legend,
        tooltip,
        extend,
        grid,
        customize,
        series,
        title,
        color,
        automatic,
        autotimer
      } = {
        ...props
      };
      const option = merge(
        {},
        baseConfig[type](props.data, customize),
        {
          legend,
          color,
          tooltip,
          title,
          grid,
          series
        },
        extend
      );
      try {
        const Axis =
          option.xAxis.type === 'category' ? option.xAxis : option.yAxis;
        if (automatic) {
          autoMatic(Axis.data.length, autotimer);
        }
      } catch (err) {
        console.log(err);
      }
      return option;
    }
    watch(
      [() => props.data, () => props.extend],
      (n, o) => {
        if (props.type) {
          setOption(mergeOption(props.type));
        }
      },
      { deep: true }
    );
    onMounted(() => {
      const chart = initEcharts();
      ctx.emit('init', chart);
      setTimeout(() => {
        if (props.type) {
          setOption(mergeOption(props.type));
        }
      }, 0);
    });
    return () => (
      <>
        <div style={styl.value} ref={EchartsEl}></div>
      </>
    );
  }
});

export default withInstall(Line);
