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
  const { color, barWidth } = resetConfig(config);
  const colors = [];
  let colorArr = [];
  if (color.length < 5) {
    colorArr = ['#005c8e', '#00c7e2', '#005c8e', '#36ffea', 'rgba(54,255,234,0.2)'];
  } else {
    colorArr = color;
  }
  // const yList = [32, 58, 64, 64];
  const yList = data.slice(0).map((e) => e[1]);
  const xList = [10, 55, 44, 55];
  // const xData = ['学前', '小学', '初中', '高中'];
  const xData = data.slice(0).map((e) => e[0]);
  // const color = ['#CC1CAA', '#8D67FF', '#00FFFF', '#48DE13', '#FFC516', '#DC3E14', '#8E16F8'];

  // const barWidth = 40;
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
          // color: '#005c8e' // 底部的颜色
          color: colorArr[0]
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
          // color: '#00c7e2' // 顶部的颜色
          color: colorArr[1]
        }]
    });
  }

  return {
    tooltip: {
      trigger: 'axis',
      formatter: '{b} : {c}',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
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
        fontSize: 14,
        color: '#9ec8e1'
      },
    },
    yAxis: {
      show: true,
      axisLabel: {
        fontSize: 14,
        color: '#9ec8e1'
      },
    },
    series: [
      {
        type: 'bar',
        barWidth,
        showBackground: true,
        backgroundStyle: {
          color: colorArr[4]
        },
        itemStyle: {
          normal: {
            color(params) {
              // console.log(colors[params.dataIndex % 7]);
              return colors[0];
            }
          }
        },
        label: {
          show: false,
          position: [barWidth / 2, -(barWidth + 20)],
          fontSize: 14,
          fontStyle: 'bold',
          align: 'center',
        },
        data: yList
      },
      {
        z: 2,
        type: 'pictorialBar',
        data: yList,
        symbol: 'circle',
        symbolOffset: [0, '50%'],
        symbolSize: [barWidth, barWidth * 0.2],
        itemStyle: {
          normal: {
            // color(params) {
            //   return colors[params.dataIndex % 7];
            // },
            // color: '#005c8e'
            color: colorArr[2]
          }
        },
      },
      {
        z: 3,
        type: 'pictorialBar',
        symbolPosition: 'end',
        data: yList,
        symbol: 'circle',
        symbolOffset: [0, '-50%'],
        symbolSize: [barWidth, barWidth * 0.3],
        itemStyle: {
          normal: {
            borderWidth: 0,
            // color(params) {
            //   return colors[params.dataIndex % 7].colorStops[0].color;
            // },
            // color: '#36ffea'
            color: colorArr[3]
          }
        },
      },
    ]
  };
};
