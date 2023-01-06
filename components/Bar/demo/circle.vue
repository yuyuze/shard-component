<docs>
---
order: 0
title:
  zh-CN: 圆形立体
  en-US: Type
---

## zh-CN

立体柱子，分为三个部分，中间柱子，侧边柱子，头上的盖子

</docs>

<template>
  <div style="width: 100%; height: 100%; background: #010d3a">
    <vc-bar
      height="300"
      type="circle"
      :data="data"
      :bar-width="40"
      :color="color"
    ></vc-bar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      y: ['Matcha Latte', 'Milk Tea', 'Cheese Cocoa', 'Walnut Brownie'],
      data2: [43.3, 83.1, 86, 72.4],
      data: [
        ['product', '2015'],
        ['Matcha Latte', 43.3],
        ['Milk Tea', 83.1],
        ['Cheese Cocoa', 86],
        ['Walnut Brownie', 72.4]
      ],
      color: ['#005c8e', '#00c7e2', '#005c8e', '#36ffea', 'rgba(54,255,234,0.2)']
    };
  }
});
</script>
