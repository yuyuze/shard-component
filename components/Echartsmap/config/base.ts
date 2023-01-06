import { resetForm } from '../type';
import type { Config } from '../type';

export default (data, config: Config = {}) => {
  const { customize, zoom, geotype, flying, left, right, top, bottom } = resetForm(config);
  const PointGeo = data.map((e) => {
    const { name, value, coord } = e;
    return {
      name,
      value: [...coord, value]
    };
  });

  return {
    legend: {
      show: false,
    },
    geo: {
      type: 'map',
      map: geotype,
      roam: false,
      zoom,
      left,
      right,
      top,
      bottom,
      legend: {
        show: false
      },
      label: {
        emphasis: {
          show: false,
          textStyle: {
            color: '#fff'
          }
        }
      },
      itemStyle: {
        normal: {
          areaColor: '#001b5d', // 区域颜色 支持渐变
          borderColor: '#1fafcb' // 边框颜色
        },
        emphasis: {
          areaColor: '#6f93f2' // 移入颜色
        }
      }
    },
    series: [
      {
        name: '地点',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: {
          brushType: 'stroke'
        },
        label: {
          show: true,
          color: '#fff',
          position: 'left',
          formatter: (e) => {
            return e.name;
          },
        },
        symbolSize: 10,
        showEffectOn: 'render',
        itemStyle: {
          normal: {
            color: '#efb30f'
          }
        },
        data: PointGeo
      },
      {
        type: 'lines', // 动效线（箭头）
        zlevel: 3,
        effect: {
          show: true,
          period: 4, // 箭头指向速度，值越小速度越快
          trailLength: 0.02, // 特效尾迹长度[0,1]值越大，尾迹越长重
          symbol: 'arrow', // 箭头图标
          symbolSize: 5, // 图标大小
        },
        lineStyle: {
          color: '#cb9c1c',
          width: 1,
          opacity: 0.5,
          curveness: 0.2
        },
        data: flying || []
      },
    ]
  };
};
