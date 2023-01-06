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
  const yList = [32, 58, 64, 64];
  const xList = [10, 55, 44, 55];
  const xData = ['学前', '小学', '初中', '高中'];
  const color = [
    '#CC1CAA',
    '#8D67FF',
    '#00FFFF',
    '#48DE13',
    '#FFC516',
    '#DC3E14',
    '#8E16F8'
  ];

  const barWidth = 40;
  for (let i = 0; i < 4; i++) {
    colors.push({
      type: 'linear',
      x: 0,
      x2: 1,
      y: 0,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: '#73fcff' // 最左边
        },
        {
          offset: 0.5,
          color: '#86eef1' // 左边的右边 颜色
        },
        {
          offset: 0.5,
          color: '#5ad6d9' // 右边的左边 颜色
        },
        {
          offset: 1,
          color: '#3dc8ca'
        }
      ]
    });
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
        margin: 20,
        fontSize: 16
      }
    },
    yAxis: {
      show: true
    },
    series: [
      {
        type: 'bar',
        barWidth,
        itemStyle: {
          normal: {
            color(params) {
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
        z: 2,
        type: 'pictorialBar',
        data: yList,
        symbol: 'diamond',
        symbolOffset: [0, '50%'],
        symbolSize: [barWidth, barWidth * 0.5],
        itemStyle: {
          normal: {
            color(params) {
              return colors[params.dataIndex % 7];
            }
          }
        }
      },
      {
        z: 3,
        type: 'pictorialBar',
        symbolPosition: 'end',
        data: yList,
        symbol: 'diamond',
        symbolOffset: [0, '-50%'],
        symbolSize: [barWidth, barWidth * 0.5],
        itemStyle: {
          normal: {
            borderWidth: 0,
            color(params) {
              return colors[params.dataIndex % 7].colorStops[0].color;
            }
          }
        }
      }
    ]
  };
};
