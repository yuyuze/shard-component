<docs>
---
order: 0
title:
  zh-CN: 样式
  en-US: Basic Grid
---

## zh-CN

具备 `cls` 属性直接设置组的样式。提供了 `bg` `padding` `style` 方便直接修改样式
</docs>

<template>
  <div>
    <vc-group :spacing="size" bg="rgba(4,22,21,0.2)" :padding="[10]">
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
