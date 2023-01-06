<docs>
---
order: 0
title:
  zh-CN: 基础
  en-US: Type
---

## zh-CN

基础的列表展示了使用方式，默认会开启动画，以及 `(移入/移出)` 会 `(暂停/开始)` 动画

</docs>

<template>
  <vc-list height="75px" rowKey="name" :data="data" :column="column"></vc-list>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      column: [
        {
          key: 'name',
          name: '场所名称'
        },
        {
          key: 'value',
          name: '人员数量'
        }
      ],
      data: ref([
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ])
    };
  }
});
</script>
