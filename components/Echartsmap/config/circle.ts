import { graphic } from 'echarts';
import { resetForm } from '../type';
import type { Config } from '../type';

export default (data, config: Config = {}) => {
  const { customize, zoom, geotype, flying, left, right, top, bottom } =
    resetForm(config);
  const PointGeo = data.map((e) => {
    const { name, value, coord } = e;
    return {
      name,
      value: [...coord, value]
    };
  });
  const max = 6000;
  const min = 10;
  const maxSize4Pin = 100;
  const minSize4Pin = 20;
  return {
    backgroundColor: '#031839',
    tooltip: {
      show: true,
      formatter(params: any) {
        if (params.value.length > 1) {
          return (
            '&nbsp;&nbsp;' +
            params.name +
            '&nbsp;&nbsp;&nbsp;' +
            params.value[2] +
            '个&nbsp;&nbsp;'
          );
        }
        return '';
      }
    },
    geo: {
      map: 'china',
      show: true,
      roam: false,
      zoom,
      label: {
        emphasis: {
          show: false
        }
      },
      layoutSize: '100%',
      itemStyle: {
        normal: {
          borderColor: new graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: '#00F6FF'
              },
              {
                offset: 1,
                color: '#53D9FF'
              }
            ],
            false
          ),
          borderWidth: 3,
          shadowColor: 'rgba(10,76,139,1)',
          shadowOffsetY: 0,
          shadowBlur: 60
        }
      }
    },
    series: [
      {
        type: 'map',
        map: 'china',
        aspectScale: 0.75,
        zoom,
        label: {
          normal: {
            show: false
          },
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            areaColor: {
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#073684' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#061E3D' // 100% 处的颜色
                }
              ]
            },
            borderColor: '#215495',
            borderWidth: 1
          },
          emphasis: {
            areaColor: {
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#073684' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#061E3D' // 100% 处的颜色
                }
              ]
            }
          }
        },
        data: PointGeo
      },
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zoom,
        rippleEffect: {
          brushType: 'stroke'
        },
        showEffectOn: 'render',
        itemStyle: {
          normal: {
            color: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.5,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(5,80,151,0.2)'
                },
                {
                  offset: 0.8,
                  color: 'rgba(5,80,151,0.8)'
                },
                {
                  offset: 1,
                  color: 'rgba(0,108,255,0.7)'
                }
              ],
              global: false // 缺省为 false
            }
          }
        },
        label: {
          normal: {
            show: true,
            color: '#fff',
            fontWeight: 'bold',
            position: 'inside',
            formatter(para: any) {
              return '{cnNum|' + para.data.value[2] + '}';
            },
            rich: {
              cnNum: {
                fontSize: 13,
                color: '#D4EEFF'
              }
            }
          }
        },
        symbol: 'circle',
        symbolSize(val: any) {
          if (val[2] === 0) {
            return 0;
          }
          const a = (maxSize4Pin - minSize4Pin) / (max - min);
          const b = maxSize4Pin - a * max;
          return a * val[2] + b * 1.2;
        },
        data: PointGeo,
        zlevel: 1
      },
      {
        name: '线路',
        type: 'lines',
        zoom,
        coordinateSystem: 'geo',
        zlevel: 2,
        large: true,
        effect: {
          show: true,
          constantSpeed: 30,
          symbol: 'arrow',
          symbolSize: 6,
          trailLength: 0
        },
        lineStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: '#0ec1be' // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#0ec1be' // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          },
          width: 4,
          opacity: 0.2,
          curveness: 0.1
        },
        data: flying || []
      }
    ]
  };
};
