<docs>
---
order: 0
title:
  zh-CN: 基础
  en-US: Type
---

## zh-CN

按钮有五种类型：主按钮、次按钮、虚线按钮、文本按钮和链接按钮。主按钮在同一个操作区域最多出现一次。

</docs>

<template>
  <vc-line height="300" type="base" :extend="extend" :data="data"></vc-line>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      extend: {
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value'
        },
        legend: {
          left: 'center'
        },
        series: [
          {
            type: 'line',
            smooth: true,
            symbolSize: 0
          },
          {
            type: 'line',
            smooth: true,
            symbolSize: 0
          },
          {
            type: 'line',
            smooth: true,
            symbolSize: 0
          }
        ]
      },
      data: [
        ['product', '2015', '2016', '2017'],
        ['Matcha Latte', 43.3, 85.8, 93.7],
        ['Milk Tea', 83.1, 73.4, 55.1],
        ['Cheese Cocoa', 86.4, 30, 82.5],
        ['Walnut Brownie', 72.4, 53.9, 39.1]
      ]
    };
  }
});
</script>
