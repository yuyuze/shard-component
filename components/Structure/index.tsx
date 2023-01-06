import { defineComponent, computed } from 'vue';
import type { CSSProperties } from 'vue';
import useConfigInject from '../../util/hooks/useConfigInject';
import { withInstall } from '../../util/type';
import { toSize } from '../../util/tools';
import { getPropsSlot } from '../../util/props-util';
import { propTyps } from './type';

const Structure = defineComponent({
  name: 'VcStructure',
  props: propTyps(),
  setup(props, { slots }) {
    const { prefixCls } = useConfigInject('structure', props);
    return () => {
      const boxStyl = computed<CSSProperties>(() => {
        const { width, height, styl, block, pd, mg, tb } = props;
        const blockType = {
          inline: 'inline-flex',
          block: 'flex'
        };
        return {
          ...styl,
          width: toSize(width),
          height: toSize(height),
          gap: toSize(tb.gap),
          alignItems: tb.align,
          justifyContent: tb.justify,
          display: blockType[block],
          padding:
            typeof pd === 'number'
              ? toSize(pd)
              : pd.reduce((a, b) => `${a} ${toSize(b)}`, ''),
          margin:
            typeof mg === 'number'
              ? toSize(mg)
              : mg.reduce((a, b) => `${a} ${toSize(b)}`, '')
        };
      });

      const childEl = computed(() => {
        const top = getPropsSlot(slots, props, 'top');
        const bottom = getPropsSlot(slots, props, 'bottom');
        const left = getPropsSlot(slots, props, 'left');
        const right = getPropsSlot(slots, props, 'right');
        const center = getPropsSlot(slots, props, 'center');
        const { tcls, bcls, ccls, lcls, rcls } = props;
        const centerStyl = computed<CSSProperties>(() => {
          const { lr } = props;
          return {
            width: lr.justify || lr.align ? '100%' : 'auto',
            height: toSize(lr.height),
            gap: toSize(lr.gap),
            justifyContent: lr.justify,
            alignItems: lr.align
          };
        });

        return (
          <>
            {top && (
              <div class={[`${prefixCls.value}-top`, tcls, 'top']}>{top}</div>
            )}
            <div class={`${prefixCls.value}-center`} style={centerStyl.value}>
              {left && (
                <div class={[`${prefixCls.value}-left`, lcls, 'left']}>
                  {left}
                </div>
              )}
              {center && <div class={[ccls, 'vc-center']}>{center}</div>}
              {right && (
                <div class={[`${prefixCls.value}-right`, rcls, 'right']}>
                  {right}
                </div>
              )}
            </div>
            {bottom && (
              <div class={[`${prefixCls.value}-bottom`, bcls, 'bottom']}>
                {bottom}
              </div>
            )}
          </>
        );
      });
      return (
        <div class={[prefixCls.value, props.cls]} style={boxStyl.value}>
          {childEl.value}
        </div>
      );
    };
  }
});

export default withInstall(Structure);
