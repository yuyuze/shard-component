import { defineComponent, computed } from 'vue';
import { drainSpecialProps } from '../../types/index';
import { toSize } from '../../../../util/tools';
import { useConfigInject } from '../../../../util/hooks';
import { withInstall } from '../../../../util/type';
import '../../style/index.less';

const DrainSpecial = defineComponent({
  name: 'VcDrainSpecial',
  props: drainSpecialProps,
  setup(props, { slots }) {
    const { prefixCls } = useConfigInject('special', props);
    const pre = prefixCls.value;
    const { time } = props;
    const styl = computed(() => {
      const { width, height, outColor, borderWidth } = { ...props };
      return {
        width: toSize(width),
        height: toSize(height),
        background: outColor || 'transparent',
        '--border-width': toSize(borderWidth),
        '--time': time + 's'
      };
    });

    const innerStyl = computed(() => {
      const { innerColor } = { ...props };
      return {
        background: innerColor || 'transparent'
      };
    });

    const borderColor = computed(() => {
      const { colors } = { ...props };
      let background = '';
      if (typeof colors === 'string') {
        background = colors;
      } else if (Array.isArray(colors)) {
        let color = '';
        colors.forEach((item, index) => {
          color += `${item}` + (index + 1 === color.length ? '' : ',');
        });
        background = `linear-gradient(to right, ${color})`;
      }
      return {
        background
      };
    });
    return () => {
      return (
        <div class={prefixCls.value}>
          <div style={[styl.value, props.styl]} class={`${pre}__drain-box`}>
            <div class={'drain-line'} style={borderColor.value}></div>
            <div class={'drain-line'} style={borderColor.value}></div>
            <div class={'drain-line'} style={borderColor.value}></div>
            <div class={'drain-line'} style={borderColor.value}></div>
            <div style={innerStyl.value} class={'drain-inner'}>
              {slots.default && slots.default()}
            </div>
          </div>
        </div>
      );
    };
  }
});

export default withInstall(DrainSpecial);
