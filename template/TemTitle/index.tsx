import { defineComponent } from 'vue';
import { useConfigInject } from '../../util/hooks';
import { withInstall } from '../../util/type';

const TemTitle = defineComponent({
  name: 'VcTemTitle',
  setup(props, ctx) {
    const { prefixCls } = useConfigInject('temtitle', props);

    return () => (
      <>
        <div class={prefixCls.value}>这是标题模板</div>
      </>
    );
  }
});

export default withInstall(TemTitle);
