<docs>
---
order: 0
title:
  zh-CN: 基础
  en-US: Type
---

## zh-CN

基础图形是自定义,组装较为方便的一种图形,可以使用配置参数实现任意柱状图

</docs>

<template>
  <vc-bar height="300" type="base" :extend="extend" :data="data"></vc-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      extend: {
        xAxis: { type: 'category' },
        yAxis: [{ type: 'value' }, { type: 'value' }],
        series: [
          { type: 'bar', stack: '分类' },
          { type: 'bar', stack: '分类' },
          { type: 'line', yAxisIndex: 1 },
          { type: 'bar' }
        ]
      },
      data: [
        ['product', '2015', '2016', '2017', '2018'],
        ['Matcha Latte', 43.3, 85.8, 93.7, 100],
        ['Milk Tea', 83.1, 73.4, 55.1, 100],
        ['Cheese Cocoa', 86.4, 30, 82.5, 100],
        ['Walnut Brownie', 72.4, 53.9, 39.1, 100]
      ]
    };
  }
});
</script>
