<docs>
---
order: 0
title:
  zh-CN: 块级
  en-US: Type
---

## zh-CN

`block` 字段具备两个参数，`inline`、`block`。等同于 `display: inline-block;` 和 `display: block;`
</docs>

<template>
  <a-radio-group v-model:value="block" name="radioGroup">
    <a-radio value="inline">inline</a-radio>
    <a-radio value="block">block</a-radio>
  </a-radio-group>
  <br />
  <vc-structure
    v-for="(item, index) of kpiList"
    :key="index"
    :left="item.name"
    :right="item.unit"
    :center="item.value"
    :block="block"
    :pd="10"
  >
  </vc-structure>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const block = ref('block');
    const kpiList = ref([
      {
        name: '今日事件：',
        value: 10,
        unit: '件'
      },
      {
        name: '总事件：',
        value: 100,
        unit: '件'
      }
    ]);
    return {
      block,
      kpiList
    };
  }
});
</script>
