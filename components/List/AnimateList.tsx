import { defineComponent, TransitionGroup, computed } from 'vue';
import { getPropsSlot } from '../../util/props-util';
import vueTypes from '../../util/vue-types';

export default defineComponent({
  name: 'VcAnimateList',
  props: {
    name: vueTypes.string.def('listmove')
  },
  setup(props, { slots }) {
    return () => {
      const defaultNode = computed(() => {
        return getPropsSlot(slots, props);
      });
      return (
        <TransitionGroup name={props.name}>{defaultNode.value}</TransitionGroup>
      );
    };
  }
});
