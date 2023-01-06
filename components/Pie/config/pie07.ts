import { log } from 'console';
import { merge } from 'lodash';
import type { PieSeriesOption } from 'echarts';
import { resetForm, generateBorder } from '../type';
import type { Config } from '../type';
import { stringToRGB } from '../../../util/util';
import { graphic } from 'echarts';

type AutoMatic = {
  autoMatic: Function;
  timer: number;
  autoCustomTimer: boolean;
};

const defaultColor = [
  'rgb(26, 140, 255)',
  'rgb(223, 157, 84)',
  'rgb(13, 218, 169)',
  'rgb(223, 235, 255)',
  'rgb(46, 89, 238)',
  'rgb(43, 215, 235)'
];

// 动画开始的索引
let currentIndex = 0;

// 定时器
let timer = null;
// eslint-disable-next-line default-param-last
export default {
  pieConfig: (
    data: PieSeriesOption['data'] = [],
    configure: Config = {},
    auto: AutoMatic = {
      autoMatic: () => {},
      timer: 3000,
      autoCustomTimer: true
    }
  ) => {
    auto.autoMatic(data.length, auto.timer);
    const config = resetForm(configure);
    const { center, border, customize, color } = config;

    const borderList = generateBorder(border, config);
    const {
      label = true,
      richColor = '#000',
      innerCircleSize = '80%'
    } = customize;
    const configColor = color.length > 0 ? color : defaultColor;
    return merge(
      {
        color: configColor,
        title: [
          {
            text: '',
            left: 'center',
            // align: 'center',
            top: '30%',
            textStyle: {
              fontSize: '16px',
              color: 'rgba(240, 242, 245, 1)',
              fontFamily: 'Din'
            }
          },
          {
            text: '',
            left: 'center',
            align: 'center',
            top: '50%',
            textStyle: {
              fontSize: '12px',
              color: 'rgba(37, 128, 255, 1)',
              fontFamily: 'Din'
            }
          }
        ],
        tooltip: {
          show: false
        },
        legend: {
          show: false,
          top: 0,
          left: 120,
          height: 108,
          itemGap: 15,
          orient: 'vertical',
          data,
          textStyle: {
            color: '#fff'
          }
        },
        series: [
          {
            type: 'pie',
            center: ['50%', '50%'],
            animation: false,
            hoverAnimation: false,
            radius: ['90%', '70%'],
            clockWise: true,
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
              color: '#fff'
            },
            labelLine: {
              show: false
            },
            emphasis: {
              scale: false,
              label: {
                show: label,
                color: '#fff',
                fontSize: '14',
                fontFamily: 'PingFang',
                formatter: (a) => {
                  const list = Object.entries(configColor);
                  console.log(111, a);

                  return `{${list[a.dataIndex][0]}|${a.name}}\n{value|${
                    a.percent + '%'
                  }}`;
                },
                rich: Object.assign(
                  {},
                  Object.entries(configColor).reduce((a, [key, value]) => {
                    a[key] = {
                      fontSize: '10%',
                      fontWeight: 'bold',
                      color: value
                    };
                    return a;
                  }, {}),
                  {
                    value: {
                      lineHeight: 20,
                      fontSize: '13%',
                      fontWeight: 'bold',
                      color: richColor
                    }
                  }
                )
              },
              labelLine: {
                show: false
              }
            },
            data,
            itemStyle: {
              color: (list) => {
                const colorList = [
                  {
                    colorStart: 'rgba(8, 33, 54, 0.8)',
                    colorEnd: 'rgba(50, 108, 241, 1)'
                  },
                  {
                    colorStart: 'rgba(8, 33, 54, 0.8)',
                    colorEnd: 'rgba(223, 180, 79, 1)'
                  },
                  {
                    colorStart: 'rgba(8, 33, 54, 0.8)',
                    colorEnd: 'rgba(8, 235, 154, 1)'
                  },
                  {
                    colorStart: 'rgba(26, 36, 68, 0.8)',
                    colorEnd: 'rgba(255, 143, 143, 1)'
                  }
                ];
                if (list.dataIndex === 1) {
                  return new graphic.LinearGradient(1, 0, 0, 0, [
                    {
                      offset: 0,
                      color: colorList[list.dataIndex].colorStart
                    },
                    {
                      offset: 1,
                      color: colorList[list.dataIndex].colorEnd
                    }
                  ]);
                }
                if (list.dataIndex === 2) {
                  return new graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: colorList[list.dataIndex].colorStart
                    },
                    {
                      offset: 1,
                      color: colorList[list.dataIndex].colorEnd
                    }
                  ]);
                }
                return new graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: colorList[list.dataIndex].colorStart
                  },
                  {
                    offset: 1,
                    color: colorList[list.dataIndex].colorEnd
                  }
                ]);
              }
            }
          },
          {
            name: '',
            type: 'gauge',
            // splitNumber: 10, //刻度数量
            min: 0,
            max: 100,
            center: ['50%', '50%'],
            // radius: ["44%", "45%"],
            startAngle: 359.9, // 开始刻度的角度
            radius: innerCircleSize, // 统计图的半径大小
            endAngle: 0, // 结束刻度的角度
            axisLine: {
              show: true,
              lineStyle: {
                width: 0,
                shadowBlur: 0,
                color: [[1, 'rgba(2, 115, 131, 1)']]
              }
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: 'auto',
                width: 2
              },
              length: 3,
              splitNumber: 5
            },
            splitLine: {
              show: false,
              length: 22,
              lineStyle: {
                color: 'auto'
              }
            },
            axisLabel: {
              show: false
            },
            pointer: {
              // 仪表盘指针
              show: 0
            },
            detail: {
              show: 0
            }
          }
        ]
      },
      config,
      {
        autoCustomTimer: auto.autoCustomTimer
      }
    );
  },
  handleDataContent: (
    data: any,
    config: Config = {},
    setOption: (Config) => void
  ) => {}
};
