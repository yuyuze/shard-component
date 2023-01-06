import {
  computed,
  CSSProperties,
  defineComponent,
  onMounted,
  toRefs
} from 'vue';
import { string } from 'vue-types';
import { cloneDeep } from 'lodash';
import { useConfigInject } from '../../util/hooks';
import { withInstall } from '../../util/type';
import { toSize } from '../../util/tools';
import useHighCharts from './useHighCharts';
import { highPiePropsType } from './type';
import { injectHeightFn } from './util/index';
import './style/index.less';

const HighPie = defineComponent({
  name: 'HighPie',
  props: highPiePropsType(),
  setup(props, ctx) {
    const { prefixCls } = useConfigInject('highPie', props);
    const { echartEl, setOption } = useHighCharts();
    const { blockSlice, data, isHeightByData } = toRefs(props);
    const styl = computed<CSSProperties>(() => {
      return {
        width: props.width ? toSize(props.width) : '400px',
        height: props.height ? toSize(props.height) : '400px'
      };
    });

    const dealData = computed(() => {
      let arr = cloneDeep(data.value);
      arr = arr.map((item) => {
        return {
          ...item,
          y: item.value
        };
      });
      // 如果他是区块分隔
      if (blockSlice.value) {
        arr = arr.map((item) => {
          return {
            ...item,
            sliced: true
          };
        });
      }

      // 如果isHeightByData开启，优先级高的为本地配置的h属性
      if (isHeightByData.value) {
        injectHeightFn();
        let quantity = 0; // 总数
        arr.forEach((item) => {
          quantity += Number(item.y);
        });

        arr = arr.map((item) => {
          console.log(Number((Number(item.y) / quantity) * 100));
          console.log(item.bfb * 1.5 >= 70 ? 70 : item.bfb * 1.5);

          return {
            ...item,
            bfb: Number((Number(item.y) / quantity) * 100),
            h: item.h || (item.bfb * 1.5 >= 70 ? 70 : item.bfb * 1.5)
          };
        });
      }

      return arr;
    });
    onMounted(() => {
      console.log('dealData.value', dealData.value);
      const options = {
        chart: {
          type: 'pie',
          animation: true,
          options3d: {
            enabled: true, // 是否启用 3D 功能，默认是 false，设置为 true 开启 3D 功能
            alpha: 50, // x轴旋转角度
            beta: 0, // y轴旋转角度
            depth: 24, // 深度 饼图设置无效
            fitToPlot: true,
            viewDistance: 0, // 视距 3d图形的距离 柱状图和散列图生效
            frame: {
              // Frame框架，3D图包含柱的面板，我们以X ,Y，Z的坐标系来理解，X轴与 Z轴所形成
              // 的面为bottom，Y轴与Z轴所形成的面为side，X轴与Y轴所形成的面为back，bottom、
              // side、back的属性一样，其中size为感官理解的厚度，color为面板颜色
              bottom: {
                size: 1,
                color: 'transparent'
              },
              side: {
                size: 1,
                color: 'transparent'
              },
              back: {
                size: 1,
                color: 'transparent'
              }
            }
          }
        },
        title: {
          text: '2014年某网站不同浏览器访问量占比'
        },
        // tooltip: {
        //   pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        // },
        credits: {
          enabled: false // 隐藏Highcharts.com标识
        },
        plotOptions: {
          pie: {
            allowPointSelect: true, // 允许选择某个区块后弹出来
            cursor: 'pointer',
            depth: 35, // 高度
            center: ['40%', '40%'],
            innerSize: '80%', // 环形图内心大小

            dataLabels: {
              style: {
                textOutline: 'none' // 解决文字重影问题
              },
              // connectorWidth: 5, // 线宽
              distance: 20, // 线的距离
              enabled: true, // 是否显示label线
              rotation: 40, // 旋转label
              // backgroundColor: '#000',
              // format: '{point.name}',
              formatter(this: any) {
                // 可以为html
                return `<div style="color: red">${this.point.name}</div>`;
              }
            },
            // colors: [
            //   {
            //     linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            //     stops: [
            //       [0, '#003399'], // start
            //       [0.5, '#ffffff'], // middle
            //       [1, '#3366AA'], // end
            //     ],
            //   },
            //   {
            //     linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            //     stops: [
            //       [0, '#001111'], // start
            //       [0.5, '#ffffff'], // middle
            //       [1, '#33efed'], // end
            //     ],
            //   },
            //   {
            //     linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            //     stops: [
            //       [0, '#eee'], // start
            //       [0.5, '#ffffff'], // middle
            //       [1, '#eee'], // end
            //     ],
            //   },
            //   {
            //     linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            //     stops: [
            //       [0, 'red'], // start
            //       [0.5, '#ffffff'], // middle
            //       [1, '#eee'], // end
            //     ],
            //   },
            // ],
            // opacity: 0.5, // 透明值
            size: '25%', // 设置饼图大小
            endAngle: 360 // 末端角度 0 为顶部
          }
        },
        series: [
          {
            hoverAnimation: true,
            type: 'pie',
            name: '浏览器占比',
            pointInterval: 10,
            states: {
              inactive: {
                opacity: 1
              },
              hover: {
                halo: {
                  size: 30
                },
                color: {
                  linearGradient: { x1: 0, x2: 0, y1: 1, y2: 0 },
                  stops: [
                    [0, 'rgba(0, 184, 164, 0)'],
                    [1, 'rgba(0, 184, 164, 1']
                  ]
                }
              }
            },
            data: dealData.value
          }
        ]
      };
      setOption(options as any);
    });
    return () => (
      <>
        <div style={styl.value} class={`${prefixCls.value}-wrapper`}>
          <div ref={echartEl} class={prefixCls.value}></div>
        </div>
      </>
    );
  }
});

export default withInstall(HighPie);
