import { merge } from 'lodash';
import type { PieSeriesOption } from 'echarts';
import { resetForm, generateBorder, caclRadius } from '../type';
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
  const { center, border, label } = config;
  const borderList = generateBorder(border, config);
  return merge(
    {},
    {
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          type: 'pie',
          center,
          label,
          radius: caclRadius(config),
          data
        },
        ...borderList
      ]
    },
    config
  );
};
