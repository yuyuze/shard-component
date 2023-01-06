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
  const {
    color,
    center,
    startAngle,
    endAngle,
    lineWidth,
    roundCap,
    progress,
    stepColor,
    clockwise
  } = resetConfig(config);

  return {
    color: color.map((e) => {
      if (isArray(e)) {
        return hadnlerColor('line', e, [0, 0, 0, 1]);
      }
      return e;
    }),
    series: [
      {
        type: 'gauge',
        startAngle,
        endAngle,
        splitNumber: 5,
        center,
        radius: '85%',
        clockwise,
        // itemStyle: {
        //   color: '#58D9F9',
        //   shadowColor: 'rgba(0,138,255,0.45)',
        //   shadowBlur: 10,
        //   shadowOffsetX: 2,
        //   shadowOffsetY: 2
        // },
        progress: {
          show: true,
          roundCap,
          width: lineWidth,
          overlap: false,
          itemStyle: {
            borderWidth: 0
          }
        },
        pointer: {
          show: false,
        },
        axisLine: {
          roundCap,
          lineStyle: {
            color: stepColor,
            width: lineWidth,
            shadowBlur: 0,
          }
        },
        axisTick: {
          show: false,
          splitNumber: 2,
          lineStyle: {
            width: 2,
            color: '#999'
          }
        },
        splitLine: {
          show: false,
          length: 12,
          lineStyle: {
            width: 3,
            color: '#999'
          }
        },
        axisLabel: {
          show: false,
          distance: 30,
          color: '#999',
          fontSize: 20
        },
        title: {
          show: false
        },
        detail: {
          show: false,
        },
        data: [
          {
            value: progress
          }
        ]
      },
      {
        type: 'gauge',
        startAngle,
        endAngle,
        splitNumber: 5,
        clockwise,
        center,
        radius: '95%',
        // itemStyle: {
        //   color: '#58D9F9',
        //   shadowColor: 'rgba(0,138,255,0.45)',
        //   shadowBlur: 10,
        //   shadowOffsetX: 2,
        //   shadowOffsetY: 2
        // },
        progress: {
          show: true,
          roundCap,
          width: 5,
          overlap: false,
          itemStyle: {
            borderWidth: 0,
            color: '#999'
          }
        },
        pointer: {
          show: false,
        },
        axisLine: {
          roundCap,
          lineStyle: {
            color: '#999',
            width: 2,
            shadowBlur: 0,
          }
        },
        axisTick: {
          show: false,
          splitNumber: 2,
          lineStyle: {
            width: 2,
            color: '#999'
          }
        },
        splitLine: {
          show: false,
          length: 12,
          lineStyle: {
            width: 3,
            color: '#999'
          }
        },
        axisLabel: {
          show: false,
          distance: 30,
          color: '#999',
          fontSize: 20
        },
        title: {
          show: false
        },
        detail: {
          show: false,
        },
        data: [
          {
            value: 100,
          }
        ]
      }
    ]
  };
};
