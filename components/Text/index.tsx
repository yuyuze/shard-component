import { defineComponent, computed, CSSProperties } from 'vue';
import { isBoolean, isString, isNumber } from 'lodash';
import { number, bool, string, array } from 'vue-types';
import dayjs from 'dayjs';
import { withInstall, tuple } from '../../util/type';
import { toSize } from '../../util/tools';
import { getPropsSlot } from '../../util/props-util';
import { useConfigInject } from '../../util/hooks';
import PropsTypes from '../../util/vue-types';
import classNames from '../../util/classNames';

const Text = defineComponent({
  name: 'VcText',
  inheritAttrs: false,
  props: {
    type: PropsTypes.oneOf(tuple('text', 'date')).def('text'),
    width: PropsTypes.unit,
    height: PropsTypes.unit,
    color: PropsTypes.oneOfType([string(), array<string>()]),
    val: PropsTypes.any,
    // eslint-disable-next-line vue/no-reserved-props
    style: PropsTypes.style,
    ellipsis: PropsTypes.oneOfType([bool().def(false), number()]),
    block: PropsTypes.bool.def(false),
    format: PropsTypes.oneOfType([bool().def(false), string()]),
    cls: PropsTypes.string,
    fz: PropsTypes.unit,
    fw: PropsTypes.oneOf(tuple('normal', 'bold', 'inherit')),
    // align:PropsTypes.oneOf(tuple('center','left','right')),
    shadow: PropsTypes.bool.def(false),
    offset: PropsTypes.offset.def([5, 5]),
    directive: PropsTypes.string.def('to bottom'),
    shadowColor: PropsTypes.string.def('#000'),
    shadowBlur: PropsTypes.number.def(1),
    title: PropsTypes.string.def('')
  },
  emits: ['click', 'mousemove'],
  setup(props, { slots, emit }) {
    const { prefixCls } = useConfigInject('text', props);
    const pre = prefixCls.value;
    const defaultNode = computed(() => {
      const vnode = getPropsSlot(slots, props);
      const { format, val } = { ...props };
      let value;
      try {
        value = val ?? vnode[0].children;
      } catch (e) {
        value = '';
      }
      if (format && typeof format === 'boolean') {
        return dayjs(new Date(value)).format('YYYY-MM-DD');
      }
      if (format && typeof format === 'string') {
        return dayjs(new Date(value)).format(format);
      }
      return value ?? vnode;
    });

    // 省略号处理
    const ellipsis = computed(() => {
      const { ellipsis } = { ...props };
      if (isBoolean(ellipsis)) return ellipsis ? 1 : '';
      if (!Number.isNaN(Number(ellipsis))) return Number(ellipsis);
      return '';
    });

    // 渐变处理
    const colorStyl = computed(() => {
      const { color } = { ...props };
      let colorObj = {};
      // 文本颜色
      if (isString(color)) {
        colorObj = {
          color
        };
      }
      // 渐变颜色
      if (color instanceof Array) {
        colorObj = {
          '--bgGradual': `${color.join(',')}`
        };
      }
      return colorObj;
    });

    const styl = computed(() => {
      const { width, height, block, fz, fw } = { ...props };
      return {
        width: toSize(width),
        height: toSize(height),
        display: block ? 'block' : '',
        fontSize: toSize(fz),
        fontWeight: fw,
        '--ellipsisLen': ellipsis.value,
        '--directive': props.directive,
        ...colorStyl.value,
        ...props.style
      };
    });
    // 阴影样式
    const shadowStyl = computed(
      (): CSSProperties =>
        ({
          '--shadow-show': props.shadow ? 'block' : 'none',
          '--shadow-offset-x': isNumber(props.offset[0])
            ? props.offset[0] + 'px'
            : props.offset[0],
          '--shadow-offset-y': isNumber(props.offset[1])
            ? props.offset[1] + 'px'
            : props.offset[1],
          '--shadow-color': props.shadowColor,
          '--shadow-blur': props.shadowBlur + 'px'
        } as CSSProperties)
    );
    const cls = classNames(pre, props.cls, {
      [`${pre}-ellipsis`]: ellipsis.value,
      [`${pre}-gradual`]: JSON.stringify(colorStyl.value).includes(
        '--bgGradual'
      )
    });

    return () => (
      <div
        title={props.title}
        class={cls}
        style={{
          ...(styl.value as any),
          ...shadowStyl.value
        }}
        onClick={() => emit('click')}
        onMousemove={() => emit('mousemove')}
        data-content={props.val}
      >
        {defaultNode.value}
      </div>
    );
  }
});

export default withInstall(Text);
