import { defineComponent, computed } from 'vue';
import { isString, isArray } from 'lodash';
import useConfigInject from '../../util/hooks/useConfigInject';
import { withInstall } from '../../util/type';
import { toSize } from '../../util/tools';
import { getPropsSlot } from '../../util/props-util';
import { propsTypes } from './type';

const Shape = defineComponent({
  name: 'VcShape',
  props: propsTypes(),
  setup(props, { slots }) {
    const { prefixCls } = useConfigInject('shape', props);
    const defaultNode = computed(() => {
      return getPropsSlot(slots, props);
    });
    const TypeNode = computed(() => {
      const { type, width, color } = props;
      const baseStyl = {
        width: toSize(width)
      };
      // 文本颜色
      if (isString(color)) {
        Object.assign(baseStyl, {
          background: color
        });
      }
      if (isArray(color)) {
        Object.assign(baseStyl, {
          '--bgGradual': `${color.join(',')}`
        });
      }

      switch (type) {
        case 'circle': {
          const { width } = props;
          return (
            <div
              class={`${prefixCls.value}-circle`}
              style={{
                ...baseStyl,
                height: toSize(width)
              }}
            ></div>
          );
        }
        case 'rect': {
          const { height, radius } = props;
          return (
            <div
              class={`${prefixCls.value}-rect`}
              style={{
                ...baseStyl,
                height: toSize(height),
                borderRadius: toSize(radius)
              }}
            ></div>
          );
        }
        default: {
          return <div class={`${prefixCls.value}-circle`}></div>;
        }
      }
    });
    return () => <div class={`${prefixCls.value}`}>{TypeNode.value}</div>;
  }
});

export default withInstall(Shape);
