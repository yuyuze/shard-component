import { log } from 'console';
import { merge } from 'lodash';
import type { PieSeriesOption } from 'echarts';
import { resetForm, generateBorder } from '../type';
import type { Config } from '../type';
import { stringToRGB } from '../../../util/util';

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
    const { center, border } = config;
    const borderList = generateBorder(border, config);

    return merge(
      {
        grid: {
          left: 0,
          top: 0,
          bottom: 0,
          right: 0
        },
        color: defaultColor,
        tooltip: [
          {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
          },
          {
            name: 'progress',
            show: false
          }
        ],
        title: [
          {
            z: 999,
            left: '45%',
            top: '30%',
            textAlign: 'center',
            textBaseline: 'bold',
            textStyle: {
              color: 'rgb(26, 140, 255)',
              fontWeight: 'normal',
              fontSize: 12
            }
          },
          {
            z: 999,
            left: '45%',
            top: '60%',
            textAlign: 'center',
            textBaseline: 'middle',
            textStyle: {
              color: 'rgb(26, 140, 255)',
              fontWeight: 'bold',
              fontSize: 12
            }
          }
        ],
        series: [
          {
            type: 'pie',
            animation: false,
            hoverAnimation: false, // 设置饼图默认的展开样式
            radius: ['90%', '74%'],
            clockwise: true,
            startAngle: 90,
            label: {
              normal: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                borderWidth: 3,
                borderColor: 'rgb(8, 26, 43)'
              },
              emphasis: {
                shadowBlur: 5,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0)',
                borderWidth: 3,
                borderColor: 'rgb(8, 26, 43)'
              }
            },
            data
          },
          {
            type: 'pie',
            id: 'progress',
            z: 22,
            animation: false,
            hoverAnimation: false, // 设置饼图默认的展开样式
            center: ['50%', '50%'],
            radius: [0, '69%'],
            tooltip: {
              show: false
            },
            data: [
              {
                name: '',
                value: 0,
                itemStyle: {
                  color: 'rgba(26, 140, 255, 0.2)'
                }
              },
              {
                name: '',
                value: 100,

                itemStyle: {
                  color: 'rgba(8, 26, 43, 0)'
                }
              }
            ]
          },
          {
            type: 'pie',
            z: -1,
            animation: false,
            hoverAnimation: false, // 设置饼图默认的展开样式
            center: ['50%', '50%'],
            radius: [0, '69%'],
            tooltip: {
              show: false
            },
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                },
                borderColor: 'rgb(21, 141, 155)',
                borderWidth: 2,
                borderType: 'dashed'
              }
            },

            data: [
              {
                name: '',
                value: 100,
                itemStyle: {
                  color: 'rgba(255,255,255,0)'
                }
              }
            ]
          },
          {
            type: 'pie',
            z: -1,
            animation: false,
            hoverAnimation: false, // 设置饼图默认的展开样式
            center: ['50%', '50%'],
            radius: [0, '97%'],
            tooltip: {
              show: false
            },
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                },
                borderColor: 'rgb(21, 141, 155)',
                borderWidth: 2,
                borderType: 'dashed'
              }
            },

            data: [
              {
                name: '',
                value: 100,
                itemStyle: {
                  color: 'rgba(255,255,255,0)'
                }
              }
            ]
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
  ) => {
    let sum = 0;
    const configColor = (
      typeof config.color === 'string' ? [config.color] : config.color
    ) as string[];
    const color = configColor || defaultColor;
    const innerColor = color.map((item) => {
      if (typeof item === 'string') {
        const colorObj = stringToRGB(item);
        if (colorObj) {
          return `rgba(${colorObj.r}, ${colorObj.g}, ${colorObj.b}, 0.2)`;
        }
        return 'rgba(26, 140, 255, 0.2)';
      }
      return 'rgba(26, 140, 255, 0.2)';
    });
    data.map((item) => {
      sum += Number(item.value);
    });

    // 是否开启自定义动画
    if (config.autoCustomTimer) {
      checkEchartIndex(setOption, data, sum, config, color, innerColor);
      timer = setInterval(() => {
        checkEchartIndex(setOption, data, sum, config, color, innerColor);
      }, 5000);
    } else {
      clearInterval(timer);
      timer = null;
    }
  }
};

function checkEchartIndex(
  setOption,
  data: {
    name: string;
    value: number;
  }[],
  sum: number,
  config: Config = {},
  color: string[],
  innerColor: string[]
) {
  const index = currentIndex % data.length;
  const value: any = ((data[index].value / sum) * 100).toFixed(2);

  const opt = merge(config, {
    title: [
      {
        text: data[index].name || '',
        textStyle: {
          color: color[index]
        }
      },
      {
        text: data[index].value || '',
        textStyle: {
          color: color[index]
        }
      }
    ],
    series: [
      {},
      {
        data: [
          {
            value,
            itemStyle: {
              color: innerColor[index]
            }
          },
          {
            value: 100 - value
          }
        ]
      }
    ]
  });

  setOption(opt);
  currentIndex += 1;
  return opt;
}
