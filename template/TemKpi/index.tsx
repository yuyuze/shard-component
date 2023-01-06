import { defineComponent } from 'vue';
import { useConfigInject } from '../../util/hooks';
import { withInstall } from '../../util/type';
import * as Theme from './theme';
import { generateProps } from './type';

const TemKpi = defineComponent({
  name: 'VcTemKpi',
  props: generateProps(),
  setup(props, ctx) {
    return () => {
      const { prefixCls } = useConfigInject('temkpi', props);

      return (
        <div class={[prefixCls.value, `${prefixCls.value}-${props.theme}`]}>
          {Theme[props.theme](props, `${prefixCls.value}-${props.theme}`)}
        </div>
      );
    };
  }
});

export default withInstall(TemKpi);
