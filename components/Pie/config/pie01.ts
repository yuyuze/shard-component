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
    timer: 3000
  }
) => {
  auto.autoMatic(data.length, auto.timer);
  const config = resetForm(configure, {
    radius: ['36%', '42%'],
    border: [
      // 内部虚线框
      {
        radius: ['30%', '30%'],
        borderColor: 'rgba(8, 78, 197, 1)',
        borderWidth: 2,
        borderType: 7
      },
      // 内部实线框
      {
        radius: ['34%', '34%'],
        borderColor: 'rgba(8, 78, 197, 1)',
        borderWidth: 2
      },
      // 外部实线框
      {
        radius: ['44%', '44%'],
        borderColor: 'rgba(8, 78, 197, 1)',
        borderWidth: 2
      }
    ],
    color: [
      'rgba(217, 80, 64, 1)',
      'rgba(255, 176, 82, 1)',
      'rgba(106, 78, 220, 1)'
    ]
  });
  const { center, border, customize, color } = config;
  const { label = true } = customize;

  const ascll = 'a'.charCodeAt(0);
  const itemColor = color.reduce((a, b, index) => {
    a[String.fromCharCode(ascll + index)] = b;
    return a;
  }, {});

  const borderList = generateBorder(border, config);

  return {
    tooltip: {
      trigger: 'item',
      show: false
    },
    color,
    legend: {
      show: true,
      orient: 'vertical',
      textStyle: {
        color: 'rgba(187, 207, 248,1)',
        fontWeight: 'bold',
        fontSize: 12
      }
    },
    series: [
      // 数据展示框
      {
        type: 'pie',
        radius: caclRadius(config),
        center,
        avoidLabelOverlap: false,
        emptyCircleStyle: {
          color: 'rgba(217, 80, 64, 1)'
        },
        label: {
          show: false,
          position: 'center'
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
              const list = Object.entries(itemColor);
              return `{${list[a.dataIndex][0]}|${a.name}\n${a.value}}`;
            },
            rich: Object.entries(itemColor).reduce((a, [key, value]) => {
              a[key] = {
                fontSize: 12,
                fontWeight: 'bold',
                color: value
              };
              return a;
            }, {})
          },
          labelLine: {
            show: false
          }
        },
        data
      },
      ...borderList
    ]
  };
};
