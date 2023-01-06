<docs>
---
order: 0
title:
  zh-CN: 大运河
  en-US: Basic Grid
---

## zh-CN
大运河列表模板

</docs>

<template>
  <a-card
    :title="`theme: ${item.theme}`"
    size="small"
    v-for="item in themeList"
    :key="item.theme"
    :bodyStyle="{ background: item.bg }"
  >
    <vc-tem-list
      :theme="item.theme"
      :data="data"
      :column="column"
      :height="item.height || '100px'"
      :animate="false"
    >
    </vc-tem-list>
  </a-card>
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
        { value: 300, name: 'Video Ads' },
        { value: 735, name: 'Search Engine' },
        { value: 580, name: 'Direct' }
      ]),
      themeList: ref<any[]>([
        {
          theme: 'dyh1',
          bg: 'rgb(10, 61, 65)'
        },
        {
          theme: 'dyh2',
          bg: 'rgb(10, 61, 65)'
        },
        {
          theme: 'dyh3',
          bg: 'rgb(10, 61, 65)',
          height: '85px'
        }
      ])
    };
  }
});
</script>
