import { defineComponent } from 'vue';
import { useConfigInject } from '../../util/hooks';
import { withInstall } from '../../util/type';
import { getPropsSlot } from '../../util/props-util';
import * as Theme from './theme';
import { generateProps } from './type';

const TemMod = defineComponent({
  name: 'VcTemMod',
  props: generateProps(),
  emits: ['click', 'clickVideo'],
  setup(props, { slots, emit }) {
    return () => {
      const { prefixCls } = useConfigInject('temmod', props);
      const vnode = getPropsSlot(slots, props);

      return (
        <div class={[prefixCls.value]}>
          {Theme[props.theme]({
            props,
            clsPrefix: `${prefixCls.value}-${props.theme}`,
            vnode,
            slots,
            emit
          })}
        </div>
      );
    };
  }
});

export default withInstall(TemMod);
