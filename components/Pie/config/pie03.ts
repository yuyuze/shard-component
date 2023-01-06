import { resetForm, generateBorder, caclRadius } from '../type';
import type { Config } from '../type';

type AutoMatic = {
  autoMatic: Function;
  timer: number;
};

export default (
  data = [],
  configure: Config = {},
  auto: AutoMatic = {
    autoMatic: () => {},
    timer: 1500
  }
) => {
  auto.autoMatic(data.length, auto.timer);
  const config = resetForm(configure, {
    border: [
      {
        radius: ['15%', '20%'],
        color: 'rgba(102,198,255,0.9)'
      },
      {
        radius: '50%',
        color: 'rgba(102,198,255,0.3)',
        borderColor: '#3871FE',
        borderWidth: 3,
        borderType: [13, 8]
      },
      {
        radius: ['55%', '57%'],
        color: '#0A62A1'
      }
    ],
    radius: ['23%', '45%'],
    customize: {}
  });

  const { center, border, label, customize, color } = config;
  const borderList = generateBorder(border, config);
  return {
    tooltip: {
      trigger: 'item'
    },
    color,
    series: [
      {
        center,
        type: 'pie',
        data,
        id: 'pie-rose-zzw',
        // 饼图的类型是南丁格尔玫瑰图
        roseType: 'radius',
        // 內圆半径35%，外圆半径60%
        radius: caclRadius(config),
        label: {
          show: true,
          position: 'outside',
          formatter(arg) {
            return `{a|${arg.percent}%\n} {b|${arg.name}}`;
          },
          rich: {
            a: {
              color: 'white',
              lineHeight: 30,
              fontSize: 20,
              fontStyle: 'italic',
              // 这个透明度的设置太强了一点
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              height: 10,
              padding: 2,
              borderRadius: 5,
              fontWeight: 'bolder'
            },
            b: {
              fontSize: 14,
              color: 'white',
              fontWeight: 'bolder'
            }
          }
        },

        // 饼图的样式
        itemStyle: {
          // 显示每一块的阴影样式
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          shadowBlur: 10
        }
      },
      ...borderList
    ]
  };
};
