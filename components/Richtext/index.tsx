import { defineComponent, computed } from 'vue';
import useConfigInject from '../../util/hooks/useConfigInject';
import { withInstall } from '../../util/type';
import { toSize } from '../../util/tools';
import { getPropsSlot } from '../../util/props-util';
import { propsTypes } from './type';

const Richtext = defineComponent({
  name: 'VcRichtext',
  props: propsTypes(),
  setup(props, { slots }) {
    const { prefixCls } = useConfigInject('richtext', props);

    return () => <div class={`${prefixCls.value}`}>这是富文本组件</div>;
  }
});

export default withInstall(Richtext);
