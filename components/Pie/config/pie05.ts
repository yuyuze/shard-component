import { merge } from 'lodash';
import type { PieSeriesOption } from 'echarts';
import { resetForm, generateBorder } from '../type';
import type { Config } from '../type';

type AutoMatic = {
  autoMatic: Function;
  timer: number;
};

// eslint-disable-next-line default-param-last
export default (
  data: PieSeriesOption['data'] = [],
  configure: Config = {},
  auto: AutoMatic = {
    autoMatic: () => {},
    timer: 3000
  }
) => {
  auto.autoMatic(data.length, auto.timer);
  const config = resetForm(configure);
  const { center, border } = config;
  const borderList = generateBorder(border, config);

  return merge(
    {
      grid: {
        left: 0,
        top: 0,
        bottom: 0,
        right: 0
      },
      series: [
        {
          type: 'pie',
          center: ['50%', '50%'],
          radius: ['95%', '90%'],
          avoidLabelOverlap: false,
          startAngle: 180,
          emphasis: {
            scale: false
          },
          itemStyle: {
            borderRadius: 0,
            borderWidth: 1,
            borderColor: '#fff'
          },
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          data
        },
        {
          name: '',
          type: 'pie',
          radius: ['80%', '82%'],
          center: ['50%', '50%'],
          avoidLabelOverlap: false,
          startAngle: 180,
          label: {
            show: false
          },
          emphasis: {
            scale: false
          },
          labelLine: {
            show: false
          },
          tooltip: {
            show: false
          },
          data: [
            {
              value: 0,
              name: '',
              itemStyle: {
                color: 'rgba(0,0, 0, 0.2)'
              }
            }
          ],
          animationType: 'scale'
        }
      ]
    },
    config
  );
};
