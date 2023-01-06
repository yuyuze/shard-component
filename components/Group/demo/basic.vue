<docs>
---
order: 0
title:
  zh-CN: 基础
  en-US: Basic Grid
---

## zh-CN

通过 `spacing` 参数来调整 各个模块之间的共同间距
</docs>

<template>
  <div>
    <a-slider tooltip-visible v-model:value="size" />
    <br />
    <vc-group :spacing="size" justify="center">
      Button
      <a-button type="primary">Button</a-button>
      <a-button type="primary">Button</a-button>
    </vc-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      size: ref(8)
    };
  }
});
</script>
