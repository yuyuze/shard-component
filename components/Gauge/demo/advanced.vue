<docs>
---
order: 0
title:
  zh-CN: 样式进阶
  en-US: Type
---

## zh-CN

基础图形是自定义,组装较为方便的一种图形,可以使用配置参数实现任意柱状图

</docs>

<template>
  <vc-gauge
    height="300"
    type="advanced"
    :center="['50%', '70%']"
    :color="['#01fcce']"
    :progress="70"
    :roundCap="false"
    :stepColor = "[[1,'#0e444a']]"
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
