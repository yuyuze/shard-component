import { defineComponent, computed, onMounted, watch } from 'vue';
import { merge } from 'lodash';
import { useEcharts } from '../../util/hooks';
import * as baseConfig from './config';
import { toSize } from '../../util/tools';
import { withInstall } from '../../util/type';
import { propTypes } from './type';

const Bar = defineComponent({
  name: 'VcBar',
  props: propTypes(),
  emits: ['init'],
  setup(props, { emit }) {
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
        barWidth,
        automatic,
        autotimer
      } = {
        ...props
      };
      const option = merge(
        {},
        baseConfig[type](props.data, {
          customize,
          color,
          barWidth
        }),
        {
          legend,
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
      const myChart = initEcharts();
      emit('init', myChart);
      if (props.type) {
        setOption(mergeOption(props.type));
      }
    });
    return () => (
      <>
        <div style={styl.value} ref={EchartsEl}></div>
      </>
    );
  }
});

export default withInstall(Bar);
