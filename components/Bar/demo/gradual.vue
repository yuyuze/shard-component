<docs>
---
order: 0
title:
  zh-CN: 渐变
  en-US: Type
---

## zh-CN

渐变图形在基础图形上增加了简单实现渐变的功能,通过`color` 来实现.
采用了 `Echarts.graphic.LinearGradient` 进行绘制. 默认从上至下进行渐变, 如果需要修改渐变方向, 可通过
`direction` 进行修改 默认为 `[0, 0, 0, 1]`(右,下,左,上)

</docs>

<template>
  <vc-bar
    height="300"
    type="base"
    :extend="extend"
    :data="data"
    :color="color"
  ></vc-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      extend: {
        background: 'red',
        series: [{ type: 'bar' }, { type: 'bar' }]
      },
      data: [
        ['product', '2015', '2016'],
        ['Matcha Latte', 43.3, 85.8],
        ['Milk Tea', 83.1, 73.4],
        ['Cheese Cocoa', 86.4, 60],
        ['Walnut Brownie', 72.4, 53.9]
      ],
      color: [
        [
          'rgba(10, 64, 184, 1)',
          'rgba(10, 64, 184, 0.5)',
          'rgba(10, 64, 184, 0.1)'
        ],
        ['rgba(213, 79, 65, 1)', 'rgba(213, 79, 65, 0.1)']
      ]
    };
  }
});
</script>
