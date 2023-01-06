import { defineComponent, computed, onMounted, watch } from 'vue';
import { array, bool, number, object } from 'vue-types';
import 'echarts';
import { merge } from 'lodash';
import vueTypes from '../../util/vue-types';
import { getPie3D, getParametricEquation } from './util/chart.js'; // 工具类js，页面路径自己修改
import { useEcharts } from '../../util/hooks';
import { toSize } from '../../util/tools';
import { withInstall } from '../../util/type';
import 'echarts-gl';

const themeColor = [
  // '#805500',
  // '#ffff00',
  // '#ffd11a',
  // '#f2d71f',
  // '#f2be19',
  '#f2385a',
  '#f5a503',
  '#4ad9d9',
  '#f7879c',
  '#c1d7a8',
  '#4dffd2',
  '#fccfd7',
  '#d5f6f6',
  '#f3a81a',
  '#fff5cc'
];
const D3Pie = defineComponent({
  name: 'DimensionalPie',
  props: {
    width: vueTypes.unit.def('100%'), // 图形宽度
    height: vueTypes.unit.def('100%'), // 图形高度
    data: array<any>().def([]),
    color: array<string>().def([]),
    extend: object<any>().def({}),
    grid: object<{
      left?: number;
      top?: number;
      right?: number;
      bottom?: number;
    }>().def({
      left: 0,
      top: 0
    }),
    linePieOption: object().def({}),
    center: array<string>().def(['50%', '50%']),
    // 透明的空心占比
    internalDiameterRatio: number().def(0.8),
    // 视角到主体的距离
    distance: number().def(240),
    // 旋转角度
    alpha: number().def(28),
    // 立体的高度
    pieHeight: number().def(26),
    // 饼或者环的透明度
    opacity: number().def(0.7),
    // 自动旋转
    autoRotate: bool().def(false)
  },
  setup(props, ctx) {
    const { EchartsEl, initEcharts, setOption, autoMatic } = useEcharts();
    const styl = computed(() => {
      const { width, height } = { ...props };
      return {
        width: toSize(width),
        height: toSize(height)
      };
    });

    function dealOptionTo3D() {
      const colors = [...props.color, ...themeColor];
      const options = props.data.map((item, index) => {
        return {
          ...item,
          itemStyle: {
            color: colors[index % colors.length] || 'rgb(93, 188, 196)'
          },

          label: {
            normal: {
              show: true,
              color: colors[index % colors.length] || 'rgb(93, 188, 196)'
              // formatter: ['{b|{b}}', '{c|{c}}{b|台}', '{d|{d}%}'].join(''),
              // rich: {
              //   b: {
              //     color: '#fff',
              //     lineHeight: 25,
              //     align: 'left'
              //   },
              //   c: {
              //     fontSize: 22,
              //     color: '#fff',
              //     textShadowColor: '#1c90a6',
              //     textShadowOffsetX: 0,
              //     textShadowOffsetY: 2,
              //     textShadowBlur: 5
              //   },
              //   d: {
              //     color: props.color[index],
              //     align: 'left'
              //   }
              // }
            }
          },
          labelLine: {
            normal: {
              lineStyle: {
                width: 1,
                color: 'rgba(255,255,255,0.7)'
              }
            }
          }
        };
      });
      const dealOptions = getPie3D(
        options,
        props.internalDiameterRatio,
        props.distance,
        props.alpha,
        props.pieHeight,
        props.opacity,
        props.extend,
        props.autoRotate,
        props.grid
      );
      (dealOptions as any).series.push(
        merge(
          {
            name: '电梯状态', // 自己根据场景修改
            backgroundColor: 'transparent',
            type: 'pie',
            label: {
              opacity: 1,
              fontSize: 13,
              lineHeight: 20
            },
            startAngle: -40, // 起始角度，支持范围[0, 360]。
            clockwise: false, // 饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
            radius: ['20%', '50%'],
            center: props.center,
            data: options,
            itemStyle: {
              opacity: 0 // 这里必须是0，不然2d的图会覆盖在表面
            }
          },
          props.linePieOption
        )
      );
      return dealOptions;
    }
    watch(
      [() => props.data, () => props.extend],
      (n, o) => {
        const dealOption = dealOptionTo3D();
        setOption(dealOption as any);
      },
      {
        deep: true
      }
    );
    onMounted(() => {
      initEcharts('canvas');
      const dealOption = dealOptionTo3D();
      setOption(dealOption as any);
    });
    return () => (
      <>
        <div style={styl.value} ref={EchartsEl}>
          这是一个三维图表组件
        </div>
      </>
    );
  }
});

export default withInstall(D3Pie);
