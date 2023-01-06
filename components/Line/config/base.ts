import { isArray, isObject, merge } from 'lodash';

export default (data, config = {}) => {
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
  return merge({}, {
    dataset,
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      minInterval: 1,
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      minInterval: 1
    },
    series: []
  }, config);
};
