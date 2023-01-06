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
  <vc-gauge
    height="300"
    type="base"
    :startAngle="180"
    :endAngle="0"
    :center="['50%', '70%']"
    :color="['#01fcce']"
    :progress="70"
    :roundCap="true"
  ></vc-gauge>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  }
});
</script>
