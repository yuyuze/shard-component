import { defineComponent, watch, onMounted } from 'vue';
import { useStart } from './useStart';
import { useCount } from './useCount';
import ConstToProps from './type';

const Props = ConstToProps();

export default defineComponent({
  name: 'CountTo',
  props: Props,
  setup(props) {
    const { localStartVal, startTime, localDuration, rAF, start } = useStart(props);
    const { count, displayValue } = useCount(props, localStartVal, startTime, localDuration, rAF);
    // 监听开始数字变化
    watch(
      () => props.startVal,
      () => {
        if (props.autoplay) {
          start(count);
        }
      },
    );
    // 监听结束数字变化
    watch(
      () => props.endVal,
      () => {
        start(count);
      },
    );
    onMounted(() => {
      // 默认自动滚动
      if (props.autoplay) {
        start(count);
      }
    });
    return () => <span>{displayValue.value}</span>;
  },
});
