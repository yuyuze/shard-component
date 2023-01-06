import { defineComponent, computed } from 'vue';
import { getPropsSlot } from '../../util/props-util';
import classNames from '../../util/classNames';
import { useConfigInject } from '../../util/hooks';
import CountTo from '../vc-count-to';
import numProps from './Numtype';
import { withInstall } from '../../util/type';

const Props = numProps();

export const Num = defineComponent({
  name: 'VcNum',
  props: Props,
  emits: ['click'],
  inheritAttrs: false,
  setup(props, { emit, slots }) {
    const { prefixCls } = useConfigInject('num', props);
    const cls = classNames(prefixCls.value, props.cls, {});
    const handlerClick = () => {
      emit('click');
    };
    const pre = prefixCls.value;
    let startVal = 0;
    return () => {
      const styl = {
        ...props.style
      };
      const defaultNode = computed(() => {
        const {
          animate = true,
          duration = 3000,
          separator = '',
          decimals = 2,
          isMandatory = false,
          isMemory = false
        } = {
          ...props
        };

        const endVal = Number(props.val);
        // 如果 num 为字符串
        if (Number.isNaN(endVal)) {
          return <span>{props.val}</span>;
        }
        const option = {
          duration: animate ? Number(duration) : 0,
          separator
        };
        // 是否有小数点
        if (String(endVal).includes('.') || isMandatory) {
          Object.assign(option, {
            decimal: '.',
            decimals
          });
        }
        const VNode = (
          <CountTo startVal={startVal} endVal={endVal} {...option}></CountTo>
        );
        // 是否记忆已使用的值
        if (isMemory) {
          startVal = endVal;
        }
        return VNode;
      });
      const suffix = getPropsSlot(slots, props, 'suffix');
      return (
        <div class={cls} onClick={handlerClick} style={styl}>
          <div class={`${pre}-value`}>{defaultNode.value}</div>
          {suffix && <span class={`${pre}-suffix`}>{` ${suffix}`}</span>}
        </div>
      );
    };
  }
});

export default withInstall(Num);
