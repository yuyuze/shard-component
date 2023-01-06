<docs>
---
order: 0
title:
  zh-CN: 两个圈
  en-US: Type
---

## zh-CN

样式升级

</docs>
<!-- :color="['#01fcce']" -->

<template>
  <vc-gauge
    height="300"
    type="double"
    :startAngle="320"
    :endAngle="220"
    :lineWidth="5"
    :center="['50%', '50%']"
    :color="['#01fcce']"
    :progress="70"
    :roundCap="true"
    :clockwise="false"
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
