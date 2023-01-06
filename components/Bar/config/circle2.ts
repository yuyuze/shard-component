import { isArray, isObject } from 'lodash';
import { resetConfig } from '../type';
import type { Config } from '../type';
import { hadnlerColor } from '../../../util/chart';

export default (data, config: Config = {}) => {
  let dataset = {
    source: []
  };
  if (isObject(data)) {
    if (isArray(data)) {
      dataset.source = data;
    } else {
      dataset = data as any;
    }
  }
  // const { color } = resetConfig(config);
  const colors = [];
  // const yList = [32, 58, 64, 64];
  const yList = data.slice(1).map((e) => e[1]);
  const xList = [10, 55, 44, 55];
  // const xData = ['学前', '小学', '初中', '高中'];
  const xData = data.slice(1).map((e) => e[0]);
  const color = [
    '#CC1CAA',
    '#8D67FF',
    '#00FFFF',
    '#48DE13',
    '#FFC516',
    '#DC3E14',
    '#8E16F8'
  ];

  const barWidth = 30;
  for (let i = 0; i < 4; i++) {
    colors.push({
      type: 'linear',
      x: 0,
      x2: 0,
      y: 1,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: '#005c8e' // 底部的颜色
        },
        // {
        //   offset: 0.5,
        //   color: '#008db5' // 中间的颜色
        // }, {
        //   offset: 0.5,
        //   color: '#008db5' // 中间的颜色
        // },
        {
          offset: 1,
          color: '#00c7e2' // 顶部的颜色
        }
      ]
    });
  }
  const list = [
    {
      data: yList
    },
    {
      data: yList
    },
    {
      data: yList
    }
  ];
  const serieArr = [];
  const cylinderAllConfig = [
    [
      {
        top: {
          symbolOffset: [0, '-50%'],
          symbolSize: [barWidth, barWidth * 0.3]
        },
        bottom: {
          symbolOffset: [0, '50%'],
          symbolSize: [barWidth, barWidth * 0.2]
        }
      }
    ],
    [
      {
        top: {
          symbolOffset: ['-60%', '-50%'],
          symbolSize: [barWidth, barWidth * 0.3]
        },
        bottom: {
          symbolOffset: ['-60%', '50%'],
          symbolSize: [barWidth, barWidth * 0.2]
        }
      },
      {
        top: {
          symbolOffset: ['60%', '-50%'],
          symbolSize: [barWidth, barWidth * 0.3]
        },
        bottom: {
          symbolOffset: ['60%', '50%'],
          symbolSize: [barWidth, barWidth * 0.2]
        }
      }
    ],
    [
      {
        top: {
          symbolOffset: ['-120%', '-50%'],
          symbolSize: [barWidth, barWidth * 0.3]
        },
        bottom: {
          symbolOffset: ['-120%', '50%'],
          symbolSize: [barWidth, barWidth * 0.2]
        }
      },
      {
        top: {
          symbolOffset: ['0%', '-50%'],
          symbolSize: [barWidth, barWidth * 0.3]
        },
        bottom: {
          symbolOffset: ['0%', '50%'],
          symbolSize: [barWidth, barWidth * 0.2]
        }
      },
      {
        top: {
          symbolOffset: ['120%', '-50%'],
          symbolSize: [barWidth, barWidth * 0.3]
        },
        bottom: {
          symbolOffset: ['120%', '50%'],
          symbolSize: [barWidth, barWidth * 0.2]
        }
      }
    ]
  ];
  for (let i = 0; i < list.length; i++) {
    const cylinderConfig = cylinderAllConfig[list.length - 1];
    const top = cylinderConfig[i].top || {};
    const bottom = cylinderConfig[i].bottom || {};
    serieArr.push(
      ...[
        {
          name: 'ceshi' + i,
          type: 'bar',
          barWidth,
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(54,255,234,0.2)'
          },
          itemStyle: {
            normal: {
              color(params) {
                // console.log(colors[params.dataIndex % 7]);
                return colors[params.dataIndex % 7];
              }
            }
          },
          label: {
            show: false,
            position: [barWidth / 2, -(barWidth + 20)],
            fontSize: 14,
            fontStyle: 'bold',
            align: 'center'
          },
          data: yList
        },
        {
          z: 3,
          type: 'pictorialBar',
          data: yList,
          symbol: 'circle',
          ...bottom,
          itemStyle: {
            normal: {
              // color(params) {
              //   return colors[params.dataIndex % 7];
              // },
              color: '#005c8e'
            }
          }
        },
        {
          z: 3,
          type: 'pictorialBar',
          symbolPosition: 'end',
          data: yList,
          symbol: 'circle',
          ...top,
          itemStyle: {
            normal: {
              // color(params) {
              //   return colors[params.dataIndex % 7].colorStops[0].color;
              // },
              borderWidth: 0,
              color: '#36ffea'
            }
          }
        }
      ]
    );
  }
  return {
    tooltip: {
      trigger: 'axis',
      formatter: '{b} : {c}',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      left: 'center'
    },
    dataset,
    xAxis: {
      data: xData,
      type: 'category',
      axisLabel: {
        // margin: 20,
        fontSize: 14,
        color: '#9ec8e1'
      }
    },
    yAxis: {
      show: true,
      axisLabel: {
        fontSize: 14,
        color: '#9ec8e1'
      }
    },
    series: serieArr
  };
};
