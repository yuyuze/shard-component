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
  const { color } = resetConfig(config);
  return {
    color: color.map((e) => {
      if (isArray(e)) {
        return hadnlerColor('line', e, [0, 0, 0, 1]);
      }
      return e;
    }),
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      left: 'center'
    },
    dataset,
    xAxis: { type: 'category', minInterval: 1 },
    yAxis: { type: 'value', minInterval: 1 },
    series: []
  };
};
