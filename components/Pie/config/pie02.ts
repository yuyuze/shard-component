import { merge } from 'lodash';
import { resetForm, generateBorder, caclRadius, calcFilling } from '../type';
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
  const config = resetForm(configure, {
    border: [
      {
        radius: ['41%', '43%'],
        color: '#606a6c'
      },
      {
        radius: ['60%', '62%'],
        color: '#606a6c'
      }
    ],
    radius: ['48%', '55%']
  });

  const { center, border, color, spacing, label } = config;

  const borderList = generateBorder(border, config);

  const dataList = calcFilling(data, spacing);

  auto.autoMatic(dataList.length, auto.timer);

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
          emphasis: {
            scale: false
          },
          label: merge(
            {},
            {
              fontSize: 14,
              color: '#fff',
              position: 'outside',
              fontFamily: 'Pingfang'
            },
            label
          ),
          data: dataList
        },
        ...borderList
      ]
    }
  );
};
