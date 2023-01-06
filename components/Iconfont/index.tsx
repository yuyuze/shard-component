import { computed, CSSProperties, defineComponent, onBeforeMount } from 'vue';
import { toSize } from '../../util/tools';
import { addScriptUrl } from '../../util/util';
import { withInstall } from '../../util/type';
import { useConfigInject } from '../../util/hooks';
import { iconfontProps, sizeEnum, sizeObj, sizeType } from './type';
import '../../assets/iconfont.js';

const Iconfont = defineComponent({
  inheritAttrs: false,
  name: 'VcIconfont',
  props: iconfontProps(),
  emits: ['click'],
  setup(props, { emit }) {
    const { prefixCls } = useConfigInject('iconfont', props);
    onBeforeMount(() => {
      // 加载svg资源的cdn地址，不稳定
      // const url = import.meta.env.DEV
      //   ? iconfont
      //   : '//at.alicdn.com/t/c/font_3739798_mruhbe9kyv9.js';
      // addScriptUrl(url);
    });

    const styl = computed<CSSProperties>(() => {
      const size = sizeType.includes(props.size as sizeEnum)
        ? sizeObj[props.size]
        : toSize(props.size);
      return {
        width: toSize(props.width) || size,
        height: toSize(props.height) || size,
        '--duration': props.duration ? props.duration + 's' : '0.5s'
      };
    });
    return () => {
      return (
        <>
          <div
            class={[`${prefixCls.value}__box`].concat(
              Array.isArray(props.boxCls) ? props.boxCls : [props.boxCls]
            )}
            onClick={(event) => {
              emit('click', event);
            }}
          >
            <svg
              class={[prefixCls.value, props.cls]}
              style={[props.style, styl.value]}
              aria-hidden='true'
            >
              <use
                class={'use__link'}
                ref={'use'}
                fill={props.color || '#000'}
                xlinkHref={props.href}
              ></use>
            </svg>
          </div>
        </>
      );
    };
  }
});

export default withInstall(Iconfont);
