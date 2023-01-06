import { defineComponent, computed, onMounted, watch } from 'vue';
import { merge } from 'lodash';
import { useEcharts } from '../../util/hooks';
import * as baseConfig from './config';
import { toSize } from '../../util/tools';
import { withInstall } from '../../util/type';
import { propTypes } from './type';

const Gauge = defineComponent({
  name: 'VcGauge',
  props: propTypes(),
  setup(props, ctx) {
    const { EchartsEl, initEcharts, setOption } = useEcharts();
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
        series,
        title,
        ...config
        // customize,
        // color,
        // startAngle,
        // center,
        // endAngle
      } = {
        ...props
      };
      const option = merge(
        {},
        baseConfig[type](props.data, {
          ...config
          // customize,
          // color,
          // startAngle,
          // center,
          // endAngle
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
      return option;
    }
    watch([() => props.data, () => props.extend], (n, o) => {
      if (props.type) {
        setOption(mergeOption(props.type));
      }
    });
    onMounted(() => {
      initEcharts();
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

export default withInstall(Gauge);
