import { merge } from 'lodash';
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
  const config = resetForm(configure);
  const { center, border, customize, color } = config;

  const borderList = generateBorder(border, config);

  const {
    label = true,
    borderSize = 2,
    colorBorder = [
      'rgba(0, 122, 159, 1)',
      'rgba(245, 184, 7, 1)',
      'rgba(255, 97, 97, 1)',
      'rgba(10, 145, 127, 1)',
      '#73c0de'
    ], // 边框色
    spacing = 0
  } = customize;

  const arr = [];
  const sum = data.reduce((a, b) => {
    return a + b.value;
  }, 0);

  for (let i = 0; i < data.length; i++) {
    arr.push(
      {
        value: data[i].value,
        name: data[i].name,
        itemStyle: {
          normal: {
            borderWidth: borderSize,
            borderColor: colorBorder[i]
          }
        }
      },
      {
        // 间隔配置
        value: (sum / 100) * spacing, // 间隔距离
        silent: true,
        tooltip: {
          show: false
        },
        select: {
          disabled: false
        },
        itemStyle: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          color: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgba(0, 0, 0, 0)',
          borderWidth: 3
        },
        legendHoverLink: false
      }
    );
  }
  auto.autoMatic(arr.length, auto.timer);
  return merge(
    {},
    {
      tooltip: {
        trigger: 'item'
      },
      color,
      series: [
        {
          name: '',
          type: 'pie',
          center,
          radius: caclRadius(config),
          // hoverAnimation: true, // 鼠标选择悬浮放大
          itemStyle: {
            label: {
              show: label,
              formatter: (a) => {
                if (a.name === '') {
                  return '';
                }
                return '';
              }
            }
          },
          emphasis: {
            scale: false
          },
          data: arr
        },
        ...borderList
      ]
    }
  );
};
