import { defineComponent, computed } from 'vue';
import type { CSSProperties } from 'vue';
import { oneOfType } from 'vue-types';
import useConfigInject from '../../util/hooks/useConfigInject';
import { withInstall, tuple } from '../../util/type';
import { getPropsSlot } from '../../util/props-util';
import { toSize } from '../../util/tools';
import vueTypes from '../../util/vue-types';
import type { Size } from '../../util/type';

const Position = tuple('absolute', 'fixed');

const Container = defineComponent({
  name: 'VcAffix',
  props: {
    width: vueTypes.unit,
    height: vueTypes.unit,
    top: vueTypes.unit,
    bottom: vueTypes.unit,
    left: vueTypes.unit,
    right: vueTypes.unit,
    bg: vueTypes.string,
    z: vueTypes.number,
    // eslint-disable-next-line vue/no-reserved-props
    style: vueTypes.style,
    padding: oneOfType<Size | Size[]>([String, Array]),
    position: vueTypes.oneOf(Position).def('absolute')
  },
  emits: ['click'],
  setup(props, { slots, emit }) {
    const { prefixCls, api } = useConfigInject('affix', props);
    const styl = computed<CSSProperties>(() => {
      const {
        width,
        height,
        position,
        style,
        padding,
        top,
        left,
        bottom,
        right,
        bg,
        z
      } = { ...props };
      function isImg(val) {
        const isImage = /.(png|jpg|gif|jpeg|webp)$/;
        const isBase64 = /data:image\/.*;base64,/;
        if (isImage.test(val) || isBase64.test(val)) {
          return true;
        }
        return false;
      }
      return {
        width: toSize(width),
        height: toSize(height),
        padding:
          typeof padding !== 'object'
            ? toSize(padding)
            : padding.map((e) => toSize(e)).join(' '),
        top: toSize(top),
        left: toSize(left),
        bottom: toSize(bottom),
        right: toSize(right),
        position,
        background: isImg(bg) ? `url(${bg})` : bg,
        zIndex: z,
        ...style
      };
    });

    return () => {
      const defaultNode = computed(() => {
        return getPropsSlot(slots, props);
      });
      return (
        <div
          class={prefixCls.value}
          style={styl.value}
          onClick={() => emit('click')}
        >
          {defaultNode.value}
        </div>
      );
    };
  }
});

export default withInstall(Container);
