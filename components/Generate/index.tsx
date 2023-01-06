import { defineComponent } from 'vue';
import useConfigInject from '../../util/hooks/useConfigInject';
import { withInstall } from '../../util/type';
// import { getPropsSlot } from '../../util/props-util';
import vueTypes from '../../util/vue-types';

const Generate = defineComponent({
  name: 'VcGenerate',
  props: {
    width: vueTypes.number.def(0),
    height: vueTypes.number.def(0)
  },
  setup(props, { slots }) {
    const { prefixCls, api } = useConfigInject('generate', props);
    return () => (
      <>
        <div class={prefixCls.value}>这是生成组件</div>
      </>
    );
  }
});

export default withInstall(Generate);
