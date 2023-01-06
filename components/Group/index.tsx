import { computed, defineComponent } from 'vue';
import type { CSSProperties } from 'vue';
import { toSize } from '../../util/tools';
import { useConfigInject } from '../../util/hooks';
import { withInstall } from '../../util/type';
import { getPropsSlot, filterEmpty } from '../../util/props-util';
import { groupProps } from './type';

const Group = defineComponent({
  name: 'VcGroup',
  props: groupProps(),
  setup(props, { slots }) {
    const { prefixCls } = useConfigInject('group', props);
    const styl = computed<CSSProperties>(() => {
      const {
        align,
        justify,
        inline,
        spacing,
        direction,
        padding,
        bg,
        wrap,
        width,
        height
      } = {
        ...props
      };
      return {
        display: inline ? 'inline-flex' : '',
        alignItems: align,
        justifyContent: justify,
        gap:
          typeof spacing !== 'object'
            ? toSize(spacing)
            : spacing.map((e) => toSize(e)).join(' '),
        flexDirection: direction,
        padding:
          typeof padding !== 'object'
            ? toSize(padding)
            : padding.map((e) => toSize(e)).join(' '),
        background: bg,
        flexWrap: wrap,
        width: toSize(width),
        height: toSize(height)
      };
    });
    return () => {
      const list = filterEmpty(getPropsSlot(slots, props));
      return (
        <div
          style={[props.style, styl.value]}
          class={[prefixCls.value, props.cls]}
        >
          {list.map(
            (e) =>
              // <div class={`${prefixCls.value}-item`}>{e}</div>
              e
          )}
        </div>
      );
    };
  }
});

export default withInstall(Group);
