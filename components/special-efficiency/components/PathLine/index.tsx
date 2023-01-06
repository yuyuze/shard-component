/* eslint-disable indent */
import { computed, CSSProperties, defineComponent, SVGAttributes } from 'vue';
import { toSize } from '../../../../util/tools';
import { pathLineSpecialProps } from '../../types/index';
import { useConfigInject } from '../../../../util/hooks';
import { withInstall } from '../../../../util/type';
import { useDealColor } from './useDealColor';
import '../../style/pathLine.less';

const PathLineSpecial = defineComponent({
  name: 'VcPathLineSpecial',
  props: pathLineSpecialProps,
  setup(props) {
    const { prefixCls } = useConfigInject('special', props);
    // 防止id重复
    const key = Math.random();
    const {
      width,
      height,
      time,
      animationTimingFunction,
      startStrokeDashoffset,
      endStrokeDashoffset
    } = props;
    const baseLinePathConfig: SVGAttributes = {
      'fill-rule': 'evenodd',
      'stroke-width': '2px',
      'stroke-linecap': 'butt',
      'stroke-linejoin': 'miter',
      stroke: `url(#vc_line_gradient${key})`,
      fill: 'none'
    };

    const basePointPathConfig: SVGAttributes = {
      'fill-rule': 'evenodd',
      'stroke-width': '2px',
      'stroke-linecap': 'butt',
      'stroke-linejoin': 'miter',
      stroke: `url(#vc_point_gradient${key})`,
      fill: 'none'
    };

    const animationPathStyle = computed<CSSProperties>(() => {
      return {
        '--time': time + 's',
        '--animationTimingFunction': animationTimingFunction,
        '--endStrokeDashoffset': endStrokeDashoffset,
        '--startStrokeDashoffset': startStrokeDashoffset
      };
    });
    function createPath() {
      return (
        <>
          <path
            class={[
              'g-rect-path',
              props.isAnimation && 'g-rect-path--animation'
            ]}
            {...{ ...baseLinePathConfig, ...props.linePathAttr }}
            d={props.path}
          />
          <path
            style={animationPathStyle.value}
            class={[
              'g-rect-fill',
              props.isAnimation && 'g-rect-fill--animation'
            ]}
            {...{ ...basePointPathConfig, ...props.pointPathAttr }}
            d={props.path}
          />
        </>
      );
    }

    /**
     * 创建path路线渐变
     */
    const createLinearGradient = computed(() => {
      const res = useDealColor(props.pathColors);
      if (typeof res === 'string') {
        return (
          <>
            <linearGradient
              id={`vc_line_gradient${key}`}
              x1='0%'
              x2='100%'
              y1='0%'
              y2='0%'
            >
              <stop stop-color={res} stop-opacity='1' />
            </linearGradient>
          </>
        );
      }

      return (
        <>
          <linearGradient
            id={`vc_line_gradient${key}`}
            x1={res.x1}
            x2={res.x2}
            y1={res.y1}
            y2={res.y2}
          >
            {res.attr.map((item) => {
              const linearAttr = {
                ...(item.offset
                  ? {
                      offset: item.offset
                    }
                  : {}),
                ...{
                  'stop-opacity':
                    item.stopOpacity === undefined ? 1 : item.stopOpacity
                }
              };
              return <stop {...linearAttr} stop-color={item.stopColor} />;
            })}
          </linearGradient>
        </>
      );
    });

    /**
     * 创建运动点渐变
     */
    const createPointGradient = computed(() => {
      const res = useDealColor(props.pointColors);
      if (typeof res === 'string') {
        return (
          <>
            <linearGradient
              id={`vc_point_gradient${key}`}
              x1='0%'
              x2='100%'
              y1='0%'
              y2='0%'
            >
              <stop stop-color={res} stop-opacity='1' />
            </linearGradient>
          </>
        );
      }

      return (
        <>
          <linearGradient
            id={`vc_point_gradient${key}`}
            x1={res.x1}
            x2={res.x2}
            y1={res.y1}
            y2={res.y2}
          >
            {res.attr.map((item) => {
              const linearAttr = {
                ...(item.offset
                  ? {
                      offset: item.offset
                    }
                  : {}),
                ...{
                  'stop-opacity':
                    item.stopOpacity === undefined ? 1 : item.stopOpacity
                }
              };
              return <stop stop-color={item.stopColor} {...linearAttr} />;
            })}
          </linearGradient>
        </>
      );
    });
    const styl = computed<CSSProperties>(() => {
      return {};
    });

    return () => {
      return (
        <div class={prefixCls.value}>
          <div class={`${prefixCls.value}__path-line`} style={styl.value}>
            <svg
              width={width}
              height={height}
              class={props.svgCls}
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
            >
              <defs>
                {createLinearGradient.value}
                {createPointGradient.value}
              </defs>
              {createPath()}
            </svg>
          </div>
        </div>
      );
    };
  }
});

export default withInstall(PathLineSpecial);
