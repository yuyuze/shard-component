<docs>
---
order: 0
title:
  zh-CN: 基础
  en-US: Type
---

## zh-CN

具备上中下左右5个方位，可以传入任意值 `number`、`string`、`VNode` 都可以
</docs>

<template>
  <vc-structure
    top="上"
    bottom="下"
    left="左"
    right="右"
    :lr="{ gap: 10 }"
    :tb="{ gap: 10 }"
  >
    <template #center>
      <vc-text :color="['red', 'blue']" val="中"> </vc-text>
    </template>
  </vc-structure>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  }
});
</script>
