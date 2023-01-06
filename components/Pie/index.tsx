import { defineComponent, computed, onMounted, watch } from 'vue';
import { merge } from 'lodash';
import { useEcharts } from '../../util/hooks';
import * as baseConfig from './config';
import { toSize } from '../../util/tools';
import { withInstall } from '../../util/type';
import { hadnlerColor } from '../../util/chart';
import type { GradientType } from '../../util/chart';
import propTypes from './type';

const Pie = defineComponent({
  name: 'VcPie',
  props: propTypes(),
  emits: ['init'],
  setup(props, { slots, emit }) {
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
        autotimer,
        autoCustomTimer,
        border,
        scale,
        center,
        radius,
        direction = [1, 0, 0, 0],
        label,
        spacing
      } = props;

      return merge(
        {},
        // 两种传入模式
        // function 和 object
        (typeof baseConfig[type] === 'function'
          ? baseConfig[type]
          : baseConfig[type].pieConfig)(
          props.data,
          {
            scale,
            customize,
            center,
            border,
            radius,
            label,
            spacing,
            color: color.map((e) => {
              if (typeof e === 'string') {
                return e;
              }
              let type: GradientType = 'line';
              if (direction.length === 3) {
                type = 'radia';
              }
              if (direction.length === 4) {
                type = 'line';
              }
              return hadnlerColor(type, e, direction);
            })
          },
          {
            autoMatic: automatic ? autoMatic : () => {},
            timer: autotimer,
            autoCustomTimer: autoCustomTimer
          }
        ),
        {
          legend,
          tooltip,
          title,
          grid,
          series
        },
        extend
      );
    }
    watch(
      [() => props.data, () => props.extend],
      (n, o) => {
        if (props.type) {
          setOption(mergeOption(props.type));
          typeof baseConfig[props.type] === 'object' &&
            (baseConfig[props.type] as any).handleDataContent(
              props.data,
              mergeOption(props.type),
              setOption
            );
        }
      },
      {
        deep: true
      }
    );
    onMounted(() => {
      const chart = initEcharts();
      emit('init', chart);
      if (props.type) {
        setOption(mergeOption(props.type));
        typeof baseConfig[props.type] === 'object' &&
          (baseConfig[props.type] as any).handleDataContent(
            props.data,
            mergeOption(props.type),
            setOption
          );
      }
    });
    return () => (
      <>
        <div style={styl.value} ref={EchartsEl}></div>
      </>
    );
  }
});

export default withInstall(Pie);
