/*
 * @Descripttion:
 * @version:
 * @Author: congsir
 * @Date: 2022-11-10 21:57:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-11 00:24:08
 */
import { computed, CSSProperties, defineComponent } from 'vue';
import Iconfont from '../../../Iconfont/index';
import { neonLightSpecialProps } from '../../types/index';
import { useConfigInject } from '../../../../util/hooks';
import { stringToRGB } from '../../../../util/util';
import { toSize } from '../../../../util/tools';
import { withInstall } from '../../../../util/type';
import '../../style/neonLight.less';
import { getPropsSlot } from '../../../../util/props-util';

const NeonLightSpecial = defineComponent({
  name: 'VcNeonLightSpecial',
  props: neonLightSpecialProps,
  setup(props, { slots }) {
    const { prefixCls } = useConfigInject('special', props);
    const styl = computed<CSSProperties>(() => {
      return {
        width: toSize(props.width),
        height: toSize(props.height),
        '--color': `rgba(${stringToRGB(props.color).r}, ${
          stringToRGB(props.color).g
        },${stringToRGB(props.color).b}, 1)`,
        '--expand-width': toSize(props.expandWidth),
        '--time': props.time + 's',
        '--init-color': `rgba(${stringToRGB(props.color).r}, ${
          stringToRGB(props.color).g
        },${stringToRGB(props.color).b}, ${props.opacity})`
      };
    });

    const defaultNode = computed(() => {
      return getPropsSlot(slots, props);
    });

    return () => {
      return (
        <div
          class={[
            props.isShowOutLight &&
              `${prefixCls.value}__neon-light${
                props.shadowPosition.length ? '-inset' : ''
              }`,
            props.isShowOutLight &&
              props.isAnimation &&
              `${prefixCls.value}__neon-light-animation`,
            props.isShowOutLight &&
              props.isAnimation &&
              `${prefixCls.value}__neon-light${
                props.shadowPosition.length ? '-inset-animation' : ''
              }`,
            props.cls
          ]}
          style={[styl.value, props.styl]}
        >
          {props.iconHref && (
            <Iconfont
              size={props.width}
              href={props.iconHref}
              boxCls={[
                `${prefixCls.value}__neon-icon`,
                props.isShowIconLight
                  ? `${prefixCls.value}__neon-icon--shadow`
                  : '',
                props.isAnimation && props.isShowIconLight
                  ? `${prefixCls.value}__neon-icon--shadow-animation`
                  : ''
              ]}
            ></Iconfont>
          )}
          {defaultNode.value}
        </div>
      );
    };
  }
});

export default withInstall(NeonLightSpecial);
